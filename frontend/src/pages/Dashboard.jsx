import { useHistory } from "../context/HistoryContext";
import { detectObjects } from "../services/detectionService";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import WebcamPanel from "../components/WebcamPanel";
import ResultPanel from "../components/ResultPanel";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState, useRef } from "react";


function Dashboard() {
  const [detections, setDetections] = useState([]);
  const webcamRef = useRef(null);
  const detectionTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { addHistory } = useHistory();
  const handleLogout = async () => {
    try {
        await logout();

        navigate("/");

    } catch (error) {
        console.error(error);
    }
  };
  const updateDetections = (newDetections) => {

    if (detectionTimeoutRef.current) {
        clearTimeout(detectionTimeoutRef.current);
    }

    if (newDetections.length > 0) {

        setDetections(newDetections);

        detectionTimeoutRef.current = setTimeout(() => {
            setDetections([]);
        }, 2000);

    }

  };
  const handleSnapshot = () => {

    const image = webcamRef.current?.getSnapshot();

    if (!image) {

        alert("Please start the camera first.");
        return;

    }

    if (detections.length === 0) {

        alert("No objects detected.");
        return;

    }

    addHistory({

        id: Date.now(),

        image,

        detections,

        timestamp: Date.now()

    });

    alert("Snapshot saved successfully!");

  };
  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="dashboard-content">

          <section className="welcome-section">

            <h1>Welcome Back 👋</h1>

            <p>

              Ready to detect objects?

            </p>

          </section>

          <WebcamPanel 
            ref={webcamRef}
            detections={detections}
            setDetections={updateDetections}
          />

          <div className="camera-actions">

            <button
              className="snapshot-btn"
              onClick={handleSnapshot}
            >
              📸 Take Snapshot
            </button>

          </div>

          <ResultPanel detections={detections}/>

          

        </main>

      </div>
      
    </>
  );
}

export default Dashboard;