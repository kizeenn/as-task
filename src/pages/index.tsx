import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <main className="h-screen w-full">
      <div className="flex flex-col sm:flex-row gap-4 h-5/6 items-center justify-center max-w-sm mx-auto ">
        <Link
          to="/events"
          className="w-full flex items-center justify-center  text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg py-2 "
        >
          Get started
        </Link>
      </div>
    </main>
  );
}

export default IndexPage;
