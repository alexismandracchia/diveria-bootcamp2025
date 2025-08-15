import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [seconds, navigate]);

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <h2 className="not-found-face">:(</h2>
      <p className="not-found-redirect">
        Redirecting to Home in <span>{seconds}</span> seconds...
      </p>
    </div>
  );
}
