import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/resources/events";
import EmptyState from "../../components/query-states/empty";
import ErrorState from "../../components/query-states/error";
import LoadingState from "../../components/query-states/loading";

function EventsListIndexPage() {
  const { isLoading, isError, data, isSuccess } = useQuery(
    ["events"],
    getEvents
  );
  return (
    <>
      {isLoading ? <LoadingState /> : null}
      {isSuccess && !data ? <EmptyState /> : null}
      {isError ? <ErrorState /> : null}

      {isSuccess && data ? (
        <div className="flex flex-col">
          <div className="flex flex-col gap-8 md:flex-row justify-between md:px-10 py-10 h-full">
            {data?.map((event) => (
              <div
                key={event.id}
                className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full md:h-96 w-full md:w-1/2 "
              >
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src={event.image}
                    alt="Event image"
                  />
                  <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
                </div>

                <div className="relative flex flex-col p-5 h-full justify-between">
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

          <div className="max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center py-5">
            <Link
              to="/events/create"
              className="flex items-center justify-center px-4 py-3 border border-gray-400 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-indigo-50 sm:px-8"
            >
              Create new event
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EventsListIndexPage;
