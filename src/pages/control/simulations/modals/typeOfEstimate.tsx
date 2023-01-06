import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../shared/services/api";
import { Alert } from "../components/alert";
import { Checkbox } from "../components/checkbox";
import { CustomSelect, Item } from "../components/customSelect";
import { FinalActions } from "../components/finalActions";
import { Input, inputClassName } from "../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import InputMask from "react-input-mask";
import * as yup from "yup";

interface IForm {
  estimate: string[];
}

interface Props {
  simulationId: string;
  customerId?: string;
  close: () => void;
}

export function TypeOfEstimateModal({ close, customerId, simulationId }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const [typeOfEstimates, setTypeOfEstimates] = useState([]);
  const [savingIsLoading, setSavingIsLoading] = useState(false);

  const loadTypeOfEstimates = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/type-of-estimate`);
      setTypeOfEstimates(data);
    } catch (error) {
      toast.error("Houve um problema ao carregar os tipos de estimativa!");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadTypeOfEstimates();
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    // resolver: yupResolver(
    //   yup.object({
    //     direct_import: yup.boolean(),
    //     account_and_third_party_order_sc: yup.boolean(),
    //     order_ro: yup.boolean(),
    //     order_sc: yup.boolean(),
    //     purchase_and_sale_distribution: yup.boolean(),
    //   })
    // ),
  });

  const onSubmit = useCallback(async (form: IForm) => {
    if (form.estimate.length === 0) return toast.success("Informe aos menos uma estimativa!");
    setSavingIsLoading(true);

    try {
      await api.patch(`/simulations/${simulationId}`, {
        type_of_estimateIds: form.estimate,
      });

      toast.success("Cliente selecionado com sucesso!");
      close();
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setSavingIsLoading(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-screen h-screen bg-simulation-bg overflow-auto p-32 fixed top-0 bottom-0 left-0 right-0"
    >
      <div className="w-full max-w-[675px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full bg-white shadow-simulation-md border border-black/10 rounded-xl py-7 px-8">
          <Alert
            emoji={"✍️"}
            title="Aqui, você pode selecionar mais de um tipo de estimativa!"
            text="Caso informe mais de um tipo de estimativa, o sistema irá gerar uma estimativa para cada tipo selecionado, que será possível compara-las posteriormente."
          />

          <form ref={formRef} className="mt-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {typeOfEstimates.map((typeOfEstimate: any, index) => (
                <div key={typeOfEstimate.id} className="col-span-2">
                  <Checkbox
                    label={typeOfEstimate.name}
                    onChange={() => {
                      setValue(`estimate.${index}`, typeOfEstimate.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="py-6">
          <FinalActions
            isLoading={savingIsLoading}
            cancelButtonText="Voltar"
            confirmButtonText="Selecionar cliente"
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
