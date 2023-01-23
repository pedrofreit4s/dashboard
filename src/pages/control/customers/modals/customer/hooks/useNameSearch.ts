import { useState } from "react";
import { ICustomer } from "../../../../../../shared/interfaces/simulations/ICustomer";
import { api } from "../../../../../../shared/services/api";
import { useDebounce } from "./useDebounce";

export function useNameSearch() {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const { debounce } = useDebounce();

  const findCustomerByName = async (name: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      debounce(async () => {
        try {
          const { data } = await api.get(`/customers/${name}/name`);

          setCustomer(data);

          resolve(data);
        } catch (error) {}
      }, 500);
    });
  };

  return { findCustomerByName, customer, setCustomer };
}
