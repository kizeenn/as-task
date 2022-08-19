import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { createEvent, Event } from "../../../../api/resources/events";
import * as Yup from "yup";

type TextType = "text" | "datetime-local" | "file" | "email" | "textarea";

interface FieldFormProps {
  as?: string | React.ComponentType<FieldProps["field"]>;
  type: TextType;
  label: string;
  name: string;
}
interface ImageInputProps {
  label: string;
  name: string;
  onChange: (event: any) => void;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EventSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date()
    .required("Required")
    .min(new Date(), "Event must be in the future"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Required"),
  image: Yup.mixed().required("Required"),
  place: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string().required("Required").email("Invalid email"),
});

const categories = [
  { value: "sport", label: "Sport" },
  { value: "culture", label: "Culture" },
  { value: "health", label: "Health" },
];

function RadioField(props: {
  options: Array<{ label: string; value: string }>;
  name: string;
  label: string;
}) {
  return (
    <fieldset className="-mt-6">
      <legend className="text-xs font-medium text-gray-900">
        {props.name}
      </legend>

      <ErrorMessage
        className="text-xs font-bold text-red-600"
        component="div"
        name={props.name}
      />

      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
        {props.options.map((option) => (
          <label key={option.label} className="flex items-center">
            <span className="ml-3 block text-sm font-medium text-gray-700">
              {option.label}
            </span>

            <Field
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              type="radio"
              name={props.name}
              value={option.value}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TextInput(props: FieldFormProps) {
  return (
    <label className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <span className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
        {props.label}
      </span>

      <ErrorMessage
        className="text-xs font-bold text-red-600"
        component="div"
        name={props.name}
      />

      <Field
        as={props.as ? props.as : undefined}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        type={props.type}
        name={props.name}
      />
    </label>
  );
}
function ImageInput(props: ImageInputProps) {
  return (
    <label className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <span className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
        {props.label}
      </span>

      <ErrorMessage
        className="text-xs font-bold text-red-600"
        component="div"
        name={props.name}
      />

      <input
        onChange={props.onChange}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        type="file"
        name={props.name}
      />
    </label>
  );
}

const EventCreateForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        date: new Date(),
        category: "sport",
        phoneNumber: "",
        place: "",
        image: "",
        email: "",
        id: crypto.randomUUID(),
      }}
      validationSchema={EventSchema}
      onSubmit={async (values: Event) => {
        const event = await createEvent(values);
        navigate(`/events/${event.id}`);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="mt-6 sm:mt-5 flex flex-col gap-10">
          <TextInput type="text" name="title" label="Event title" />

          <RadioField label="Category" name="category" options={categories} />

          <TextInput name="date" label="Event date" type="datetime-local" />

          <TextInput
            as="textarea"
            type="textarea"
            name="description"
            label="Event description"
          />

          <TextInput type="text" name="place" label="Event place" />

          <ImageInput
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) return;
              setFieldValue("image", URL.createObjectURL(file));
            }}
            name="image"
            label="Event Image"
          />

          <TextInput
            type="text"
            name="phoneNumber"
            label="Contact phone number"
          />

          <TextInput type="email" name="email" label="Contact email" />

          <div className="flex justify-between">
            <Link
              to="/events"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to events
            </Link>

            <div className="flex justify-end">
              <button
                type="reset"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear
              </button>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventCreateForm;
