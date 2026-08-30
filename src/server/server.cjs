const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/network-info", (req, res) => {
  exec("ipconfig", (error, stdout) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Look for IPv4 addresses
    const ipMatch = stdout.match(
  /IPv4 Address[^:]*:\s*(\d+\.\d+\.\d+\.\d+)/
);

let hasValidIP = false;

if (ipMatch && ipMatch[1]) {
  const ipAddress = ipMatch[1];

  // Ignore automatic invalid addresses
  if (
    ipAddress !== "127.0.0.1" &&
    !ipAddress.startsWith("169.254.")
  ) {
    hasValidIP = true;
  }
}

    res.json({
      success: true,
      output: stdout,
      hasValidIP: hasValidIP,
    });
  });
});

app.get("/api/ping", (req, res) => {
  exec("ping 8.8.8.8", (error, stdout, stderr) => {
    res.json({
      success: !error,
      output: stdout,
    });
  });
});

app.listen(5000, () => {
  console.log("SmartDesk backend running on http://localhost:5000");
});