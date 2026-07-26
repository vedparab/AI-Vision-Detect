import "../styles/Features.css";

import {
  Zap,
  Camera,
  ShieldCheck,
} from "lucide-react";

function Features() {
  return (
    <section className="features">

      <div className="feature-card">

        <div className="feature-icon">
          <Zap size={28} />
        </div>

        <h3>Real-time Detection</h3>

        <p>
          Detect objects instantly with high accuracy using your webcam.
        </p>

      </div>

      <div className="feature-card">

        <div className="feature-icon">
          <Camera size={28} />
        </div>

        <h3>Webcam Powered</h3>

        <p>
          Works directly in your browser.
          No uploads required.
        </p>

      </div>

      <div className="feature-card">

        <div className="feature-icon">
          <ShieldCheck size={28} />
        </div>

        <h3>Privacy First</h3>

        <p>
          Your camera feed stays secure and private.
        </p>

      </div>

    </section>
  );
}

export default Features;