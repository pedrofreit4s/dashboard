import { useEffect, useState } from "react";
import { ISimulation } from "../../../../../../shared/interfaces/simulations/ISimulation";

export function useIcmsDiscountForm(simulation?: ISimulation | null) {
  const [isLoading, setIsLoading] = useState(false);

  const [normal, setNormal] = useState<string>();
  const [camex, setCamex] = useState<string>();

  useEffect(() => {
    if (simulation?.SimulationICMSDiscount[0]) {
      const icmsDiscount = simulation.SimulationICMSDiscount[0];

      setNormal(icmsDiscount.normal);
      setCamex(icmsDiscount.camex);
    }
  }, [simulation]);

  return { isLoading, normal, setNormal, camex, setCamex } as const;
}
