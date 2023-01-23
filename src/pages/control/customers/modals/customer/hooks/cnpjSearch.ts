import { useState } from "react";
import { ICustomer } from "../../../../../../shared/interfaces/simulations/ICustomer";
import { api } from "../../../../../../shared/services/api";

export function useCNPJSearch() {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const searchCNPJ = async (pj: string): Promise<ICustomer | undefined> => {
    const cnpj = pj.replace(/\D/g, "");

    if (cnpj.length < 14) return undefined;
    try {
      const { data } = await api.get(`/customers/${cnpj}/cnpj`);

      setCustomer(data);
      return data;
    } catch (error) {
      console.log("no cnpj found!");
    }
  };

  const searchById = async (id: string): Promise<ICustomer | undefined> => {
    try {
      const { data } = await api.get(`/customers/${id}/id`);

      setCustomer(data);
      return data;
    } catch (error) {
      console.log("no customer found!");
    }
  };

  return { searchCNPJ, searchById, customer, setCustomer };
}
