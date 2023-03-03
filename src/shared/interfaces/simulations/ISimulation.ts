import { ITypeOfEstimate } from "../ITypeOfEstimate";
import { ICurrencyAndFees } from "./ICurrencyAndFee";
import { ICustomer } from "./ICustomer";
import { IinternationalTransports } from "./IinternationalTransports";
import { ISimulationContainer } from "./ISimulationContainer";

export interface ISimulation {
  id: string;
  customer: ICustomer | null;
  typeOfEstimates: ITypeOfEstimate[];
  customerId?: any;
  created_at: Date;
  updated_at: Date;
  SimulationCurrenciesAndFees: ICurrencyAndFees[];
  internationalTransports: IinternationalTransports[];
}
