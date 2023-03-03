import { ISimulationContainer } from "./ISimulationContainer";

export interface IinternationalTransports {
  id: string;
  modalId: string;
  carga_especial_perigosa: boolean;
  carga_com_excessos: boolean;
  incotermId: string;
  valor_frete_internacional: string;
  despesas_rateio: string;
  valor_frete_nacional: string;
  capatazia: string;
  simulationId: string;
  containers: ISimulationContainer[];
  agencyFees: {
    id: string;
    agencyFeesId: string;
    internationalTransportId: string;
    created_at: Date;
    updated_at: Date;
    agencyFee: {
      id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
    };
  }[];
  modalidade: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  incoterm: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
