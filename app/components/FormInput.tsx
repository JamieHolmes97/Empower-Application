import { useField } from "remix-validated-form";
interface FormInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'textarea';
  autoFocus?: boolean;
  rows?: number;
  defaultValue?: string | number;
}

const FormInput = ({ name, label, type = "text", autoFocus = false, rows = 1, defaultValue }: FormInputProps) => {
  const { getInputProps, error } = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {type === 'textarea' ? (
          <textarea {...getInputProps({ id: name, autoFocus })} defaultValue={defaultValue} rows={rows} className="w-full rounded border border-gray-500 px-2 py-1 text-lg"></textarea>
        ) : (
          <input {...getInputProps({ id: name, type, autoFocus })} defaultValue={defaultValue} className="w-full rounded border border-gray-500 px-2 py-1 text-lg" />
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormInput;

