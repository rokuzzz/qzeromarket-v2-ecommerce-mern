import { TextField } from '@mui/material';

interface FormInputProps {
  id: string,
  label: string,
  placeholder: string,
  isRequired: boolean,
  type?: React.HTMLInputTypeAttribute | undefined 
}

const FormInput = (props: FormInputProps) => {
  const {id, label, placeholder, isRequired, type} = props
  return (
    <TextField 
      id={id}
      fullWidth 
      size='medium'
      variant='outlined' 
      label={label}
      placeholder={placeholder}
      required={isRequired}
      type={type}
    />
  );
};

export default FormInput;
