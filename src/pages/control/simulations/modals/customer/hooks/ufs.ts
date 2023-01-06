import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../../../../shared/services/api";
import { Item } from "../../../components/customSelect";

export function useUFs() {
  const [uf, setUf] = useState<Item | undefined>();
  const [ufs, setUfs] = useState<Item[] | undefined>();

  const loadUFs = useCallback(async () => {
    try {
      const { data } = await api.get("/ufs");

      setUfs(data.map((uf: any) => ({ key: uf.id, value: uf.name })));
      return data;
    } catch (error) {
      toast.error("Falha ao carregar as UFs!");
    }
  }, []);

  return { loadUFs, uf, setUf, ufs, setUfs };
}
