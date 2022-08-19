import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/resources/events";

function EventsListIndexPage() {
  const { data } = useQuery(["events"], getEvents);

  return (
    <div className="flex flex-col gap-8 md:flex-row justify-between md:px-10 py-10 h-screen">
      {data?.map((event) => (
        <div
          key={event.id}
          className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-3/4"
        >
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={event.image}
              alt="People working on laptops"
            />
            <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
          </div>

          <div className="relative flex flex-col p-5 h-full justify-center">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight lg:text-6xl lg:tracking-tight">
              <span className="block text-white">{event.title}</span>
            </h1>

            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-300 sm:max-w-3xl">
              {event.description}
            </p>

            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <Link
                to={`/events/${event.id}`}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                Go to event
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsListIndexPage;
