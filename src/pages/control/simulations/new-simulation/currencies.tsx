import { useEffect, useState } from "react";
import { Coin } from "phosphor-react";
import { Container } from "../components/container";
import { SimulationHead } from "../components/head";
import { StepCard } from "../components/stepCard";
import { FinalActions } from "../components/finalActions";
import { CustomerModal } from "../modals/customer";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useIsLoading } from "../hooks/useIsLoading";
import { useSimulations } from "../hooks/useSimulations";
import { CurrencyModal } from "../modals/currency";

export function Step02CurrenciesSimulationPage() {
  const [customerModal, setCustomerModal] = useState(false);
  const [currencyModal, setCurrenciesModal] = useState(false);

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

        {currencyModal && (
          <CurrencyModal
            simulationId={id || ""}
            close={() => {
              setCurrenciesModal(false);
              loadSimulationById(id || "");
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-1 gap-3">
          <StepCard
            icon={<Coin size={20} />}
            title="Moedas e taxas"
            subtitle="Selecione as moedas"
            isActive
            onClick={() => setCurrenciesModal(true)}
          />
          {/* <StepCard
            icon={<Buildings size={20} />}
            title={simulation?.customer ? simulation.customer.name : "Clientes"}
            subtitle={simulation?.customer ? maskCNPJ(simulation.customer.cnpj) : "Selecione o cliente"}
            isActive={!!simulation?.typeOfEstimates?.length}
            onClick={() => setCustomerModal(true)}
          /> */}
        </div>
        <div className="mt-8">
          <FinalActions
            confirmButtonText="Próximo"
            cancelButtonText="Voltar"
            onCancel={() => navigate(`/controle/simulacoes/${simulation?.id}`)}
          />
        </div>
      </Container>
    </>
  );
}
