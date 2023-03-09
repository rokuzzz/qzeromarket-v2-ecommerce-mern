export type UserRole = 'admin' | 'guest'

export interface User {
  id: string,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  role: UserRole
}

export interface UserSliceState {
  listOfUsers: User[],
  currentUser: User | undefined
}