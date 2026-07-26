import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <h1>
        Detect Real-World <br />
        Objects Instantly
      </h1>

      <p>
        AI Vision Detect uses state-of-the-art computer vision
        models to identify objects in real-time using your webcam.
      </p>

     <Link to="/signup">

        <button className="hero-btn">

          Get Started

          <ArrowRight
            size={20}
            strokeWidth={2.5}
          />

        </button>

      </Link>

    </section>
  );
}

export default Hero;