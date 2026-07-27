const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const detectObjects = async (imageBlob) => {

    const formData = new FormData();

    formData.append("file", imageBlob, "frame.jpg");

    const response = await fetch(`${API_URL}/detect`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Detection failed: ${response.status}`);
    }

    return await response.json();
};