export interface ISimulationContainer {
  id: string;
  containerTypeId: string;
  qntd: number;
  created_at: Date;
  updated_at: Date;
  internationalTransportId: string;
  containerType: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
}
