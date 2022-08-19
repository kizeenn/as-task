import { WiVolcano } from "react-icons/wi";

function EmptyState() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-2">
      <WiVolcano className="text-9xl text-gray-700" />
      <p className="text-gray-600">Nothing here...</p>
    </div>
  );
}

export default EmptyState;
