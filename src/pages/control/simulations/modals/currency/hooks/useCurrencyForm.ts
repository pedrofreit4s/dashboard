import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useCurrencyAndFees } from "./useCurrencyAndFees";
import { ISimulation } from "../../../../../../shared/interfaces/simulations/ISimulation";
import { Item } from "../../../components/customSelect";

export function useCurrencyForm(simulation?: ISimulation | null) {
  const { findCurrencyFeeByDate } = useCurrencyAndFees(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form
  const [dataDi, setDataDi] = useState(format(new Date(), "yyyy-MM-dd"));

  const [moedaMercadorias, setMoedaMercadorias] = useState<Item>({ key: "", value: "" });
  const [taxaMoedaMercadorias, setTaxaMoedaMercadorias] = useState<string>("0");

  const [moedaFreteInternacional, setMoedaFreteInternacional] = useState<Item>({ key: "", value: "" });
  const [taxaMoedaFreteInternacional, setTaxaMoedaFreteInternacional] = useState<string>("0");

  const [moedaSeguro, setMoedaSeguro] = useState<Item>({ key: "", value: "" });
  const [taxaMoedaSeguro, setTaxaMoedaSeguro] = useState<string>("0");

  const [moedaAgenciamento, setMoedaAgenciamento] = useState<Item>({ key: "", value: "" });
  const [taxaMoedaAgenciamento, setTaxaMoedaAgenciamento] = useState<string>("0");

  useEffect(() => {
    if (simulation) {
      if (simulation.SimulationCurrenciesAndFees[0]) {
        const simulationCurrenciesAndFees = simulation.SimulationCurrenciesAndFees[0];
        setDataDi(format(new Date(simulationCurrenciesAndFees.data_registro_di), "yyyy-MM-dd"));

        setMoedaMercadorias({
          key: simulationCurrenciesAndFees.moeda_mercadorias,
          value: simulationCurrenciesAndFees.moeda_mercadorias,
        });
        setMoedaFreteInternacional({
          key: simulationCurrenciesAndFees.moeda_frete_internacional,
          value: simulationCurrenciesAndFees.moeda_frete_internacional,
        });
        setMoedaSeguro({
          key: simulationCurrenciesAndFees.moeda_seguro,
          value: simulationCurrenciesAndFees.moeda_seguro,
        });
        setMoedaAgenciamento({
          key: simulationCurrenciesAndFees.moeda_agenciamento,
          value: simulationCurrenciesAndFees.moeda_agenciamento,
        });

        return;
      }

      setDataDi(format(new Date(simulation.created_at), "yyyy-MM-dd"));
    }
  }, [simulation]);

  // MOEDA: Mercadorias
  async function loadTaxaMoedaMercadorias() {
    if (moedaMercadorias.value !== "") {
      setIsLoading(true);
      setTaxaMoedaMercadorias((await findCurrencyFeeByDate(moedaMercadorias.value, new Date(dataDi))).bid);
    }
  }

  // MOEDA: Frete Internacional
  async function loadTaxaMoedaFreteInternacional() {
    if (moedaFreteInternacional.value !== "") {
      setIsLoading(true);
      setTaxaMoedaFreteInternacional(
        (await findCurrencyFeeByDate(moedaFreteInternacional.value, new Date(dataDi))).bid
      );
    }
  }

  // MOEDA: Seguro
  async function loadTaxaMoedaSeguro() {
    if (moedaSeguro.value !== "") {
      setIsLoading(true);
      setTaxaMoedaSeguro((await findCurrencyFeeByDate(moedaSeguro.value, new Date(dataDi))).bid);
    }
  }

  // MOEDA: Agenciamento
  async function loadTaxaMoedaAgenciamento() {
    if (moedaAgenciamento.value !== "") {
      setIsLoading(true);
      setTaxaMoedaAgenciamento((await findCurrencyFeeByDate(moedaAgenciamento.value, new Date(dataDi))).bid);
    }
  }

  useEffect(() => {
    Promise.all([
      loadTaxaMoedaMercadorias(),
      loadTaxaMoedaFreteInternacional(),
      loadTaxaMoedaSeguro(),
      loadTaxaMoedaAgenciamento(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dataDi]);

  return {
    isLoading,
    setIsLoading,
    dataDi,
    setDataDi,
    moedaMercadorias,
    setMoedaMercadorias,
    taxaMoedaMercadorias,
    setTaxaMoedaMercadorias,
    moedaFreteInternacional,
    setMoedaFreteInternacional,
    taxaMoedaFreteInternacional,
    setTaxaMoedaFreteInternacional,
    moedaSeguro,
    setMoedaSeguro,
    taxaMoedaSeguro,
    setTaxaMoedaSeguro,
    moedaAgenciamento,
    setMoedaAgenciamento,
    taxaMoedaAgenciamento,
    setTaxaMoedaAgenciamento,
  } as const;
}
