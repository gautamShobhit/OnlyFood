import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="h-lvh justify-items-center content-center bg-cyan-400 text-2xl">
      <h1>Awww Snap....!!!😔</h1>
      <h2>Something went wrong !!</h2>
      <h3>Message : {error.statusText}</h3>
      <h4>
        <Link to="/">Back</Link>
      </h4>
    </div>
  );
};
export default Error;
