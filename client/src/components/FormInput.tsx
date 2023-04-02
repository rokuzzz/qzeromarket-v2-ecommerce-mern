import { TextField } from '@mui/material'

interface FormInputProps {
  label: string
}

const FormInput = (props: FormInputProps) => {
  return (
    <div>
      <TextField id="outlined-basic" label={props.label} variant="outlined"  />
    </div>
  )
}

export default FormInput