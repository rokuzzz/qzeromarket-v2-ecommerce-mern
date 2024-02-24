import { User } from 'src/modules/common/types/userTypes';

interface LoggedInUser {
  data: User | undefined;
  isLoading: boolean;
  error: string | undefined;
}

export interface AuthSliceState {
  loggedInUser: LoggedInUser;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}
