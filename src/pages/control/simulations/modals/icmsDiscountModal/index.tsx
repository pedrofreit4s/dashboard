import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "../../components/alert";
import { FinalActions } from "../../components/finalActions";
import { Input } from "../../components/input";
import { LoaderIcon, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSimulations } from "../../hooks/useSimulations";
import { api } from "../../../../../shared/services/api";
import { useIcmsDiscountForm } from "./hooks/useIcmsDiscountForm";

interface Props {
  simulationId: string;
  close: () => void;
}

export function IcmsDiscountModal({ close, simulationId }: Props) {
  const [savingIsLoading, setSavingIsLoading] = useState(false);

  const { loadSimulationById, simulation } = useSimulations();

  const { isLoading, normal, setNormal, camex, setCamex } = useIcmsDiscountForm(simulation);

  useEffect(() => {
    loadSimulationById(simulationId);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(`/simulations/icms-discount`, {
        simulationId,
        normal,
        camex,
      });

      toast.success("Dados salvos com sucesso!");
      close();
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setSavingIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-screen h-screen bg-simulation-bg overflow-auto p-32 fixed top-0 bottom-0 left-0 right-0"
    >
      <div className="w-full max-w-[675px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full bg-white shadow-simulation-md border border-black/10 rounded-xl py-7 px-8 relative">
          <Alert
            emoji={"✍️"}
            title="Aqui, você pode selecionar o seguro internacional"
            text="Selecione o seguro internacional que deseja adicionar a simulação."
          />

          {isLoading ? (
            <div className="w-full h-full absolute bg-white/80 z-30 top-0 bottom-0 right-0 left-0 flex items-center justify-center rounded-xl">
              <LoaderIcon style={{ width: 60, height: 60, borderWidth: 4 }} />
            </div>
          ) : null}

          <form ref={formRef} className="mt-7" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="col-span-1">
                <Input
                  label="Normal (%)"
                  isRequired
                  name="normal"
                  onChange={(e) => setNormal(e.target.value)}
                  value={normal}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Camex (%)"
                  isRequired
                  name="camex"
                  onChange={(e) => setCamex(e.target.value)}
                  value={camex}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="py-6">
          <FinalActions
            isLoading={savingIsLoading}
            cancelButtonText="Voltar"
            confirmButtonText="Salvar dados"
            confirmButtonIsActive
            onConfirm={() => {
              formRef.current?.requestSubmit();
            }}
            onCancel={close}
          />
        </div>
      </div>
    </motion.div>
  );
}
