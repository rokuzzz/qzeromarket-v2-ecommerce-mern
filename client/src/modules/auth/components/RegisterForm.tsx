import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AuthSubmitButton } from './AuthSubmitButton';
import { FormInput } from './FormInput';

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDownSmall: boolean;
  isLoading: boolean;
}

export const RegisterForm = ({
  onSubmit,
  formData,
  onChange,
  isDownSmall,
  isLoading,
}: RegisterFormProps) => {
  const formInputValues = [
    {
      id: 'firstname-textfield',
      gridKey: 1,
      name: 'firstname',
      label: 'firstname',
      placeholder: 'John',
      isRequired: true,
    },
    {
      id: 'lastname-textfield',
      gridKey: 2,
      name: 'lastname',
      label: 'lastname',
      placeholder: 'Doe',
      isRequired: true,
    },
    {
      id: 'username-textfield',
      gridKey: 3,
      name: 'username',
      label: 'username',
      placeholder: 'johndoe',
      isRequired: true,
    },
    {
      id: 'email-textfield',
      gridKey: 4,
      name: 'email',
      label: 'email',
      placeholder: 'john.doe@email.com',
      isRequired: true,
      type: 'email',
    },
    {
      id: 'password-textfield',
      gridKey: 5,
      name: 'password',
      label: 'password',
      placeholder: '********',
      isRequired: true,
      type: 'password',
    },
  ];

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        rowSpacing={1.1}
        sx={{ maxWidth: '280px', margin: '25px auto' }}
      >
        {formInputValues.map((inputValue) => (
          <Grid item xs={12} key={inputValue.gridKey}>
            <FormInput
              key={inputValue.id}
              {...inputValue}
              value={formData[inputValue.name as keyof typeof formData]}
              onChange={onChange}
            />
          </Grid>
        ))}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <AuthSubmitButton isLoading={isLoading} buttonText='Sign up' />
          <Typography
            color={'text.secondary'}
            sx={isDownSmall ? { position: 'relative', zIndex: 3 } : {}}
          >
            Already have an account?&nbsp;{' '}
            <Link to='/login' style={{ color: 'black' }}>
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};
