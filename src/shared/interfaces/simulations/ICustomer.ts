import { ITaxRegime } from "../ITaxRegime";
import { ICustomerDispatcherFee } from "./ICustomerDispatcherFee";
import { IUF } from "./IUf";

export interface ICustomer {
  id: string;
  name: string;
  fantasy_name: string;
  cnpj: string;
  taxRegimeId: string;
  taxRegime: ITaxRegime;
  ufId: string;
  uf: IUF;
  is_icms_tax_payer: boolean;
  is_industry: boolean;
  is_cde: boolean;
  created_at: Date;
  updated_at: Date;
  customerDispatcherFees: ICustomerDispatcherFee[];
}
