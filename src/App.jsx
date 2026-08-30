 import { useState } from "react";

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
const [search, setSearch] = useState("");
const [diagnosticStep, setDiagnosticStep] = useState(0);
const [stepHistory, setStepHistory] = useState([]);
const [networkInfo, setNetworkInfo] = useState("");
const [loadingNetworkInfo, setLoadingNetworkInfo] = useState(false);
  const problems = [
    {
      icon: "🌐",
      title: "Network Problem",
      description: "Internet, Wi-Fi, IP address or connection problems",
    },
    {
      icon: "🖨️",
      title: "Printer Problem",
      description: "Printer connection, queue or printing problems",
    },
    {
      icon: "🖥️",
      title: "Display Problem",
      description: "Monitor, resolution or screen problems",
    },
    {
      icon: "⌨️",
      title: "Peripheral Problem",
      description: "Keyboard, mouse and other device problems",
    },
  ];

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase())
  );
  const startDiagnosis = () => {
  setStepHistory([]);
  setDiagnosticStep(1);
};
const goToStep = (nextStep) => {
  setStepHistory((history) => [...history, diagnosticStep]);
  setDiagnosticStep(nextStep);
};

const checkNetworkInfo = async () => {
  setLoadingNetworkInfo(true);
  setNetworkInfo("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/network-info"
    );

    const data = await response.json();

    if (data.success) {
      if (data.hasValidIP) {
        setNetworkInfo(
          "VALID IP ADDRESS DETECTED\n\n" + data.output
        );
      } else {
        setNetworkInfo(
          "NO VALID IP ADDRESS DETECTED\n\n" + data.output
        );
      }
    } else {
      setNetworkInfo("Unable to get network information.");
    }
  } catch (error) {
    setNetworkInfo(
      "Could not connect to the SmartDesk backend. Make sure the backend is running."
    );
  }

  setLoadingNetworkInfo(false);
};
const goBack = () => {
  setStepHistory((history) => {
    if (history.length === 0) {
      return history;
    }

    const previousStep = history[history.length - 1];

    setDiagnosticStep(previousStep);

    return history.slice(0, -1);
  });
};

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logo}>S</div>

          <div>
            <h1 style={styles.logoTitle}>SmartDesk</h1>
            <p style={styles.logoSubtitle}>IT Support Assistant</p>
          </div>
        </div>

        <div style={styles.status}>
          <span style={styles.statusDot}></span>
          Offline Ready
        </div>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <div>
            <p style={styles.welcome}>WELCOME TO SMARTDESK</p>

            <h2 style={styles.heroTitle}>
              Let's solve your
              <br />
              <span style={styles.highlight}>IT problem.</span>
            </h2>

            <p style={styles.heroText}>
              Get step-by-step troubleshooting guidance, even when your
              internet connection is unavailable.
            </p>
          </div>

          <div style={styles.heroIcon}>🛠️</div>
        </section>

        {/* Search */}
        <section style={styles.searchSection}>
          <h3 style={styles.sectionTitle}>What problem are you having?</h3>

          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔎</span>

            <input
              type="text"
              placeholder="Search for an IT problem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>
        </section>

        {/* Problem cards */}
        <section>
          <div style={styles.cardGrid}>
            {filteredProblems.map((problem) => (
              <button
                key={problem.title}
                onClick={() => setSelectedProblem(problem)}
                style={styles.problemCard}
              >
                <div style={styles.problemIcon}>{problem.icon}</div>

                <div style={styles.cardText}>
                  <h4 style={styles.cardTitle}>{problem.title}</h4>
                  <p style={styles.cardDescription}>
                    {problem.description}
                  </p>
                </div>

                <span style={styles.arrow}>→</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected problem */}
        {selectedProblem && (
          <section style={styles.selectedBox}>
            <div>
              <p style={styles.selectedLabel}>SELECTED PROBLEM</p>

              <h3 style={styles.selectedTitle}>
                {selectedProblem.icon} {selectedProblem.title}
              </h3>

              <p style={styles.selectedDescription}>
                {selectedProblem.description}
              </p>
            </div>

           <button
  style={styles.startButton}
  onClick={startDiagnosis}
>
  Start Diagnosis →
</button>
          </section>
        )}
{/* Diagnostic workflow */}
{diagnosticStep === 1 && selectedProblem?.title === "Network Problem" && (
  <section style={styles.diagnosticBox}>
    <p style={styles.selectedLabel}>NETWORK DIAGNOSTIC</p>

    <h3 style={styles.diagnosticTitle}>
      What type of network problem are you experiencing?
    </h3>

    <div style={styles.diagnosticOptions}>
      <button
        style={styles.diagnosticOption}
        onClick={() => goToStep(2)}
      >
        🌐 No Internet
      </button>

      <button
        style={styles.diagnosticOption}
        onClick={() => alert("Wi-Fi troubleshooting will be added next.")}
      >
        📶 Wi-Fi not connecting
      </button>

      <button
        style={styles.diagnosticOption}
        onClick={() => alert("Ethernet troubleshooting will be added next.")}
      >
        🔌 Ethernet not working
      </button>

      <button
        style={styles.diagnosticOption}
        onClick={() => alert("DNS troubleshooting will be added next.")}
      >
        🌍 DNS problem
      </button>
    </div>
  </section>
)}
{diagnosticStep === 2 && selectedProblem?.title === "Network Problem" && (
  <section style={styles.diagnosticBox}>
    <p style={styles.selectedLabel}>NETWORK DIAGNOSTIC • STEP 2</p>

    <h3 style={styles.diagnosticTitle}>
      Is your Wi-Fi or Ethernet connection active?
    </h3>

    <p style={styles.cardDescription}>
      First, let's check whether your computer is physically or wirelessly
      connected to the network.
    </p>

    <div style={styles.diagnosticOptions}>
      <button
        style={styles.diagnosticOption}
        onClick={() => goToStep(3)}
      >
        ✅ Yes, I am connected
      </button>

      <button
        style={styles.diagnosticOption}
        onClick={() => goToStep(4)}
      >
        ❌ No, I am not connected
      </button>
    </div>
    <button
  style={styles.backButton}
  onClick={goBack}
>
  ← Back
</button>
  </section>
)} {/* Step 3: Check IP address */}
{diagnosticStep === 3 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • STEP 3
      </p>

      <h3 style={styles.diagnosticTitle}>
        Let's check your IP address
      </h3>

      <p style={styles.cardDescription}>
        Your computer needs a valid IP address to communicate with
        other devices on the network.
      </p>
      <button
  style={styles.startButton}
  onClick={checkNetworkInfo}
  disabled={loadingNetworkInfo}
>
  {loadingNetworkInfo ? "Checking..." : "Check My IP Address"}
</button>

      <div style={styles.diagnosticOptions}>
        <button
          style={styles.diagnosticOption}
          onClick={() => goToStep(5)}
        >
          ✅ I have an IP address
        </button>

        <button
          style={styles.diagnosticOption}
          onClick={() => goToStep(6)}
        >
         ❌ I don't have an IP address
        </button>
      </div>
      {networkInfo && (
  <pre
    style={{
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      overflowX: "auto",
      fontSize: "13px",
      lineHeight: "1.6",
    }}
  >
    {networkInfo}
  </pre>
)}
      <button
  style={styles.backButton}
  onClick={goBack}
>
  ← Back
</button>
    </section>
  )}
  {/* Step 4: No network connection */}
{diagnosticStep === 4 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • STEP 5
      </p>

      <h3 style={styles.diagnosticTitle}>
        Connect your computer to the network
      </h3>

      <p style={styles.cardDescription}>
        Your computer is not currently connected to Wi-Fi or Ethernet.
        Try the following steps:
      </p>

      <ul style={styles.solutionList}>
        <li>Turn on Wi-Fi and connect to the correct network.</li>
        <li>Check that Airplane Mode is turned off.</li>
        <li>For Ethernet, make sure the cable is firmly connected.</li>
        <li>Check whether the network adapter is enabled.</li>
      </ul>

      <button
        style={styles.startButton}
        onClick={() => setDiagnosticStep(2)}
      >
        Check Connection Again →
      </button>
    </section>
)}


{/* Step 5: Check Default Gateway */}
{diagnosticStep === 5 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • STEP 4
      </p>

      <h3 style={styles.diagnosticTitle}>
        Let's check your Default Gateway
      </h3>

      <p style={styles.cardDescription}>
        The Default Gateway connects your computer to other networks and
        the internet.
      </p>

      <div style={styles.diagnosticOptions}>
        <button
          style={styles.diagnosticOption}
          onClick={() => goToStep(7)}
        >
          ✅ I can reach the Default Gateway
        </button>

        <button
          style={styles.diagnosticOption}
         onClick={() => goToStep(8)}
        >
          ❌ I cannot reach the Default Gateway
        </button>
      </div>
      <button
  style={styles.backButton}
  onClick={goBack}
>
  ← Back
</button>
    </section>
)}


{/* Step 6: No IP Address */}
{diagnosticStep === 6 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • NO IP ADDRESS
      </p>

      <h3 style={styles.diagnosticTitle}>
        Your computer does not have a valid IP address
      </h3>

      <p style={styles.cardDescription}>
        This can happen when the network adapter is disabled or the
        computer cannot receive an address from DHCP.
      </p>

      <ul style={styles.solutionList}>
        <li>Check that Wi-Fi or Ethernet is connected.</li>
        <li>Disable and enable the network adapter.</li>
        <li>Reconnect the Ethernet cable or Wi-Fi.</li>
        <li>Restart your computer.</li>
        <li>Try connecting to the network again.</li>
      </ul>

      <button
        style={styles.startButton}
        onClick={() => setDiagnosticStep(3)}
      >
        Check IP Address Again →
      </button>
    </section>
)}


{/* Step 7: Check DNS */}
{diagnosticStep === 7 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • STEP 5
      </p>

      <h3 style={styles.diagnosticTitle}>
        Check your DNS connection
      </h3>

      <p style={styles.cardDescription}>
        If you can reach your Default Gateway but websites do not open,
        the problem may be related to DNS.
      </p>

      <div style={styles.diagnosticOptions}>
        <button
          style={styles.diagnosticOption}
            onClick={() => goToStep(9)}
        >
          🌍 Test DNS
        </button>

        <button
          style={styles.diagnosticOption}
          onClick={() => goToStep(10)}
        >
          🔧 Show Troubleshooting Solution
        </button>
      </div>
      <button
  style={styles.backButton}
  onClick={goBack}
>
  ← Back
</button>
    </section>
)}


{/* Step 8: Gateway Problem */}
{diagnosticStep === 8 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • GATEWAY PROBLEM
      </p>

      <h3 style={styles.diagnosticTitle}>
        Your computer cannot reach the Default Gateway
      </h3>

      <ul style={styles.solutionList}>
        <li>Check your Wi-Fi or Ethernet connection.</li>
        <li>Reconnect the network cable.</li>
        <li>Restart the network adapter.</li>
        <li>Restart the router if you are authorized to do so.</li>
        <li>Contact your IT administrator if the problem continues.</li>
      </ul>

      <button
        style={styles.startButton}
        onClick={() => setDiagnosticStep(2)}
      >
        Start Network Check Again →
      </button>
    </section>
)}


{/* Step 9: DNS Test */}
{diagnosticStep === 9 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        NETWORK DIAGNOSTIC • DNS TEST
      </p>

      <h3 style={styles.diagnosticTitle}>
        DNS troubleshooting
      </h3>

      <p style={styles.cardDescription}>
        Try opening another website. If the internet connection works but
        website names cannot be found, your DNS configuration may have a
        problem.
      </p>

      <ul style={styles.solutionList}>
        <li>Disconnect and reconnect to the network.</li>
        <li>Restart your network adapter.</li>
        <li>Restart the computer.</li>
        <li>Contact IT support if DNS settings need to be changed.</li>
      </ul>

      <button
        style={styles.startButton}
        onClick={() => goToStep(10)}
      >
        View Final Result →
      </button>
    </section>
)}


{/* Step 10: Final Result */}
{diagnosticStep === 10 &&
  selectedProblem?.title === "Network Problem" && (
    <section style={styles.diagnosticBox}>
      <p style={styles.selectedLabel}>
        DIAGNOSTIC COMPLETE
      </p>

      <h3 style={styles.diagnosticTitle}>
        Network troubleshooting completed
      </h3>

      <p style={styles.cardDescription}>
        If the problem still exists after following the recommended steps,
        the issue may require assistance from the IT support team.
      </p>

      <button
        style={styles.startButton}
        onClick={() => setDiagnosticStep(1)}
      >
        Start Diagnosis Again →
      </button>
    </section>
)}
        {/* Offline information */}
        <section style={styles.infoBox}>
          <div style={styles.infoIcon}>✓</div>

          <div>
            <h4 style={styles.infoTitle}>Offline troubleshooting available</h4>

            <p style={styles.infoText}>
              SmartDesk can provide local troubleshooting guidance without
              requiring an internet connection.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>SmartDesk Assistant • Enterprise IT Support</p>
        <p>Offline-First Diagnostic Platform</p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    color: "#172033",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },

  header: {
    height: "76px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e6e9ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 7%",
    boxSizing: "border-box",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logo: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "800",
  },

  logoTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
  },

  logoSubtitle: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#7b8495",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    borderRadius: "20px",
    backgroundColor: "#eefbf3",
    color: "#23834b",
    fontSize: "13px",
    fontWeight: "600",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#28a85a",
  },

  main: {
    width: "86%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "55px 0",
  },

  hero: {
    backgroundColor: "#172554",
    borderRadius: "24px",
    padding: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    boxSizing: "border-box",
    marginBottom: "45px",
  },

  welcome: {
    margin: "0 0 12px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    opacity: 0.7,
  },

 heroTitle: {
    margin: 0,
    fontSize: "46px",
    lineHeight: "1.1",
    fontWeight: "800",
    color: "#ffffff",
  },

  highlight: {
    color: "#60a5fa",
  },

  heroText: {
    maxWidth: "560px",
    margin: "20px 0 0",
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#dbe5f5",
  },

  heroIcon: {
    fontSize: "86px",
    padding: "25px",
  },

  searchSection: {
    marginBottom: "25px",
  },

  sectionTitle: {
    margin: "0 0 15px",
    fontSize: "22px",
    fontWeight: "750",
  },

  searchBox: {
    backgroundColor: "white",
    border: "1px solid #dfe4ec",
    borderRadius: "14px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    boxSizing: "border-box",
  },

  searchIcon: {
    fontSize: "18px",
    marginRight: "12px",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    backgroundColor: "transparent",
    color: "#172033",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  },

  problemCard: {
    position: "relative",
    textAlign: "left",
    border: "1px solid #e1e6ee",
    borderRadius: "18px",
    backgroundColor: "white",
    padding: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    minHeight: "145px",
    transition: "transform 0.2s",
  },

  problemIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    backgroundColor: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    flexShrink: 0,
  },

  cardText: {
    paddingRight: "25px",
  },

  cardTitle: {
    margin: "0 0 7px",
    fontSize: "17px",
  },

  cardDescription: {
    margin: 0,
    color: "#747d8d",
    lineHeight: "1.5",
    fontSize: "13px",
  },

  arrow: {
    position: "absolute",
    right: "22px",
    fontSize: "22px",
    color: "#8b95a7",
  },

  selectedBox: {
    marginTop: "24px",
    padding: "25px",
    backgroundColor: "#ffffff",
    border: "1px solid #dbe4f3",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  selectedLabel: {
    margin: "0 0 7px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#2563eb",
  },

  selectedTitle: {
    margin: 0,
    fontSize: "20px",
  },

  selectedDescription: {
    margin: "7px 0 0",
    color: "#737d8e",
    fontSize: "14px",
  },

  startButton: {
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "13px 20px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  infoBox: {
    marginTop: "28px",
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "#eefbf3",
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },

  infoIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#28a85a",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  infoTitle: {
    margin: "2px 0 5px",
    fontSize: "14px",
  },

  infoText: {
    margin: 0,
    color: "#527260",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  diagnosticBox: {
  marginTop: "28px",
  padding: "30px",
  backgroundColor: "#ffffff",
  border: "1px solid #dbe4f3",
  borderRadius: "18px",
},

diagnosticTitle: {
  margin: "8px 0 22px",
  fontSize: "22px",
},

diagnosticOptions: {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
},

diagnosticOption: {
  border: "1px solid #dce3ed",
  borderRadius: "12px",
  backgroundColor: "#f8fafc",
  padding: "18px",
  textAlign: "left",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  color: "#172033",
},
backButton: {
  border: "1px solid dce3ed",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  color: "#4b5563",
  padding: "12px 18px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "20px",
},
solutionList: {
  margin: "20px 0",
  paddingLeft: "22px",
  color: "#4b5563",
  lineHeight: "2",
  fontSize: "14px",
},
  footer: {
    textAlign: "center",
    padding: "25px",
    color: "#8992a2",
    fontSize: "12px",
    lineHeight: "1.5",
  },
};

export default App;