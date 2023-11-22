import { TextField } from '@mui/material';

interface FormInputProps {
  id?: string;
  name?: string;
  value: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const FormInput = (props: FormInputProps) => {
  const { id, name, value, label, placeholder, type, isRequired, onChange } =
    props;

  return (
    <TextField
      id={id}
      name={name}
      value={value}
      fullWidth
      size='medium'
      variant='outlined'
      label={label}
      placeholder={placeholder}
      required={isRequired}
      type={type}
      onChange={onChange}
    />
  );
};

export default FormInput;
