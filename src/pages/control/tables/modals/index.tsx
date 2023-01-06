import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../../../shared/components/button";
import { Container } from "../../../../shared/components/container";
import { Trash, Pencil } from "phosphor-react";
import { IModal } from "../../../../shared/interfaces/IModal";
import { format } from "date-fns";
import { api } from "../../../../shared/services/api";
import { AnimatePresence } from "framer-motion";
import { ModalModal } from "../../../../modals/modals";
import Swal from "sweetalert2";

export function ModalsPage() {
  const [modals, setModals] = useState<IModal[]>([]);
  const [modal, setModal] = useState<IModal | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(true);
  const [modalModal, setModalModal] = useState(false);

  useEffect(() => {
    loadModals();
  }, []);

  const loadModals = useCallback(() => {
    setIsLoading(true);
    api
      .get("/modals")
      .then(({ data }) => {
        setModals(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    Swal.fire({
      icon: "question",
      title: "Confirme a ação!",
      text: "você quer deletar este modal?",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/modals/${id}`).then(() => {
          Swal.fire("Apagado!", "", "success");
          loadModals();
        });
      }
    });
  }

  const closeModal = () => {
    loadModals();
    setModal(undefined);
    setModalModal(false);
  };

  return (
    <Container>
      <AnimatePresence initial={false}>
        {modalModal && <ModalModal closeModal={closeModal} modal={modal} />}
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black/90 font-work font-bold text-xl">
            Modais cadastrados
          </h2>
          <p className="text-sm text-black/50">
            administre todos os modais do sistema
          </p>
        </div>
        <Button type="button" onClick={() => setModalModal(true)}>
          Criar modal
        </Button>
      </div>
      <div
        className={`mt-14 rounded-lg border-black/5 ${
          !isLoading && "border overflow-auto"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-10 w-10 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <table className="w-full border-collapse shadow-sm shadow-black/10 rounded-md text-left">
            <thead className="shadow-md shadow-black/5">
              <tr className="text-1sm uppercase">
                <th className="py-4 px-6 tracking-wider font-semibold">
                  Modal
                </th>

                <th className="py-4 px-6 tracking-wider font-semibold">
                  Criada em
                </th>
                <th className="py-4 px-6 tracking-wider font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {modals.map((modal) => (
                <tr
                  key={modal.id}
                  className="even:bg-black/5 hover:bg-black/5 transition-all"
                >
                  <td className="py-4 px-6">{modal.name}</td>
                  <td className="py-4 px-6">
                    {format(new Date(modal.created_at), "dd/MM/yyyy hh:mm:ss")}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex gap-4">
                      <Trash
                        size={22}
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(modal.id)}
                      />
                      {/* <Pencil
                        size={22}
                        className="text-primary cursor-pointer"
                        onClick={() => {
                          setCoin(user);
                          setTypeOfEstimateModal(true);
                        }}
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}
