import { ImSpinner9 } from "react-icons/im";

function LoadingState() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-2">
      <ImSpinner9 className="animate-spin text-7xl text-gray-700" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}

export default LoadingState;
