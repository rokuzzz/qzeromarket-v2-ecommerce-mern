import { User } from 'src/modules/common/types/userTypes';

export interface UserSliceState {
  data: User[];
  isLoading: boolean;
  error: string | undefined;
}

export interface GetUserByIDProps {
  id: string;
  token: string;
}

export interface DataToUpdate {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserProps {
  id: string;
  updatedUserData: DataToUpdate;
  token: string;
}
