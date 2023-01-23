import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../../../../shared/services/api";
import { Item } from "../../../components/customSelect";

export function useTaxRegime() {
  const [taxRegime, setTaxRegime] = useState<Item | undefined>();
  const [taxRegimes, setTaxRegimes] = useState<Item[] | undefined>();

  const loadTaxRegimes = useCallback(async () => {
    try {
      const { data } = await api.get("/tax-regimes");

      setTaxRegimes(data.map((taxRegime: any) => ({ key: taxRegime.id, value: taxRegime.name })));
      return data;
    } catch (error) {
      toast.error("Falha ao carregar as os regimes tributários!");
    }
  }, []);

  return { loadTaxRegimes, taxRegime, setTaxRegime, taxRegimes, setTaxRegimes };
}
