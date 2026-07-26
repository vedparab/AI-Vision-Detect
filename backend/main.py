
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import numpy as np


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model (only once when server starts)
model = YOLO("yolov8n.pt")


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Vision Detect Backend"
    }


@app.post("/detect")
async def detect(file: UploadFile = File(...)):

    # Read uploaded image bytes
    image_bytes = await file.read()

    # Convert bytes → NumPy array
    np_array = np.frombuffer(image_bytes, np.uint8)

    # Decode image using OpenCV
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    # Run YOLO
    results = model.predict(
        image,
        conf=0.40,
        imgsz=960,
        verbose=False,
    )

    result = results[0]
    

    detections = []

    for box in result.boxes:

        class_id = int(box.cls[0])

        confidence = float(box.conf[0])

        class_name = result.names[class_id]

        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append({
            "class": class_name,
            "confidence": round(confidence, 2),
            "x1": round(x1),

            "y1": round(y1),

            "x2": round(x2),

            "y2": round(y2)
            
        })

    return detections