import { useEffect, useState } from "react";
import { IAgencyFee } from "../../../../../../shared/interfaces/IAgencyFee";
import { IContainerType } from "../../../../../../shared/interfaces/IContainerType";
import { IIncoterm } from "../../../../../../shared/interfaces/IIncoterm";
import { IModal } from "../../../../../../shared/interfaces/IModal";
import { ISimulation } from "../../../../../../shared/interfaces/simulations/ISimulation";
import { api } from "../../../../../../shared/services/api";
import { Item } from "../../../components/customSelect";

export function useInternationalTransportForm(simulation?: ISimulation | null) {
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState<Item | null>(null);
  const [agencyFeesIds, setAgencyFeesIds] = useState<Item[]>([]);

  const [capatazia, setCapatazia] = useState<number>(0);
  const [valorFreteInternacional, setValorFreteInternacional] = useState<number>(0);
  const [valorFreteNacional, setValorFreteNacional] = useState<number>(0);
  const [despesasRateio, setDespesasRateio] = useState<number>(0);

  const [incoterm, setIncoterm] = useState<Item>();

  const [cargaComExcesso, setCargaComExcesso] = useState<boolean>(false);
  const [cargaEspecialPerigosa, setCargaEspecialPerigosa] = useState<boolean>(false);

  const [containers, setContainers] = useState<
    {
      containerTypeId: string;
      qntd: number;
    }[]
  >([]);

  const [modals, setModals] = useState<Item[]>([]);
  const [containerTypes, setContainerTypes] = useState<Item[]>([]);
  const [incoterms, setIncoterms] = useState<Item[]>([]);
  const [agencyFees, setAgencyFees] = useState<Item[]>([]);

  // Modals
  async function loadModals() {
    setIsLoading(true);

    const { data } = await api.get("/modals");
    setModals(data.map((modal: IModal) => ({ key: modal.id, value: modal.name })));
  }

  // Container Types
  async function loadContainerTypes() {
    setIsLoading(true);

    const { data } = await api.get("/container-types");
    setContainerTypes(
      data.map((containerType: IContainerType) => ({ key: containerType.id, value: containerType.name }))
    );
  }

  // Incoterms
  async function loadIncoterms() {
    setIsLoading(true);

    const { data } = await api.get("/incoterms");
    setIncoterms(data.map((incoterm: IIncoterm) => ({ key: incoterm.id, value: incoterm.name })));
  }

  // Agency Fees
  async function loadAgencyFees() {
    setIsLoading(true);

    const { data } = await api.get("/agency-fees");
    setAgencyFees(data.map((agencyFee: IAgencyFee) => ({ key: agencyFee.id, value: agencyFee.name })));
  }

  useEffect(() => {
    Promise.all([loadModals(), loadContainerTypes(), loadIncoterms(), loadAgencyFees()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (simulation?.internationalTransports[0]) {
      setIsLoading(true);

      setModal({
        key: simulation.internationalTransports[0].modalidade.id,
        value: simulation.internationalTransports[0].modalidade.name,
      });
      setCapatazia(Number(simulation.internationalTransports[0].capatazia));
      setValorFreteInternacional(Number(simulation.internationalTransports[0].valor_frete_internacional));
      setValorFreteNacional(Number(simulation.internationalTransports[0].valor_frete_nacional));
      setDespesasRateio(Number(simulation.internationalTransports[0].despesas_rateio));
      setIncoterm({
        key: simulation.internationalTransports[0].incoterm.id,
        value: simulation.internationalTransports[0].incoterm.name,
      });
      setCargaComExcesso(simulation.internationalTransports[0].carga_com_excessos);
      setCargaEspecialPerigosa(simulation.internationalTransports[0].carga_especial_perigosa);
      setContainers(
        simulation.internationalTransports[0].containers.map((container) => ({
          containerTypeId: container.containerTypeId,
          qntd: container.qntd,
        }))
      );
      setAgencyFeesIds(
        simulation.internationalTransports[0].agencyFees.map((agencyFee) => ({
          key: agencyFee.id,
          value: agencyFee.agencyFee.name,
        }))
      );

      setIsLoading(false);
    }
  }, [simulation]);

  return {
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
    containers,
    setContainers,
    modals,
    containerTypes,
    incoterms,
    agencyFees,
    isLoading,
  };
}
