import { IServicesAndFee } from "../IServicesAndFee";

export interface ICustomerDispatcherFee {
  id: string;
  value: string;
  dispatcherServicesAndFeesId: string;
  customerId?: string;
  dispatcherServicesAndFees: IServicesAndFee;
  created_at: Date;
  updated_at: Date;
}
