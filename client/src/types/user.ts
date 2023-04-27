export type UserRole = 'admin' | 'guest'

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password?: string,
  role: UserRole,
  accessToken?: string
}

export interface UserSliceState {
  listOfUsers: {
    data: User[],
    isLoading: boolean,
    error: string | undefined
  },
  currentUser: {
    data: User | undefined,
    isLoading: boolean,
    error: string | undefined
  },
}

export interface LoginCredentials {
  username: string,
  password: string
}

export interface RegisterCredentials {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
}

export interface GetUserByIDProps {
  id: string,
  token: string
}

export interface DataToUpdate {
  firstname?: string,
  lastname?: string,
  username?: string,
  email?: string,
  password?: string
}

export interface UpdateUserProps {
  id: string,
  updatedUserData: DataToUpdate,
  token: string
}