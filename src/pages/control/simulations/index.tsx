import React, { useEffect, useState } from "react";
import { Buildings, HourglassSimpleHigh } from "phosphor-react";
import { Container } from "./components/container";
import { SimulationHead } from "./components/head";
import { StepCard } from "./components/stepCard";
import { FinalActions } from "./components/finalActions";
import { CustomerModal } from "./modals/customer";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { maskCNPJ } from "../../../utils/masks/cnpj";
import { TypeOfEstimateModal } from "./modals/typeOfEstimate";
import { useIsLoading } from "./hooks/useIsLoading";
import { useSimulations } from "./hooks/useSimulations";

export function Step01SimulationPage() {
  const [customerModal, setCustomerModal] = useState(false);
  const [typeOfEstimateModal, setTypeOfEstimateModal] = useState(false);

  const { isLoading, setIsLoading } = useIsLoading();
  const { loadSimulationById, simulation } = useSimulations();

  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    loadSimulationById(id).then(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      <SimulationHead
        title="Portal de simulaçoões"
        text="Utilize todos os recursos disponíveis aqui para ver uma simulação. Para começar, informe alguns dados.."
      />

      <AnimatePresence>
        {customerModal && (
          <CustomerModal
            simulationId={id || ""}
            cnpj={simulation?.customer?.cnpj}
            close={() => {
              setCustomerModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}

        {typeOfEstimateModal && (
          <TypeOfEstimateModal
            simulationId={id || ""}
            close={() => {
              setTypeOfEstimateModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-1 gap-3">
          <StepCard
            icon={<HourglassSimpleHigh size={20} />}
            title="Tipo de estimativa"
            subtitle="Selecione o tipo"
            isActive
            onClick={() => setTypeOfEstimateModal(true)}
          />
          <StepCard
            icon={<Buildings size={20} />}
            title={simulation?.customer ? simulation.customer.name : "Clientes"}
            subtitle={simulation?.customer ? maskCNPJ(simulation.customer.cnpj) : "Selecione o cliente"}
            isActive={!!simulation?.typeOfEstimates?.length}
            onClick={() => setCustomerModal(true)}
          />
        </div>
        <div className="mt-8">
          <FinalActions confirmButtonText="Próximo" cancelButtonText="Voltar" />
        </div>
      </Container>
    </>
  );
}
