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
  SimulationInternationalInsuranse: {
    id: string;
    safeId: string;
    valor_moeda: string;
    valor_brl: string;
    simulationId: string;
    created_at: Date;
    updated_at: Date;
    seguro: {
      id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
    };
  }[];
  SimulationSixcomexRate: {
    id: string;
    quantidade_adicoes: number;
    valor_moeda: string;
    valor_brl: string;
    simulationId: string;
    created_at: Date;
    updated_at: Date;
  }[];
  SimulationICMSDiscount: {
    id: string;
    normal: string;
    camex: string;
    simulationId: string;
    created_at: Date;
    updated_at: Date;
  }[];
}
