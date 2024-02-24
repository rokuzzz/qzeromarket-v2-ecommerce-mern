export type UserRole = 'admin' | 'guest';

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  accessToken?: string;
}
