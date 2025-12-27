const video = document.getElementById('video');
const res = document.getElementById('result-code');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;

        // Mock detection loop
        setInterval(() => {
            // In a real app, we'd pass video frame to a barcode decoder lib here.
            // For now, we just simulate the camera feed being active.
        }, 1000);

    } catch (err) {
        res.textContent = "Camera Access Denied";
        res.style.color = "#ff0055";
    }
}

// Check for BarcodeDetector API (Chrome/Android mostly)
if ('BarcodeDetector' in window) {
    const detector = new BarcodeDetector();
    setInterval(async () => {
        try {
            const barcodes = await detector.detect(video);
            if (barcodes.length > 0) {
                res.textContent = barcodes[0].rawValue;
                res.style.color = "#00ff41";
            }
        } catch (e) { }
    }, 1000);
} else {
    document.querySelector('.note').textContent += " (Native Detector not supported in this browser)";
}

startCamera();
