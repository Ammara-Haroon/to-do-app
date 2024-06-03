import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const LoadingSpinner = () => {
  return (
    <div
      data-testid="spinner"
      className="flex w-full h-full fixed z-10 bg-transparent justify-center items-center"
    >
      <FontAwesomeIcon
        className="text-5xl text-rose-500 z-10"
        icon={faSpinner}
      />
    </div>
  );
};

export default LoadingSpinner;
