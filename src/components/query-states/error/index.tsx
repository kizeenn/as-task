import { FaPoo } from "react-icons/fa";

function ErrorState() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <FaPoo className="text-7xl text-gray-700" />
      <p className="text-gray-600">Holy guacamole!</p>
    </div>
  );
}

export default ErrorState;
