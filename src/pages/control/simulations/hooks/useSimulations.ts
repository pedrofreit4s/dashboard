import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { ISimulation } from "../../../../shared/interfaces/simulations/ISimulation";
import { api } from "../../../../shared/services/api";

export function useSimulations() {
  const [simulation, setSimulation] = useState<ISimulation | null>(null);
  const [simulations, setSimulations] = useState<ISimulation[]>([]);

  const loadSimulationById = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/simulations/${id}`);

      setSimulation(data);
      return data;
    } catch (error) {
      toast.error("Erro ao carregar a simulação!");
    }
  }, []);

  const loadSimulations = useCallback(async () => {
    try {
      const { data } = await api.get("/simulations");

      setSimulations(data);
      return data;
    } catch (error) {
      toast.error("Erro ao carregar as simulações!");
    }
  }, []);

  return {
    loadSimulationById,
    loadSimulations,
    simulations,
    setSimulations,
    simulation,
    setSimulation,
  };
}
