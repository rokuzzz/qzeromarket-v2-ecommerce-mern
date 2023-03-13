export type UserRole = 'admin' | 'guest'

export interface User {
  id: string,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password?: string,
  role: UserRole,
  accessToken?: string
}

export interface UserSliceState {
  listOfUsers: User[],
  currentUser: User | undefined
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