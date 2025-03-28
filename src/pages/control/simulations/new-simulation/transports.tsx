import { useEffect, useState } from "react";
import { Coin, Cube, Shield, Truck } from "phosphor-react";
import { Container } from "../components/container";
import { SimulationHead } from "../components/head";
import { StepCard } from "../components/stepCard";
import { FinalActions } from "../components/finalActions";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useIsLoading } from "../hooks/useIsLoading";
import { useSimulations } from "../hooks/useSimulations";
import { InternationalTransportModal } from "../modals/internationalTransport";
import { InternationalInsuranceModal } from "../modals/internationalImsurance";
import { SiscomexRateModal } from "../modals/siscomexRateModal";
import { IcmsDiscountModal } from "../modals/icmsDiscountModal";

export function Step03TransportsSimulationPage() {
  const [internationalInsuranceModal, setInternationalInsuranceModal] = useState(false);
  const [internationalTransportModal, setInternationalTransportModal] = useState(false);
  const [siscomexRateModal, setSiscomexRateModal] = useState(false);
  const [icmsDiscountModal, setIcmsDiscountModal] = useState(false);

  const { isLoading, setIsLoading } = useIsLoading();
  const { loadSimulationById, simulation } = useSimulations();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    loadSimulationById(id).then(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      <SimulationHead
        title="Portal de simulações"
        text="Utilize todos os recursos disponíveis aqui para ver uma simulação. Para começar, informe alguns dados.."
      />

      <AnimatePresence>
        {internationalInsuranceModal && (
          <InternationalInsuranceModal
            simulationId={id || ""}
            close={() => {
              setInternationalInsuranceModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
        {internationalTransportModal && (
          <InternationalTransportModal
            simulationId={id || ""}
            close={() => {
              setInternationalTransportModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
        {siscomexRateModal && (
          <SiscomexRateModal
            simulationId={id || ""}
            close={() => {
              setSiscomexRateModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
        {icmsDiscountModal && (
          <IcmsDiscountModal
            simulationId={id || ""}
            close={() => {
              setIcmsDiscountModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-1 gap-3">
          <StepCard
            icon={<Truck size={20} />}
            title="Transporte internacional"
            subtitle="Informe os dados"
            isActive
            onClick={() => setInternationalTransportModal(true)}
          />
          <StepCard
            icon={<Shield size={20} />}
            title="Seguro internacional"
            subtitle="Selecione o seguro"
            isActive
            onClick={() => setInternationalInsuranceModal(true)}
          />
          <StepCard
            icon={<Coin size={20} />}
            title="Taxa siscomex"
            subtitle="Selecione a taxa"
            isActive
            onClick={() => setSiscomexRateModal(true)}
          />
          <StepCard
            icon={<Cube size={20} />}
            title="Desconto de ICMS"
            subtitle="Informe os dados"
            isActive
            onClick={() => setIcmsDiscountModal(true)}
          />
        </div>
        <div className="mt-8">
          <FinalActions
            confirmButtonText="Próximo"
            cancelButtonText="Voltar"
            onCancel={() => navigate(`/controle/simulacoes/${simulation?.id}/moedas`)}
          />
        </div>
      </Container>
    </>
  );
}
