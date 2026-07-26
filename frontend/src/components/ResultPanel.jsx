function ResultPanel({ detections }) {

  return (

    <div className="result-panel">

        <h2>Detection Result</h2>

        {detections.length === 0 ? (

            <p>No object detected yet.</p>

        ) : (

            <div className="result-list">

                {detections.map((item, index) => (

                    <div
                        key={index}
                        className="result-item"
                    >

                        <span className="result-class">

                            {item.class}

                        </span>

                        <span className="result-confidence">

                            {Math.round(item.confidence * 100)}%

                        </span>

                    </div>

                ))}

            </div>

        )}

    </div>

);

}

export default ResultPanel;