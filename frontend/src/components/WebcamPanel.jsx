import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { detectObjects } from "../services/detectionService";
const WebcamPanel = forwardRef(({ detections, setDetections }, ref) =>{

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const captureCanvasRef = useRef(null);

    const overlayCanvasRef = useRef(null);
    const detectionHistoryRef = useRef([]);

    const [cameraOn, setCameraOn] = useState(false);
    const isDetectingRef = useRef(false);
    

    const startCamera = () => {

        setCameraOn(true);

    };

    const stopCamera = () => {

        streamRef.current
            ?.getTracks()
            .forEach(track => track.stop());

        if(videoRef.current){

            videoRef.current.srcObject = null;

        }

        // Clear current detections
        setDetections([]);

        // Clear last 3-frame detection history
        detectionHistoryRef.current = [];

        setCameraOn(false);

    };
    console.log("captureFrame called");
    const captureFrame = () => {
        if (isDetectingRef.current) return;
        

        if (!videoRef.current || !captureCanvasRef.current) return;

        const video = videoRef.current;
        const canvas = captureCanvasRef.current;

        if (
            video.videoWidth === 0 ||
            video.videoHeight === 0
        ) {
            return;
        }

        isDetectingRef.current = true;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0);

        console.log("Frame captured");
        canvas.toBlob(async (blob) => {

            if (!blob) return;

            try {
                console.log("Calling backend...");
                const result = await detectObjects(blob);
                console.log("Backend response:", result);
                // Ignore very weak predictions
                const filteredDetections = result.filter(
                    (detection) => detection.confidence >= 0.30
                );

                // Store current frame
                detectionHistoryRef.current.push(filteredDetections);

                // Keep only last 3 frames
                if (detectionHistoryRef.current.length > 3) {
                    detectionHistoryRef.current.shift();
                }

               /**const history = detectionHistoryRef.current;

                // Wait until we have 3 frames
                if (history.length < 2) {
                    return;
                }

                const confirmedDetections = [];

                // Get all class names seen in recent frames
                const classNames = [
                    ...new Set(
                        history.flat().map((detection) => detection.class)
                    )
                ];

                classNames.forEach((className) => {

                    // Find this class in each recent frame
                    const matches = history
                        .map((frame) =>
                            frame.find(
                                (detection) => detection.class === className
                            )
                        )
                        .filter(Boolean);

                    // Object must appear in at least 2 of last 3 frames
                    if (matches.length >= 2) {

                        // Use most recent bounding box
                        const latestDetection =
                            matches[matches.length - 1];

                        // Average confidence across recent detections
                        const averageConfidence =
                            matches.reduce(
                                (sum, detection) =>
                                    sum + detection.confidence,
                                0
                            ) / matches.length;

                        confirmedDetections.push({
                            ...latestDetection,
                            confidence:
                                Math.round(averageConfidence * 100) / 100
                        });
                    }
                });
                setDetections(confirmedDetections);**/
                
                setDetections(filteredDetections);
            }
            catch(error){

                console.error("Detection Error:", error);

            }
            finally{

                isDetectingRef.current = false;

            }

        }, "image/jpeg");

    };
    useImperativeHandle(ref, () => ({

        getSnapshot: () => {

            const video = videoRef.current;
            const captureCanvas = captureCanvasRef.current;
            const overlayCanvas = overlayCanvasRef.current;

            if (!video || !captureCanvas || !overlayCanvas) {
                return null;
            }

            captureCanvas.width = video.videoWidth;
            captureCanvas.height = video.videoHeight;

            const ctx = captureCanvas.getContext("2d");

            // Draw webcam frame
            ctx.drawImage(
                video,
                0,
                0,
                captureCanvas.width,
                captureCanvas.height
            );

            // Draw bounding boxes + labels
            ctx.drawImage(
                overlayCanvas,
                0,
                0
            );

            return captureCanvas.toDataURL("image/png");

        }

    }));
    useEffect(() => {

        if (!cameraOn) return;

        const interval = setInterval(() => {

            captureFrame();

        }, 700);

        return () => clearInterval(interval);

    }, [cameraOn]);

    useEffect(() => {

        if (!cameraOn) return;

        const startVideo = async () => {

            try {

                const stream = await navigator.mediaDevices.getUserMedia({

                    video: true

                });

                streamRef.current = stream;

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                }

            } catch (error) {

                console.error("Camera Error:", error);

                alert(error.name + " : " + error.message);

            }

        };

        startVideo();

    }, [cameraOn]);

    useEffect(() => {

        const canvas = overlayCanvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!detections || detections.length === 0) {
            return;
        }

        detections.forEach((detection) => {

            const x = detection.x1;
            const y = detection.y1;

            const width = detection.x2 - detection.x1;
            const height = detection.y2 - detection.y1;

            // Draw Rectangle
            ctx.strokeStyle = "lime";
            ctx.lineWidth = 4;

            ctx.strokeRect(
                x,
                y,
                width,
                height
            );

            // Label Background
            ctx.fillStyle = "lime";

            ctx.fillRect(
                x,
                y - 30,
                170,
                30
            );

            // Label Text
            ctx.fillStyle = "black";
            ctx.font = "18px Arial";

            ctx.fillText(
                `${detection.class} ${Math.round(detection.confidence * 100)}%`,
                x + 5,
                y - 8
            );

        });

    }, [detections]);

    return (

        <div className="webcam-panel">

            <h2>Live Camera</h2>

            {cameraOn ? (
                <div className="camera-container">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="live-video"
                    />

                    <canvas
                        ref={captureCanvasRef}
                        style={{display: "none"}}
                    />

                    <canvas
                        ref={overlayCanvasRef}
                        className="overlay-canvas"
                    />
                </div>
                

            ) : (

                <div className="camera-placeholder">

                    📷

                    <p>Camera is currently off</p>


                </div>

            )}

            <button
                className="start-camera-btn"
                onClick={cameraOn ? stopCamera : startCamera}
            >
                {cameraOn ? "Stop Camera" : "Start Camera"}
            </button>   

        </div>

    );

});

export default WebcamPanel;