import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../../shared/services/api";
import { Alert } from "../../components/alert";
import { Checkbox } from "../../components/checkbox";
import { CustomSelect, Item } from "../../components/customSelect";
import { FinalActions } from "../../components/finalActions";
import { Input, inputClassName } from "../../components/input";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import InputMask from "react-input-mask";

import { useLoading } from "./hooks/loading";
import { useUFs } from "./hooks/ufs";
import { useTaxRegime } from "./hooks/taxRegime";
import { ICustomerForm, useCustomerForm } from "./hooks/customerForm";
import { useCNPJSearch } from "./hooks/cnpjSearch";
import { useNameSearch } from "./hooks/useNameSearch";
import { CustomerNameInput } from "./components/customerNameInput";
import { useNavigate } from "react-router-dom";

interface Props {
  simulationId: string;
  cnpj?: string;
  close: () => void;
}

export function CustomerModal({ close, cnpj, simulationId }: Props) {
  const { isLoading, setIsLoading } = useLoading();
  const { isLoading: savingIsLoading, setIsLoading: setSavingIsLoading } = useLoading();

  const { loadUFs, uf, setUf, ufs } = useUFs();
  const { loadTaxRegimes, taxRegime, setTaxRegime, taxRegimes } = useTaxRegime();

  const { searchCNPJ, searchById, customer } = useCNPJSearch();

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
          is_industry: true,
        }
      : {
          is_icms_tax_payer: true,
        }
  );

  useEffect(() => {
    if (!cnpj) return;
    searchCNPJ(cnpj).then((customer) => {
      if (!customer) return;
      setValue("cnpj", customer.cnpj);
      setValue("name", customer.name);
      setValue("fantasy_name", customer.fantasy_name);
      setValue("is_icms_tax_payer", customer.is_icms_tax_payer);
      setValue("is_industry", customer.is_industry);
      setValue("is_cde", customer.is_cde);

      setUf({ key: customer.ufId, value: customer.uf.name });
      setTaxRegime({ key: customer.taxRegimeId, value: customer.taxRegime.name });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([loadUFs(), loadTaxRegimes()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const onSubmit = async (form: ICustomerForm) => {
    if (!uf || !taxRegime) return toast.error("Informe todos os campos!");
    setSavingIsLoading(true);

    const { data } = await api.post("/customers", {
      ...form,
      tax_regime_id: taxRegime.key,
      ufId: uf.key,
    });

    await api.patch(`/simulations/${simulationId}`, {
      customer_id: data.id,
    });

    setSavingIsLoading(false);

    toast.success("Cliente selecionado com sucesso!");
    close();
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
                <Alert
                  emoji={"✍️"}
                  title="Informe o CNPJ, caso o cliente não possua é só deixar em branco!"
                  text="Caso informado o CNPJ, vamos procurar o cliente na base da dados, e se localizado, será preenchido os dados automaticamente!"
                />

                <form ref={formRef} className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <CustomerNameInput
                        id="name"
                        label="Nome do cliente"
                        isRequired
                        defaultValue={{ key: customer?.id || "", value: customer?.name || "" }}
                        select={async (item) => {
                          const customer = await searchById(item.key);
                          if (!customer) return;

                          setValue("cnpj", customer.cnpj);
                          setValue("name", customer.name);
                          setValue("fantasy_name", customer.fantasy_name);
                          setValue("is_icms_tax_payer", customer.is_icms_tax_payer);
                          setValue("is_industry", customer.is_industry);
                          setValue("is_cde", customer.is_cde);

                          setUf({ key: customer.ufId, value: customer.uf.name });
                          setTaxRegime({ key: customer.taxRegimeId, value: customer.taxRegime.name });
                        }}
                      />
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
