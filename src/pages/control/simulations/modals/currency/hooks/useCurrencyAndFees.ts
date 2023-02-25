import { useCallback, useEffect, useState } from "react";
import { ICoin } from "../../../../../../shared/interfaces/ICoin";
import { api } from "../../../../../../shared/services/api";
import { Item } from "../../../components/customSelect";

export function useCurrencyAndFees(fetch: boolean = true) {
  const [currenciesToSelect, setCurrenciesToSelect] = useState<Item[]>([]);

  const findCurrencies = useCallback(async () => {
    const { data } = await api.get("/coins");

    setCurrenciesToSelect(data.map((coin: ICoin) => ({ key: coin.id, value: coin.name })));
  }, []);

  const findCurrencyFeeByDate = useCallback(async (currency: string, date: Date) => {
    const { data } = await api.get("/simulations/currencies-and-fees/currency", {
      params: {
        currency,
        date,
      },
    });

    return data;
  }, []);

  useEffect(() => {
    if (fetch) findCurrencies();
  }, [findCurrencies]);

  return { currenciesToSelect, findCurrencies, findCurrencyFeeByDate } as const;
}
