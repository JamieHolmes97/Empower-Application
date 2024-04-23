import { useField } from "remix-validated-form";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  defaultValue?: string | number;
}

const FormInput = ({ name, label, type = "text", autoFocus = false, defaultValue }: FormInputProps) => {
  const { getInputProps, error } = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          {...getInputProps({
            id: name,
            required: true,
            autoFocus,
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
            type,
          })}
          defaultValue={defaultValue}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormInput;
