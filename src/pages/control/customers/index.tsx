import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Eye, Pencil, Trash } from "phosphor-react";
import { Container } from "../../../shared/components/container";
import { getAvatarSource } from "../../../utils/avatar";
import { maskCNPJ } from "../../../utils/masks/cnpj";
import { SimulationHead } from "../simulations/components/head";
import { useIsLoading } from "../simulations/hooks/useIsLoading";
import { FilterCard } from "./components/filterCard";
import { api } from "../../../shared/services/api";
import { ICustomer } from "../../../shared/interfaces/simulations/ICustomer";
import { useNavigate } from "react-router-dom";

export function Customers() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const { isLoading, setIsLoading } = useIsLoading();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/customers")
      .then(({ data }) => {
        setCustomers(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    api.delete(`/customers/${id}`);
  }, []);

  return (
    <>
      <SimulationHead
        buttonAction={() => {
          navigate("/controle/novo-cliente");
        }}
        buttonText="Novo cliente"
        title="Clientes cadastrados"
        text="Todos os clientes cadastrados em nosso portal"
        mb0
      />
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
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="w-full bg-white shadow-simulation-sm rounded-md py-4 px-5 border border-black/10"
                  >
                    <div className="grid grid-cols-8 items-center">
                      <div className="col-span-3">
                        <div className="grid grid-cols-7 gap-4">
                          <div className="col-span-1">
                            <div className="w-10 h-10 rounded-md overflow-hidden">
                              <img src={getAvatarSource(customer.name)} alt="" />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <h4 className="text-simulation-title text-simulation-md font-semibold">{customer.name}</h4>
                            <p className="text-simulation-text text-simulation-sm mt-[-2px]">
                              {maskCNPJ(customer.cnpj || "")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <ul className="flex gap-2 items-center">
                          {customer.customerDispatcherFees.length > 1
                            ? [0].map((item) => (
                                <li
                                  key={customer.customerDispatcherFees[item].id}
                                  className="text-simulation-sm bg-primary/10 p-1 rounded-lg px-2 text-primary"
                                >
                                  {customer.customerDispatcherFees[item].dispatcherServicesAndFees.name}:{" "}
                                  {customer.customerDispatcherFees[item].value}
                                </li>
                              ))
                            : customer.customerDispatcherFees.map((dispatcherFee) => (
                                <li
                                  key={dispatcherFee.id}
                                  className="text-simulation-sm bg-primary/10 p-1 rounded-lg px-2 text-primary"
                                >
                                  {dispatcherFee.dispatcherServicesAndFees.name}: {dispatcherFee.value}
                                </li>
                              ))}
                          <p className="text-[10px]">
                            {customer.customerDispatcherFees.length > 1
                              ? `mais ${customer.customerDispatcherFees.length}`
                              : ""}
                          </p>
                        </ul>
                      </div>
                      <div className="col-span-1">
                        <h4 className="text-simulation-title text-simulation-md font-semibold">
                          {format(new Date(customer.created_at), "dd/MM/yyyy")}
                        </h4>
                        <p className="text-simulation-text text-simulation-sm mt-[-2px]">Criado em</p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex justify-end items-center gap-4">
                          <div className="text-primary cursor-pointer">
                            <Eye size={20} weight="bold" />
                          </div>
                          <div
                            className="text-sky-600 cursor-pointer"
                            onClick={() => navigate(`/controle/clientes/${customer.id}`)}
                          >
                            <Pencil size={20} weight="bold" />
                          </div>
                          {/* <div className="text-red-600 cursor-pointer" onClick={() => deleteCustomer(customer.id)}>
                            <Trash size={20} weight="bold" />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
