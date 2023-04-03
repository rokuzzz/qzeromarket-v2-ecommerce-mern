import { TextField } from '@mui/material';

interface FormInputProps {
  label: string,
  placeholder: string,
  isRequired: boolean,
  type?: React.HTMLInputTypeAttribute | undefined 
}

const FormInput = (props: FormInputProps) => {
  const {label, placeholder, isRequired, type} = props
  return (
    <TextField 
      id='outlined-basic' 
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
