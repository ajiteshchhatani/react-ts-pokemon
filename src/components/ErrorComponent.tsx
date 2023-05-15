import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <div className="text-center">
      <p>
        An unexpected error has occured. Please click <Link to="/">here</Link>{" "}
        to return to Home.
      </p>
    </div>
  );
};

export default ErrorComponent;
