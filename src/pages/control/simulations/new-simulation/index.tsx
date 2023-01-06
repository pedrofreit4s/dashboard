import React, { useCallback, useState } from "react";
import { Container } from "../components/container";
import { SimulationHead } from "../components/head";
import { FinalActions } from "../components/finalActions";
import { api } from "../../../../shared/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function NewSimulationPage() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateSimulation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/simulations", {
        name: "Simulação",
      });

      toast.success("Simulação criada com sucesso!");
      navigate(`/controle/simulacoes/${data.id}`);
    } catch (error) {
      toast.error("Houve um problema ao criar uma simulação!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <SimulationHead
        title="Portal de simulaçoões"
        text="Utilize todos os recursos disponíveis aqui para ver uma simulação. Para começar, crie uma simulação"
      />

      <Container>
        <div className="mt-0 flex justify-center w-full">
          <FinalActions
            hiddeCancelButton
            confirmButtonIsActive
            justifyCenter
            confirmButtonText="Criar uma simulação"
            cancelButtonText="Voltar"
            onConfirm={handleCreateSimulation}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </>
  );
}
