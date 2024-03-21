import { useNavigate } from "react-router-dom";
import TimeTracker from "./assets/TimeTracker.png";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import aws from "./aws-exports";

Amplify.configure(aws);

function App() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={TimeTracker}
        className="object-contain w-[260px] h-[180px]"
        alt="TimeTracker"
      />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bolder",
        }}
        className="pb-4 text-2xl"
      >
        Welcome to Time Tracker Application
      </p>

      <button
        className="bg-[#018273] hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
}

export default App;
