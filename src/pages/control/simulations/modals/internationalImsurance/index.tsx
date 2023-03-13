import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "../../components/alert";
import { FinalActions } from "../../components/finalActions";
import { Input } from "../../components/input";
import { LoaderIcon, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSimulations } from "../../hooks/useSimulations";
import { addDays, format } from "date-fns";

import { CustomSelect, Item } from "../../components/customSelect";

import { api } from "../../../../../shared/services/api";
import { useIntarnationalInsuranceForm } from "./hooks/useInternationalInsuranceForm";
import { useCurrencyAndFees } from "../currency/hooks/useCurrencyAndFees";

interface Props {
  simulationId: string;
  close: () => void;
}

export function InternationalInsuranceModal({ close, simulationId }: Props) {
  const [savingIsLoading, setSavingIsLoading] = useState(false);

  // States
  const [mercadoria, setMercadoria] = useState<Item>({
    key: "nao",
    value: "Não",
  });
  const [frete, setFrete] = useState<Item>({
    key: "nao",
    value: "Não",
  });
  const [tributos, setTributos] = useState<Item>({
    key: "nao",
    value: "Não",
  });
  const [despesas, setDespesas] = useState<Item>({
    key: "nao",
    value: "Não",
  });
  const [lucrosEsperado, setLucrosEsperados] = useState<Item>({
    key: "nao",
    value: "Não",
  });

  const { currenciesIsLoading, currenciesToSelect } = useCurrencyAndFees();

  const { loadSimulationById, simulation } = useSimulations();

  const { isLoading, seguro, setSeguro, seguros, valor, setValor, valorBrl, setValorBrl } =
    useIntarnationalInsuranceForm(simulation);

  useEffect(() => {
    loadSimulationById(simulationId);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(`/simulations/international-insurance`, {
        simulationId,
        seguro: seguro?.key,
        valor,
        valor_brl: valorBrl,
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
        <div className="w-full bg-white shadow-simulation-md border border-black/10 rounded-xl py-7 px-8 relative overflow-auto max-h-[600px]">
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
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="col-span-2">
                {seguros && !isLoading ? (
                  <CustomSelect
                    id="seguros"
                    label="Seguro"
                    isRequired
                    items={seguros}
                    defaultValue={seguro}
                    select={async (item) => {
                      setSeguro(item);
                    }}
                  />
                ) : null}
              </div>
            </div>

            <div className="w-full mt-3 border border-black/10 py-3 px-4 rounded-sm">
              <label className="text-simulation-label text-[14px] font-semibold">Opções de cobertura</label>
              <div className="grid grid-cols-1 mt-2 gap-3">
                <div className="col-span-1 border border-black/10 p-2">
                  <CustomSelect
                    id="Mercadoria"
                    label="Mercadoria"
                    items={[
                      {
                        key: "sim",
                        value: "Sim",
                      },
                      {
                        key: "nao",
                        value: "Não",
                      },
                    ]}
                    defaultValue={mercadoria}
                    select={async (item) => {
                      setMercadoria(item);
                    }}
                  />
                  {mercadoria.key === "sim" && (
                    <div className="col-span-1 mt-2">
                      <Input label="%" isRequired name="valor" />
                    </div>
                  )}
                </div>
                <div className="col-span-1 border border-black/10 p-2">
                  <CustomSelect
                    id="Frete"
                    label="Frete"
                    items={[
                      {
                        key: "sim",
                        value: "Sim",
                      },
                      {
                        key: "nao",
                        value: "Não",
                      },
                    ]}
                    defaultValue={frete}
                    select={async (item) => {
                      setFrete(item);
                    }}
                  />
                  {frete.key === "sim" && (
                    <div className="col-span-1 mt-2">
                      <Input label="%" isRequired name="valor" />
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <CustomSelect
                    id="Tributos"
                    label="Tributos"
                    items={[
                      {
                        key: "sim",
                        value: "Sim",
                      },
                      {
                        key: "nao",
                        value: "Não",
                      },
                    ]}
                    defaultValue={tributos}
                    select={async (item) => {
                      setTributos(item);
                    }}
                  />
                  {tributos.key === "sim" && (
                    <div className="col-span-1 mt-2">
                      <Input label="%" isRequired name="valor" />
                    </div>
                  )}
                </div>

                <div className="col-span-1 border border-black/10 p-2">
                  <CustomSelect
                    id="Despesas"
                    label="Despesas"
                    items={[
                      {
                        key: "sim",
                        value: "Sim",
                      },
                      {
                        key: "nao",
                        value: "Não",
                      },
                    ]}
                    defaultValue={despesas}
                    select={async (item) => {
                      setDespesas(item);
                    }}
                  />
                  {despesas.key === "sim" && (
                    <div className="col-span-1 mt-2">
                      <Input label="%" isRequired name="valor" />
                    </div>
                  )}
                </div>

                <div className="col-span-1 border border-black/10 p-2">
                  <CustomSelect
                    id="Lucros Esperado"
                    label="Lucros Esperado"
                    items={[
                      {
                        key: "sim",
                        value: "Sim",
                      },
                      {
                        key: "nao",
                        value: "Não",
                      },
                    ]}
                    defaultValue={lucrosEsperado}
                    select={async (item) => {
                      setLucrosEsperados(item);
                    }}
                  />
                  {lucrosEsperado.key === "sim" && (
                    <div className="col-span-1 mt-2">
                      <Input label="%" isRequired name="valor" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full mt-3 border border-black/10 py-3 px-4 rounded-sm">
              <label className="text-simulation-label text-[14px] font-semibold">Prêmio</label>

              <div className="grid grid-cols-1 mt-2 gap-3">
                <div className="col-span-1">
                  {currenciesToSelect && !currenciesIsLoading ? (
                    <CustomSelect
                      id="moeda_mercadorias"
                      label="Moeda do seguro/prêmio"
                      isRequired
                      items={currenciesToSelect}
                      select={async (item) => {}}
                    />
                  ) : null}
                </div>
                <div className="col-span-1">
                  <Input label="Percentual do prêmio" type="number" isRequired name="valor" />
                </div>
                <div className="col-span-1">
                  <Input label="Valor mínimo do prêmio" type="number" isRequired name="valor" />
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="col-span-1">
                <Input
                  label="Valor da moeda"
                  isRequired
                  name="valor"
                  onChange={(e) => setValor(e.target.value)}
                  value={valor}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Valor do BRL"
                  isRequired
                  name="valor_brl"
                  onChange={(e) => setValorBrl(e.target.value)}
                  value={valorBrl}
                />
              </div>
            </div> */}
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
