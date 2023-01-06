import React, { useCallback, useEffect, useState } from "react";
import { Buildings, HourglassSimpleHigh } from "phosphor-react";
import { Container } from "./components/container";
import { SimulationHead } from "./components/head";
import { StepCard } from "./components/stepCard";
import { FinalActions } from "./components/finalActions";
import { CustomerModal } from "./modals/customer";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ISimulation } from "../../../shared/interfaces/simulations/ISimulation";
import { toast } from "react-hot-toast";
import { api } from "../../../shared/services/api";
import { maskCNPJ } from "../../../utils/masks/cnpj";
import { TypeOfEstimateModal } from "./modals/typeOfEstimate";

export function Step01SimulationPage() {
  const [customerModal, setCustomerModal] = useState(false);
  const [typeOfEstimateModal, setTypeOfEstimateModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [simulation, setSimulation] = useState<ISimulation>();

  const { id } = useParams();
  const navigation = useNavigate();

  const loadSimulation = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/simulations/${id}`);
      setSimulation(data);
    } catch (error) {
      toast.error("Houve um problema ao carregar a simulação!");
      navigation("/controle/simulacoes");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadSimulation();
  }, []);

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
              loadSimulation();
            }}
          />
        )}

        {typeOfEstimateModal && (
          <TypeOfEstimateModal
            simulationId={id || ""}
            close={() => {
              setTypeOfEstimateModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-1 gap-3">
          <StepCard
            icon={<Buildings size={20} />}
            title={simulation?.customer ? simulation.customer.name : "Clientes"}
            subtitle={simulation?.customer ? maskCNPJ(simulation.customer.cnpj) : "Selecione o cliente"}
            isActive
            onClick={() => setCustomerModal(true)}
          />

          <StepCard
            icon={<HourglassSimpleHigh size={20} />}
            title="Tipo de estimativa"
            subtitle="Selecione o tipo"
            isActive={!!simulation?.customer?.id}
            onClick={() => setTypeOfEstimateModal(true)}
          />
        </div>
        <div className="mt-8">
          <FinalActions confirmButtonText="Próximo" cancelButtonText="Voltar" />
        </div>
      </Container>
    </>
  );
}
