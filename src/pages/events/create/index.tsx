import { Field, Form, Formik, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { postEvent } from "../../../api/resources/events";

type TextType = "text" | "datetime-local" | "file" | "email";

interface FieldFormProps {
  type: TextType;
  label: string;
  value: string;
  name: string;
  error?: FormikErrors<Date> | FormikErrors<String> | FormikErrors<File>;
  touched?: FormikTouched<Date> | FormikTouched<String> | FormikTouched<File>;
}

interface CategoryRadioInputsProps {
  error?: string;
  touched?: boolean;
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

function FieldForm(props: FieldFormProps) {
  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label
        htmlFor={props.name}
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {props.label}
      </label>

      {props.error && props.touched ? (
        <div className="text-xs font-bold text-red-600">{props.error}</div>
      ) : null}

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

function CategoryRadioInputs(props: CategoryRadioInputsProps) {
  return (
    <div className="-mt-6">
      <label className="text-xs font-medium text-gray-900">Category</label>

      {props.error && props.touched ? (
        <div className="text-xs font-bold text-red-600">{props.error}</div>
      ) : null}

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
        date: new Date(),
        category: "",
        phoneNumber: "",
        place: "",
        image: "",
        email: "",
        id: crypto.randomUUID(),
      }}
      validationSchema={EventSchema}
      onSubmit={(values, { resetForm }) => {
        postEvent(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <div className="max-w-xl mx-auto p-5">
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
              error={errors.title}
              touched={touched.title}
            />

            <CategoryRadioInputs
              error={errors.category}
              touched={touched.category}
            />

            <FieldForm
              type="datetime-local"
              name="date"
              label="Event date"
              value="date"
              error={errors.date}
              touched={touched.date}
            />

            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="description"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Event Description
              </label>

              {errors.description && touched.description ? (
                <div className="text-xs font-bold text-red-600">
                  {errors.description}
                </div>
              ) : null}

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
              error={errors.image}
              touched={touched.image}
            />

            <FieldForm
              type="text"
              name="place"
              label="Event place"
              value="place"
              error={errors.place}
              touched={touched.place}
            />

            <FieldForm
              type="text"
              name="phoneNumber"
              label="Contact phone number"
              value="phoneNumber"
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
            />

            <FieldForm
              type="email"
              name="email"
              label="Contact email"
              value="email"
              error={errors.email}
              touched={touched.email}
            />

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
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateEventIndexPage;
