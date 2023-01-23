import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ICustomer } from "../../../../../shared/interfaces/simulations/ICustomer";
import { useForm } from "react-hook-form";
import { Input } from "../../../simulations/components/input";

import { api } from "../../../../../shared/services/api";
import { FinalActions } from "../../../simulations/components/finalActions";
import { useIsLoading } from "../../../simulations/hooks/useIsLoading";

import { ICustomerDispatcherFee } from "../../../../../shared/interfaces/simulations/ICustomerDispatcherFee";
import { Item } from "../customer/components/customerNameInput";
import { Alert } from "../../../simulations/components/alert";
import { toast } from "react-hot-toast";

interface Props {
  close: (id?: string) => void;
  customer?: ICustomer;
}
interface IDispatcher {
  dispatcherServicesAndFeesId: string;
  value: string;
  id: string;
}

interface IForm {
  dispatcher: IDispatcher[];
}

export function DispatcherFeesModal({ close, customer }: Props) {
  const { isLoading: savingIsLoading, setIsLoading: setSavingIsLoading } = useIsLoading();
  const { isLoading, setIsLoading } = useIsLoading();

  const [customerServicesAndFees, setCustomerServicesAndFees] = useState<ICustomerDispatcherFee[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/customers/${customer?.id}/id`)
      .then(({ data }) => {
        setCustomerServicesAndFees(data.customerDispatcherFees);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { handleSubmit, register } = useForm<IForm>();

  const onSubmit = useCallback(async (form: IForm) => {
    setSavingIsLoading(true);
    const { data } = await api.put(`/customers/${customer?.id}`, form);

    console.log(data);
    setSavingIsLoading(false);
    toast.success("Cliente atualizado com sucesso!");

    close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-screen h-screen bg-simulation-bg  overflow-auto p-32 fixed top-0 bottom-0 left-0 right-0"
    >
      <div className="w-full max-w-[675px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full bg-white max-h-[500px] overflow-auto shadow-simulation-md border border-black/10 rounded-xl py-7 px-8">
          <AnimatePresence>
            <Alert
              emoji={"✍️"}
              title="Selecione a taxa, e informe o valor!"
              text="Aqui você pode adicionar as taxas de despachante que o cliente irá pagar, (cada cliente terá sua taxa)."
            />
            <form ref={formRef} className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              {customerServicesAndFees.map((dispatcher, index) => (
                <div
                  key={dispatcher.id}
                  className="grid grid-cols-2 gap-4 items-center pb-5 mb-4 border-b border-b-black/10"
                >
                  <div className="hidden">
                    <Input
                      type="text"
                      name={`dispatcher.${index}.id`}
                      defaultValue={dispatcher.id}
                      register={register}
                      className="hidden"
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="text"
                      label="Valor"
                      name={`dispatcher.${index}.dispatcherServicesAndFeesName`}
                      defaultValue={dispatcher.dispatcherServicesAndFees?.name}
                      register={register}
                      disabled
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="number"
                      label="Valor"
                      name={`dispatcher.${index}.value`}
                      defaultValue={dispatcher.value}
                      register={register}
                    />
                  </div>
                </div>
              ))}
            </form>
          </AnimatePresence>
        </div>

        <div className="py-6">
          <FinalActions
            isLoading={savingIsLoading}
            cancelButtonText="Voltar"
            confirmButtonText="Salvar cliente"
            confirmButtonIsActive
            onConfirm={() => {
              formRef.current?.requestSubmit();
            }}
            onCancel={() => close(undefined)}
          />
        </div>
      </div>
    </motion.div>
  );
}
