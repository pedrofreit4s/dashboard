import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "../../components/alert";
import { FinalActions } from "../../components/finalActions";
import { Input } from "../../components/input";
import { LoaderIcon, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSimulations } from "../../hooks/useSimulations";
import { addDays, format } from "date-fns";
import { useCurrencyAndFees } from "./hooks/useCurrencyAndFees";
import { CustomSelect } from "../../components/customSelect";
import { useCurrencyForm } from "./hooks/useCurrencyForm";
import { api } from "../../../../../shared/services/api";

interface Props {
  simulationId: string;
  close: () => void;
}

export function CurrencyModal({ close, simulationId }: Props) {
  const [savingIsLoading, setSavingIsLoading] = useState(false);

  const { loadSimulationById, simulation } = useSimulations();
  const { currenciesToSelect, findCurrencyFeeByDate } = useCurrencyAndFees();

  // Form
  const {
    isLoading,
    setIsLoading,
    dataDi,
    setDataDi,
    moedaMercadorias,
    setMoedaMercadorias,
    taxaMoedaMercadorias,
    setTaxaMoedaMercadorias,
    setMoedaFreteInternacional,
    setTaxaMoedaFreteInternacional,
    moedaFreteInternacional,
    taxaMoedaFreteInternacional,
    setMoedaAgenciamento,
    setTaxaMoedaAgenciamento,
    setMoedaSeguro,
    moedaSeguro,
    setTaxaMoedaSeguro,
    taxaMoedaSeguro,
    taxaMoedaAgenciamento,
    moedaAgenciamento,
  } = useCurrencyForm(simulation);

  useEffect(() => {
    loadSimulationById(simulationId);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(`/simulations/currencies-and-fees/${simulationId}`, {
        data_di: `${format(new Date(addDays(new Date(dataDi), 1)), "yyyy-MM-dd")} 00:00:00`,
        moeda_mercadorias: moedaMercadorias.value,
        taxa_moeda_mercadoria: taxaMoedaMercadorias,
        moeda_frete_internacional: moedaFreteInternacional.value,
        taxa_moeda_frete_internacional: taxaMoedaFreteInternacional,
        moeda_agenciamento: moedaAgenciamento.value,
        taxa_moeda_agenciamento: taxaMoedaAgenciamento,
        moeda_seguro: moedaSeguro.value,
        taxa_moeda_seguro: taxaMoedaSeguro,
      });

      toast.success("Cliente selecionado com sucesso!");
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
          {isLoading && (
            <div className="w-full h-full absolute bg-white/80 z-30 top-0 bottom-0 right-0 left-0 flex items-center justify-center rounded-xl">
              <LoaderIcon style={{ width: 60, height: 60, borderWidth: 4 }} />
            </div>
          )}

          <Alert
            emoji={"✍️"}
            title="Aqui, você pode selecionar as moedas da simulação"
            text="A data (DI) é a data da qual vamos buscar os valores das moedas."
          />

          <form ref={formRef} className="mt-7" onSubmit={onSubmit}>
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <Input
                  label="Data do DI"
                  type="date"
                  isRequired
                  name="data_di"
                  onChange={(e) => setDataDi(e.target.value)}
                  value={dataDi}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="col-span-1">
                {currenciesToSelect ? (
                  <CustomSelect
                    id="moeda_mercadorias"
                    label="Moeda das mercadorias"
                    isRequired
                    items={currenciesToSelect}
                    defaultValue={moedaMercadorias}
                    select={async (item) => {
                      setIsLoading(true);
                      const data = await findCurrencyFeeByDate(item.value, new Date(dataDi));

                      setIsLoading(false);
                      setMoedaMercadorias(item);
                      setTaxaMoedaMercadorias(data.bid);
                    }}
                  />
                ) : null}
              </div>
              <div className="col-span-1">
                <Input
                  label="Taxa da moeda da mercadoria"
                  isRequired
                  name="taxa_moeda_mercadoria"
                  value={Number(taxaMoedaMercadorias).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="col-span-1">
                {currenciesToSelect ? (
                  <CustomSelect
                    id="moeda_frete_internacional"
                    label="Moeda do Frete Internacional"
                    isRequired
                    items={currenciesToSelect}
                    defaultValue={moedaFreteInternacional}
                    select={async (item) => {
                      setIsLoading(true);
                      const data = await findCurrencyFeeByDate(item.value, new Date(dataDi));

                      setIsLoading(false);
                      setMoedaFreteInternacional(item);
                      setTaxaMoedaFreteInternacional(data.bid);
                    }}
                  />
                ) : null}
              </div>
              <div className="col-span-1">
                <Input
                  label="Taxa da moeda do Frete Internacional"
                  isRequired
                  name="taxa_moeda_frete_internacional"
                  value={Number(taxaMoedaFreteInternacional).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="col-span-1">
                {currenciesToSelect ? (
                  <CustomSelect
                    id="moeda_seguro"
                    label="Moeda do seguro"
                    isRequired
                    items={currenciesToSelect}
                    defaultValue={moedaSeguro}
                    select={async (item) => {
                      setIsLoading(true);
                      const data = await findCurrencyFeeByDate(item.value, new Date(dataDi));

                      setIsLoading(false);
                      setMoedaSeguro(item);
                      setTaxaMoedaSeguro(data.bid);
                    }}
                  />
                ) : null}
              </div>
              <div className="col-span-1">
                <Input
                  label="Taxa da moeda do seguro"
                  isRequired
                  name="taxa_moeda_seguro"
                  value={Number(taxaMoedaSeguro).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="col-span-1">
                {currenciesToSelect ? (
                  <CustomSelect
                    id="moeda_agenciamento"
                    label="Moeda do agenciamento"
                    isRequired
                    items={currenciesToSelect}
                    defaultValue={moedaAgenciamento}
                    select={async (item) => {
                      setIsLoading(true);
                      const data = await findCurrencyFeeByDate(item.value, new Date(dataDi));

                      setIsLoading(false);
                      setMoedaAgenciamento(item);
                      setTaxaMoedaAgenciamento(data.bid);
                    }}
                  />
                ) : null}
              </div>
              <div className="col-span-1">
                <Input
                  label="Taxa da moeda do agenciamento"
                  isRequired
                  name="taxa_moeda_agenciamento"
                  value={Number(taxaMoedaAgenciamento).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>

        <div className="py-6">
          <FinalActions
            isLoading={savingIsLoading}
            cancelButtonText="Voltar"
            confirmButtonText="Selecionar moeda(s)"
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
