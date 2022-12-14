import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../../api/resources/events";
import EmptyState from "../../../components/query-states/empty";
import ErrorState from "../../../components/query-states/error";
import LoadingState from "../../../components/query-states/loading";
import IntlService from "../../../services/intl";

function EventIndexPage() {
  const { id } = useParams();

  const { isLoading, isError, data, isSuccess } = useQuery(
    ["events", id],
    async () => (id ? getEvent(id) : null)
  );

  const getIntlService = IntlService();

  return (
    <>
      {isLoading ? <LoadingState /> : null}
      {isSuccess && !data ? <EmptyState /> : null}
      {isError ? <ErrorState /> : null}

      {isSuccess && data ? (
        <div className="bg-white shadow sm:rounded-lg max-w-6xl mx-auto mt-4">
          <div className="relative">
            <img
              className="h-96 w-full object-cover"
              src={data.image}
              alt="Event Image"
            />

            <Link
              to="/events"
              className="absolute top-0 left-0 flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-br-xl shadow-sm text-gray-700 bg-white opacity-75 hover:opacity-100 sm:px-8"
            >
              ← Return to events
            </Link>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Title</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.title}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.description}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.category}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getIntlService.formatDate(new Date(data.date), {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Place</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.place}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                  Phone number
                </p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.phoneNumber}
                </p>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EventIndexPage;
