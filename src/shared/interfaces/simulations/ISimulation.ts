import { ITypeOfEstimate } from "../ITypeOfEstimate";
import { ICurrencyAndFees } from "./ICurrencyAndFee";
import { ICustomer } from "./ICustomer";

export interface ISimulation {
  id: string;
  customer: ICustomer | null;
  typeOfEstimates: ITypeOfEstimate[];
  customerId?: any;
  created_at: Date;
  updated_at: Date;
  SimulationCurrenciesAndFees: ICurrencyAndFees[];
}
