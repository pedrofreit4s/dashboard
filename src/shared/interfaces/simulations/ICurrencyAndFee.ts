export interface ICurrencyAndFees {
  id: string;
  data_registro_di: Date;
  moeda_mercadorias: string;
  taxa_moeda_mercadoria: string;
  moeda_frete_internacional: string;
  taxa_moeda_frete_internacional: string;
  moeda_seguro: string;
  taxa_moeda_seguro: string;
  moeda_agenciamento: string;
  taxa_moeda_agenciamento: string;
  simulationId: string;
  created_at: Date;
  updated_at: Date;
}
