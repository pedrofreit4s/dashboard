import React, { useEffect, useState } from "react";
import { SimulationHead } from "./components/head";

import { useNavigate, useParams } from "react-router-dom";
import { useIsLoading } from "./hooks/useIsLoading";
import { useSimulations } from "./hooks/useSimulations";
import { Container } from "../../../shared/components/container";
import { FilterCard } from "./components/filtersCard";
import { getAvatarSource } from "../../../utils/avatar";
import { maskCNPJ } from "../../../utils/masks/cnpj";
import { format } from "date-fns";
import { Eye, Pencil, Trash } from "phosphor-react";
import { Button } from "./components/button";

export function SimulationsPage() {
  const [customerModal, setCustomerModal] = useState(false);
  const [typeOfEstimateModal, setTypeOfEstimateModal] = useState(false);

  const { isLoading, setIsLoading } = useIsLoading(false);
  const { loadSimulations, setSimulations, simulations } = useSimulations();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    loadSimulations().then(() => setIsLoading(false));
  }, []);

  const updatePage = (page: number) => {
    setIsLoading(true);
    loadSimulations(page).then(() => setIsLoading(false));
  };

  return (
    <>
      <SimulationHead title="Portal de simulações" text="Todas as simulações realizadas no portal" mb0 />
      <Container pt0>
        <div className="w-full mt-8">
          <FilterCard />
          {isLoading ? (
            <div className="mt-6">
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-10 w-10 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <>
              <p className="text-simulation-title/60 text-simulation-sm font-medium leading-[26px] mt-6 pl-3">
                itens encontrados
              </p>
              <div className="grid grid-cols-1 mt-2 gap-2 max-h-[238px] overflow-auto px-3">
                {simulations?.data.map((simulation) => (
                  <div
                    key={simulation.id}
                    className="w-full bg-white shadow-simulation-sm rounded-md py-4 px-5 border border-black/10"
                  >
                    <div
                      className="grid grid-cols-8 items-center"
                      onClick={() => navigate(`/controle/simulacoes/${simulation.id}`)}
                    >
                      <div className="col-span-3">
                        <div className="grid grid-cols-7 gap-4">
                          <div className="col-span-1">
                            <div className="w-10 h-10 rounded-md overflow-hidden">
                              <img src={getAvatarSource(simulation.customer?.name)} alt="" />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <h4 className="text-simulation-title text-simulation-md font-semibold">
                              {simulation.customer?.name}
                            </h4>
                            <p className="text-simulation-text text-simulation-sm mt-[-2px]">
                              {maskCNPJ(simulation.customer?.cnpj || "")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <ul className="flex gap-2 items-center">
                          {simulation.typeOfEstimates.length > 2
                            ? [0, 1].map((key) => (
                                <li
                                  className="text-simulation-sm bg-primary/10 p-1 rounded-lg px-2 text-primary"
                                  key={simulation.typeOfEstimates[key].id}
                                >
                                  {simulation.typeOfEstimates[key].name
                                    .replace("Estimativa", "")
                                    .substring(0, 15)
                                    .trim()}
                                </li>
                              ))
                            : simulation.typeOfEstimates.map((typeOfEstimate) => (
                                <li
                                  className="text-simulation-sm bg-primary/10 p-1 rounded-lg px-2 text-primary"
                                  key={typeOfEstimate.id}
                                >
                                  {typeOfEstimate.name.replace("Estimativa", "").substring(0, 15).trim()}
                                </li>
                              ))}
                          <p className="text-[10px]">
                            {simulation.typeOfEstimates.length > 2 && `mais ${simulation.typeOfEstimates.length - 2}..`}
                          </p>
                        </ul>
                      </div>
                      <div className="col-span-1">
                        <h4 className="text-simulation-title text-simulation-md font-semibold">
                          {format(new Date(simulation.created_at), "dd/MM/yyyy")}
                        </h4>
                        <p className="text-simulation-text text-simulation-sm mt-[-2px]">Criado em</p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex justify-end items-center gap-4">
                          <div className="text-primary cursor-pointer">
                            <Eye size={20} weight="bold" />
                          </div>
                          <div className="text-sky-600 cursor-pointer">
                            <Pencil size={20} weight="bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {simulations && (
            <div className="py-4 mt-2 px-3 gap-6 flex justify-end items-center">
              <Button
                onConfirm={() => simulations.meta.currentPage > 1 && updatePage(simulations.meta.currentPage - 1)}
                confirmButtonText="<"
                confirmButtonIsActive={simulations.meta.currentPage > 1}
              />
              <p className="font-semibold">{simulations.meta.currentPage}</p>
              <Button
                onConfirm={() => updatePage(simulations.meta.currentPage + 1)}
                confirmButtonText=">"
                confirmButtonIsActive={simulations.meta.currentPage <= simulations.meta.lastPage}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
