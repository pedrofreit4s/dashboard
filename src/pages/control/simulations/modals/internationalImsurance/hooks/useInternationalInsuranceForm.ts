import { useEffect, useState } from "react";
import { ISimulation } from "../../../../../../shared/interfaces/simulations/ISimulation";
import { api } from "../../../../../../shared/services/api";
import { Item } from "../../../components/customSelect";

export function useIntarnationalInsuranceForm(simulation?: ISimulation | null) {
  const [isLoading, setIsLoading] = useState(false);

  const [seguro, setSeguro] = useState<Item>();
  const [seguros, setSeguros] = useState<Item[]>([]);

  const [valor, setValor] = useState<string>("");
  const [valorBrl, setValorBrl] = useState<string>("");

  // Seguros
  async function loadTaxaMoedaSeguro() {
    setIsLoading(true);

    const { data } = await api.get("/safes");
    setSeguros(data.map((item: any) => ({ key: item.id, value: item.name })));
  }

  useEffect(() => {
    Promise.all([loadTaxaMoedaSeguro()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (simulation?.SimulationInternationalInsuranse[0]) {
      const seguro = simulation.SimulationInternationalInsuranse[0];

      setSeguro({ key: seguro.seguro.id, value: seguro.seguro.name });
      setValor(seguro.valor_moeda);
      setValorBrl(seguro.valor_brl);
    }
  }, [simulation]);

  return {
    seguro,
    setSeguro,
    seguros,
    valor,
    setValor,
    valorBrl,
    setValorBrl,
    isLoading,
  } as const;
}
