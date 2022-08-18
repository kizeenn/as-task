import { Field, Form, Formik, FormikProps } from "formik";

type TextType = "text" | "datetime-local" | "file";

interface FieldFormProps {
  type: TextType;
  label: string;
  value: string;
  name: string;
}

function FieldForm(props: FieldFormProps) {
  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label
        htmlFor={props.name}
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {props.label}
      </label>

      <Field
        accept={props.type === "file" ? "image/png, image/jpeg" : undefined}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        type={props.type}
        name={props.name}
      />
    </div>
  );
}

const categories = [
  { value: "sport", title: "Sport", name: "category" },
  { value: "culture", title: "Culture", name: "category" },
  { value: "health", title: "Health", name: "category" },
];

function CategoryRadioInputs() {
  return (
    <div className="-mt-6">
      <label className="text-xs font-medium text-gray-900">Category</label>
      <fieldset className="mt-4">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center">
              <Field
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                type="radio"
                name={category.name}
                value={category.value}
              />

              <label
                htmlFor={category.value}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {category.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function CreateEventIndexPage() {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        date: "",
        category: "",
        phoneNumber: "",
        place: "",
        image: "",
        id: crypto.randomUUID(),
      }}
      onSubmit={(values) => {
        fetch("http://localhost:3000/api/events", {
          method: "post",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      }}
    >
      {() => (
        <div className="max-w-xl mx-auto mt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Event
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Create an event you want to share with world!
            </p>
          </div>

          <Form className="mt-6 sm:mt-5 flex flex-col gap-10">
            <FieldForm
              type="text"
              name="title"
              label="Event title"
              value="title"
            />

            <CategoryRadioInputs />

            <FieldForm
              type="datetime-local"
              name="date"
              label="Event date"
              value="date"
            />

            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="description"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Event Description
              </label>

              <Field
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                as="textarea"
                name="description"
              />
            </div>

            <FieldForm
              type="file"
              name="image"
              label="Event image"
              value="image"
            />

            <FieldForm
              type="text"
              name="place"
              label="Event place"
              value="place"
            />

            <FieldForm
              type="text"
              name="phoneNumber"
              label="Event phone number"
              value="phoneNumber"
            />

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateEventIndexPage;
