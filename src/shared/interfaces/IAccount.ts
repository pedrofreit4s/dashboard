export interface IAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  created_at: Date;
  updated_at: Date;
}
