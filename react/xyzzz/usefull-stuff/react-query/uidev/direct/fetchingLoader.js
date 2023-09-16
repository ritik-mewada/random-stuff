import { useIsFetching } from "react-query";
import Loader from "./Loader";
import { FaSpinner } from "react-icons/fa";

export default function FetchingIndicator() {
  const isFetching = useIsFetching();
  if (!isFetching) return null;

  return (
    <div className="fetching-indicator">
      <Loader />
    </div>
  );
}

function Loader() {
  return <FaSpinner className="loader" />;
}
// .loader {
//   animation: spin 1s steps(8) infinite;
//   height: 1rem;
// }
// .fetching-indicator {
//   position: fixed;
//   top: 0;
//   right: 0;
//   margin: 1rem;
//   z-index: 10;
//   pointer-events: none;
// }

// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
