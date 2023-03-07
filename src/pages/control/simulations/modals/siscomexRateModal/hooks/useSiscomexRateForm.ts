import { useEffect, useState } from "react";
import { ISimulation } from "../../../../../../shared/interfaces/simulations/ISimulation";

export function useSiscomexRateForm(simulation?: ISimulation | null) {
  const [isLoading, setIsLoading] = useState(false);

  const [quantidadeAdicoes, setQuantidadeAdicoes] = useState<number>(0);

  const [valorMoeda, setValorMoeda] = useState<string>("");
  const [valorBrl, setValorBrl] = useState<string>("");

  useEffect(() => {
    if (simulation?.SimulationSixcomexRate[0]) {
      const simulationSiscomexRate = simulation.SimulationSixcomexRate[0];

      setQuantidadeAdicoes(simulationSiscomexRate.quantidade_adicoes);
      setValorMoeda(simulationSiscomexRate.valor_moeda);
      setValorBrl(simulationSiscomexRate.valor_brl);
    }
  }, [simulation]);

  return {
    isLoading,
    quantidadeAdicoes,
    setQuantidadeAdicoes,
    valorMoeda,
    setValorMoeda,
    valorBrl,
    setValorBrl,
  } as const;
}
