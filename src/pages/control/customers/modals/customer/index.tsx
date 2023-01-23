import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { api } from "../../../../../shared/services/api";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "./hooks/loading";
import { useUFs } from "./hooks/ufs";
import { useTaxRegime } from "./hooks/taxRegime";
import { ICustomerForm, useCustomerForm } from "./hooks/customerForm";
import { useCNPJSearch } from "./hooks/cnpjSearch";
import { useNavigate } from "react-router-dom";
import { Input, inputClassName } from "../../../simulations/components/input";
import { CustomSelect } from "../../../simulations/components/customSelect";
import { Checkbox } from "../../../simulations/components/checkbox";
import { FinalActions } from "../../../simulations/components/finalActions";
import InputMask from "react-input-mask";
import { ICustomer } from "../../../../../shared/interfaces/simulations/ICustomer";

interface Props {
  close: (id?: string) => void;
  customer?: ICustomer;
}

export function CustomerModal({ close, customer }: Props) {
  const { isLoading, setIsLoading } = useLoading();
  const { isLoading: savingIsLoading, setIsLoading: setSavingIsLoading } = useLoading();

  const { loadUFs, uf, setUf, ufs } = useUFs();
  const { loadTaxRegimes, taxRegime, setTaxRegime, taxRegimes } = useTaxRegime();

  const navigate = useNavigate();

  const {
    formRef,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useCustomerForm(
    customer
      ? {
          ...customer,
        }
      : {
          is_icms_tax_payer: true,
        }
  );

  useEffect(() => {
    if (customer?.uf) setUf({ key: customer.uf.id, value: customer.uf.name });
    if (customer?.taxRegime) setTaxRegime({ key: customer.taxRegime.id, value: customer.taxRegime.name });
    setIsLoading(true);
    Promise.all([loadUFs(), loadTaxRegimes()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const onSubmit = async (form: ICustomerForm) => {
    if (!uf || !taxRegime) return toast.error("Informe todos os campos!");
    setSavingIsLoading(true);

    if (customer?.id) {
      const { data } = await api.put(`/customers/${customer?.id}`, form);

      console.log(data);
      setSavingIsLoading(false);
      toast.success("Cliente atualizado com sucesso!");

      close();
      return;
    }

    const { data } = await api.post("/customers", {
      ...form,
      tax_regime_id: taxRegime.key,
      ufId: uf.key,
    });

    setSavingIsLoading(false);

    toast.success("Cliente salvo com sucesso!");
    close(data.id);
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
        <div className="w-full bg-white shadow-simulation-md border border-black/10 rounded-xl py-7 px-8">
          <AnimatePresence>
            {/* {isLoading && ()} */}
            {!isLoading && (
              <motion.div>
                <form ref={formRef} className="mt-0" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <Input label="Nome do cliente" isRequired name="name" register={register} error={errors.name} />
                    </div>

                    <div className="col-span-1">
                      <Input
                        label="Nome fantasia"
                        isRequired
                        name="fantasy_name"
                        register={register}
                        error={errors.fantasy_name}
                      />
                    </div>
                    <div className="col-span-1">
                      {ufs && !isLoading ? (
                        <CustomSelect
                          id="uf"
                          label="UF"
                          isRequired
                          items={ufs}
                          defaultValue={uf}
                          select={(item) => setUf(item)}
                        />
                      ) : null}
                    </div>

                    <div className="col-span-1">
                      <Controller
                        name="cnpj"
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-col gap-[5px]">
                            <label htmlFor={"cnpj"} className="text-simulation-label text-[14px] font-semibold">
                              CNPJ
                              <span className="text-red-600 text-md"></span>
                            </label>
                            <InputMask
                              mask="99.999.999/9999-99"
                              className={inputClassName}
                              id="cnpj"
                              type="text"
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className="col-span-1">
                      {taxRegimes && !isLoading ? (
                        <CustomSelect
                          id="regime_tributario"
                          label="Regime tributário"
                          isRequired
                          items={taxRegimes}
                          defaultValue={taxRegime}
                          select={(item) => setTaxRegime(item)}
                        />
                      ) : null}
                    </div>

                    <div className="col-span-1">
                      <Checkbox name="is_icms_tax_payer" label="Cliente é contribuinte do ICMS?" register={register} />
                    </div>
                    <div className="col-span-1">
                      <Checkbox name="is_industry" label="É indústria?" register={register} />
                    </div>
                    <div className="col-span-1">
                      <Checkbox
                        name="is_cde"
                        label="Cliente se enquadra no CDE?"
                        isInfo
                        infoText="Faturamento superior a R$20 milhões no ano anterior"
                        register={register}
                      />
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
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
