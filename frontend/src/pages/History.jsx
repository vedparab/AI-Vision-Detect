import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { useHistory } from "../context/HistoryContext";
import "../styles/History.css";
function History() {

    const { history } = useHistory();

    return (
        <>
            <DashboardNavbar />
            <div className="dashboard-layout">
                <Sidebar />
                <main className="dashboard-content">
                    <div className="history-page">

                        <h1>Detection History</h1>

                        {history.length === 0 ? (

                            <div className="empty-history">

                                <div className="empty-icon">📸</div>

                                <h2>No Detection History Yet</h2>

                                <p>

                                    Capture your first AI detection snapshot
                                    to see it here.

                                </p>

                            </div>
                        ) : (

                            <div className="history-grid">

                                {history.map((item) => (

                                    <div
                                        key={item.id}
                                        className="history-card"
                                    >

                                        <img
                                            src={item.image}
                                            alt="Snapshot"
                                            className="history-image"
                                        />

                                        <div className="history-content">

                                            <h3>
                                                Detected Objects
                                                <span className="object-count">

                                                    ({item.detections.length})

                                                </span>
                                            </h3>

                                            <ul>

                                                {item.detections.map((detection, index) => (

                                                    <li key={index}>

                                                        {detection.class
                                                            .split(" ")
                                                            .map(
                                                                word =>
                                                                    word.charAt(0).toUpperCase() +
                                                                    word.slice(1)
                                                            )
                                                            .join(" ")
                                                        } (
                                                        {Math.round(detection.confidence * 100)}%)

                                                    </li>

                                                ))}

                                            </ul>

                                            <p className="history-time">

                                                {new Intl.DateTimeFormat("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }).format(new Date(item.timestamp))}

                                                <br />

                                                {new Intl.DateTimeFormat("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                }).format(new Date(item.timestamp))}

                                            </p>

                                        </div>

                                    </div>

                                ))}
                                

                            </div>

                        )}

                    </div>
                    
                </main>
                
            </div>
        </>

    );

}

export default History;