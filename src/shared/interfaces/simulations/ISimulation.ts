import { ICustomer } from "./ICustomer";

export interface ISimulation {
  id: string;
  customer: ICustomer | null;
  customerId?: any;
  created_at: Date;
  updated_at: Date;
}
