import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AirplaneTilt, User } from "phosphor-react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../simulations/components/container";
import { FinalActions } from "../simulations/components/finalActions";
import { SimulationHead } from "../simulations/components/head";
import { StepCard } from "../simulations/components/stepCard";
import { useIsLoading } from "../simulations/hooks/useIsLoading";
import { CustomerModal } from "./modals/customer";
import { api } from "../../../shared/services/api";
import { ICustomer } from "../../../shared/interfaces/simulations/ICustomer";
import { toast } from "react-hot-toast";
import { DispatcherFeesModal } from "./modals/dispatcherFees";

export function UpdateCustomer() {
  const [customer, setCustomer] = useState<ICustomer>();
  const [customerModal, setCustomerModal] = useState(false);
  const [dispatcherFeesModal, setDispatcherFeesModal] = useState(false);
  const { isLoading, setIsLoading } = useIsLoading();

  const { id } = useParams();
  const navigate = useNavigate();

  const findCustomer = useCallback(() => {
    setIsLoading(true);

    api
      .get(`/customers/${id}/id`)
      .then(({ data }) => {
        setCustomer(data);
      })
      .catch(() => {
        toast.error("Erro ao carregar cliente!");
        navigate("/controle/clientes");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return navigate("/controle/clientes");

    findCustomer();
  }, [id]);

  return (
    <>
      <SimulationHead title="Portal de clientes" text="Adicione um novo cliente ao nosso portal" />

      <AnimatePresence>
        {customerModal && (
          <CustomerModal
            customer={customer}
            close={() => {
              setCustomerModal(false);
              findCustomer();
            }}
          />
        )}
        {dispatcherFeesModal && (
          <DispatcherFeesModal
            customer={customer}
            close={() => {
              setDispatcherFeesModal(false);
              findCustomer();
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
          <StepCard
            icon={<AirplaneTilt size={20} />}
            title="Taxas de despachantes"
            isActive
            subtitle="Informe as taxas"
            onClick={() => setDispatcherFeesModal(true)}
          />
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
