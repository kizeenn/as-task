import EventFormCreate from "../../../components/events/forms/create";

function CreateEventIndexPage() {
  return (
    <div className="max-w-xl mx-auto p-5">
      <div>
        <h1 className="text-lg leading-6 font-medium text-gray-900">Event</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Create an event you want to share with world!
        </p>
      </div>

      <EventFormCreate />
    </div>
  );
}

export default CreateEventIndexPage;
