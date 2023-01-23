import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AirplaneTilt, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { Container } from "../simulations/components/container";
import { FinalActions } from "../simulations/components/finalActions";
import { SimulationHead } from "../simulations/components/head";
import { StepCard } from "../simulations/components/stepCard";
import { useIsLoading } from "../simulations/hooks/useIsLoading";
import { CustomerModal } from "./modals/customer";

export function NewCustomer() {
  const [customerModal, setCustomerModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <SimulationHead title="Portal de clientes" text="Adicione um novo cliente ao nosso portal" />

      <AnimatePresence>
        {customerModal && (
          <CustomerModal
            close={(id?: string) => {
              setCustomerModal(false);
              console.log(id);

              if (id) navigate(`/controle/clientes/${id}`);
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-1 gap-3">
          <StepCard
            icon={<User size={20} />}
            title="Dados do cliente"
            subtitle="Informe os dados"
            isActive
            onClick={() => setCustomerModal(true)}
          />
          <StepCard icon={<AirplaneTilt size={20} />} title="Taxas de despachantes" subtitle="Informe as taxas" />
        </div>
        <div className="mt-8">
          <FinalActions
            confirmButtonText="Criar cliente"
            cancelButtonText="Voltar"
            onCancel={() => navigate("/controle/clientes")}
          />
        </div>
      </Container>
    </>
  );
}
