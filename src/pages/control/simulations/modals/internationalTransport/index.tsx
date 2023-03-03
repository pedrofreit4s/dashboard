import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "../../components/alert";
import { FinalActions } from "../../components/finalActions";
import { Input } from "../../components/input";
import { LoaderIcon, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSimulations } from "../../hooks/useSimulations";

import { CustomSelect } from "../../components/customSelect";
import { api } from "../../../../../shared/services/api";
import { useInternationalTransportForm } from "./hooks/useInternationalTransportForm";
import { Trash } from "phosphor-react";
import { Checkbox } from "../../components/checkbox";

interface Props {
  simulationId: string;
  close: () => void;
}

export function InternationalTransportModal({ close, simulationId }: Props) {
  const [savingIsLoading, setSavingIsLoading] = useState(false);

  const { loadSimulationById, simulation } = useSimulations();

  // Form
  const {
    modal,
    setModal,
    agencyFeesIds,
    setAgencyFeesIds,
    capatazia,
    setCapatazia,
    valorFreteInternacional,
    setValorFreteInternacional,
    valorFreteNacional,
    setValorFreteNacional,
    despesasRateio,
    setDespesasRateio,
    incoterm,
    setIncoterm,
    cargaComExcesso,
    setCargaComExcesso,
    cargaEspecialPerigosa,
    setCargaEspecialPerigosa,
    setContainers,
    modals,
    containers,
    incoterms,
    containerTypes,
    agencyFees,
    isLoading,
  } = useInternationalTransportForm(simulation);

  useEffect(() => {
    loadSimulationById(simulationId);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(`/simulations/international-transport`, {
        simulationId,
        modalId: modal?.key,
        agencyFeesIds: agencyFeesIds.map((item) => item.key),
        capatazia,
        valor_frete_nacional: valorFreteNacional,
        despesas_rateio: despesasRateio,
        valor_frete_internacional: valorFreteInternacional,
        incotermId: incoterm?.key,
        containers,

        carga_com_excessos: cargaComExcesso,
        carga_especial_perigosa: cargaEspecialPerigosa,
      });

      toast.success("Dados salvos com sucesso!");
      // close();
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
      <div className="w-full max-w-[675px] max-h-screen overflow-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full bg-white shadow-simulation-md border border-black/10 rounded-xl py-7 px-8 relative">
          <Alert
            emoji={"✍️"}
            title="Aqui, você pode informas os dados de transporte internacional."
            text="Vocé pode informar os dados de transporte internacional, como modalidade, incoterm, valor do frete internacional, valor do frete nacional, despesas de rateio, capatazia, entre outros."
          />

          {isLoading ? (
            <div className="w-full h-full absolute bg-white/80 z-30 top-0 bottom-0 right-0 left-0 flex items-center justify-center rounded-xl">
              <LoaderIcon style={{ width: 60, height: 60, borderWidth: 4 }} />
            </div>
          ) : (
            <form ref={formRef} className="mt-7" onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="col-span-2">
                  {modals && !isLoading ? (
                    <CustomSelect
                      id="modal"
                      label="Modalidade"
                      isRequired
                      items={modals}
                      defaultValue={modal || undefined}
                      select={async (item) => {
                        setModal(item);
                      }}
                    />
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="col-span-2">
                  {incoterms && !isLoading ? (
                    <CustomSelect
                      id="incotermId"
                      label="Incoterm"
                      isRequired
                      items={incoterms}
                      defaultValue={incoterm || undefined}
                      select={async (item) => {
                        setIncoterm(item);
                      }}
                    />
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="col-span-1">
                  <Input
                    label="Capatazia (THC)"
                    isRequired
                    name="capatazia"
                    defaultValue={capatazia.toString()}
                    onChange={(e) => {
                      setCapatazia(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    label="Despesas Rateio"
                    isRequired
                    name="despesas_rateio"
                    defaultValue={despesasRateio.toString()}
                    onChange={(e) => {
                      setDespesasRateio(Number(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="col-span-1">
                  <Input
                    label="Valor frete nacional"
                    isRequired
                    name="valor_frete_nacional"
                    defaultValue={valorFreteNacional.toString()}
                    onChange={(e) => {
                      setValorFreteNacional(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    label="Valor frente internacional"
                    isRequired
                    name="valor_frete_internacional"
                    defaultValue={valorFreteInternacional.toString()}
                    onChange={(e) => {
                      setValorFreteInternacional(Number(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="w-full mt-3">
                  <Checkbox
                    label="Carga com excessos"
                    checked={cargaComExcesso}
                    onChange={(e) => {
                      setCargaComExcesso(e.target.checked);
                    }}
                  />
                </div>
                <div className="w-full mt-3">
                  <Checkbox
                    label="Carga especial/perigosa"
                    checked={cargaEspecialPerigosa}
                    onChange={(e) => {
                      setCargaEspecialPerigosa(e.target.checked);
                    }}
                  />
                </div>
              </div>

              <div className="w-full mt-5">
                <div className="flex justify-end items-center mt-4">
                  <div className="w-full border-t border-t-gray-200"></div>
                  <button
                    type="button"
                    className="bg-gray-100 border border-gray-100 text-gray-600 text-xs uppercase font-medium p-2 px-3 rounded-lg hover:border-primary hover:text-primary transition-all whitespace-nowrap"
                    onClick={() => {
                      setAgencyFeesIds((prev) => [
                        ...prev,
                        {
                          key: agencyFees[0].key,
                          value: "Selecione uma taxa",
                        },
                      ]);
                    }}
                  >
                    Adicionar taxa de agenciamento
                  </button>
                </div>
                <div className="w-full overflow-auto max-h-[250px]">
                  {agencyFeesIds.map((id, index) => (
                    <div key={id.key + index} className="w-full p-2 mb-2">
                      <div className="border border-gray-400 rounded-md p-3">
                        {agencyFees && !isLoading ? (
                          <CustomSelect
                            id="agencyFeesIds"
                            label="Taxa de agenciamento"
                            isRequired
                            items={agencyFees}
                            defaultValue={agencyFeesIds[index] || undefined}
                            select={async (item) => {
                              setAgencyFeesIds((prev) => {
                                const newPrev = [...prev];

                                newPrev[index] = item;

                                return newPrev;
                              });
                            }}
                          />
                        ) : null}

                        <div className="w-full flex justify-end mt-2">
                          <button
                            type="button"
                            className="bg-red-500/5 border border-red-500/10 text-red-500 text-xs uppercase font-medium p-2 px-3 rounded-lg hover:border-primary hover:text-primary transition-all whitespace-nowrap flex items-center gap-1"
                            onClick={() => {
                              setAgencyFeesIds((prev) => prev.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash size={18} /> Remover taxa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full mt-5">
                <div className="flex justify-end items-center mt-4">
                  <div className="w-full border-t border-t-gray-200"></div>
                  <button
                    type="button"
                    className="bg-gray-100 border border-gray-100 text-gray-600 text-xs uppercase font-medium p-2 px-3 rounded-lg hover:border-primary hover:text-primary transition-all whitespace-nowrap"
                    onClick={() => {
                      setContainers((prev) => [
                        ...prev,
                        {
                          containerTypeId: "Selecione",
                          qntd: 0,
                        },
                      ]);
                    }}
                  >
                    Adicionar container
                  </button>
                </div>
                <div className="w-full">
                  {containers.map((container, index) => (
                    <div key={container.containerTypeId + index} className="w-full p-2 mb-2">
                      <div className="border border-gray-400 rounded-md p-3">
                        {containerTypes && !isLoading ? (
                          <CustomSelect
                            id="containerTypes"
                            label="Tipo de container"
                            isRequired
                            items={containerTypes}
                            defaultValue={
                              containerTypes.filter((cTps) => cTps.key === container.containerTypeId)[0] || undefined
                            }
                            select={async (item) => {
                              setContainers((prev) => {
                                const newPrev = [...prev];

                                newPrev[index] = {
                                  ...newPrev[index],
                                  containerTypeId: item.key,
                                };

                                return newPrev;
                              });
                            }}
                          />
                        ) : null}

                        <div className="col-span-1 mt-2">
                          <Input
                            label="Quantidade"
                            isRequired
                            name={`qntd_${index}`}
                            defaultValue={Number(container.qntd)}
                            onChange={(e) => {
                              setContainers((prev) => {
                                const newPrev = [...prev];

                                newPrev[index] = {
                                  ...newPrev[index],
                                  qntd: Number(e.target.value),
                                };

                                return newPrev;
                              });
                            }}
                          />
                        </div>

                        <div className="w-full flex justify-end mt-2">
                          <button
                            type="button"
                            className="bg-red-500/5 border border-red-500/10 text-red-500 text-xs uppercase font-medium p-2 px-3 rounded-lg hover:border-primary hover:text-primary transition-all whitespace-nowrap flex items-center gap-1"
                            onClick={() => {
                              setContainers((prev) => prev.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash size={18} /> Remover container
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}
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
