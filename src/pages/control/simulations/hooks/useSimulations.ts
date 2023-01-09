import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { ISimulation } from "../../../../shared/interfaces/simulations/ISimulation";
import { api } from "../../../../shared/services/api";

export interface ISimulationPaginator {
  data: ISimulation[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number;
  };
}

export function useSimulations() {
  const [simulation, setSimulation] = useState<ISimulation | null>(null);
  const [simulations, setSimulations] = useState<ISimulationPaginator>({
    data: [],
    meta: {
      total: 0,
      lastPage: 0,
      currentPage: 0,
      perPage: 0,
      prev: null,
      next: 0,
    },
  });

  const loadSimulationById = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/simulations/${id}`);

      setSimulation(data);
      return data;
    } catch (error) {
      toast.error("Erro ao carregar a simulação!");
    }
  }, []);

  const loadSimulations = useCallback(async (page: number = 1) => {
    try {
      const { data } = await api.get(`/simulations`, { params: { page } });

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
