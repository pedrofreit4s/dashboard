import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "phosphor-react";
import { Button } from "../../shared/components/button";
import { api } from "../../shared/services/api";
import { IUf } from "../../shared/interfaces/IUf";
import Swal from "sweetalert2";

interface IUFModalProps {
  closeModal(): void;
  uf?: IUf;
}
interface IForm {
  name: string;
}

export function UfModal({ closeModal, uf }: IUFModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register } = useForm<IForm>({
    defaultValues: {
      ...uf,
    },
  });

  const onSubmit = useCallback(({ name }: IForm) => {
    setIsLoading(true);

    if (!uf)
      return api
        .post("/ufs", { name })
        .then(() => {
          setIsLoading(false);
          Swal.fire("Sucesso!", "Uf criado com sucesso!", "success");
          closeModal();
        })
        .catch((err) => {
          setIsLoading(false);
          Swal.fire("Erro!", err.response.data.message, "error");
        });

    api
      .put(`/ufs/${uf?.id}`, {
        ...uf,
        name,
      })
      .then(() => {
        setIsLoading(false);
        Swal.fire("Sucesso!", "Uf editado com sucesso!", "success");
        closeModal();
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire("Erro!", err.response.data.message, "error");
      });
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 right-0 left-0 bottom-0 bg-black/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white w-full max-w-[670px] mx-6 lg:mx-0 rounded-xl"
      >
        <div className="p-8 pb-2 flex items-center justify-between">
          <h3 className="font-work text-lg font-bold">
            {uf?.id ? "Editar uf" : "Criar uf"}
          </h3>
          <button
            className="bg-primary/5 p-3 rounded-full text-primary"
            onClick={closeModal}
          >
            <X size={22} weight="bold" />
          </button>
        </div>
        <form className="p-8 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("name", { required: true })}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  Carregando..
                </div>
              ) : uf?.id ? (
                "Editar uf"
              ) : (
                "Criar uf"
              )}
            </Button>
            <Button
              type="button"
              onClick={closeModal}
              containsIcon
              variant="primary-opacity"
            >
              <X size={18} weight="bold" /> Fechar modal
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
