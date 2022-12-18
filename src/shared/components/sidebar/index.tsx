import React from "react";
import {
  CaretDown,
  MagnifyingGlass,
  Stack,
  Smiley,
  Archive,
  Users,
  Coin,
  Receipt,
  Car,
  Cube,
  HourglassSimpleHigh,
  ShieldCheck,
  Buildings,
  Bug,
  SignOut,
  Boat,
  Note,
  Mountains,
} from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { account, signOut } = useAuth();

  return (
    <div className="w-[320px] h-screen fixed bg-white border-r border-r-black/5 overflow-y-auto">
      <div className="px-5 py-5">
        <h2 className="text-primary font-bold text-xl text-center">
          JURID
          <span className="text-black/50 font-medium text-md">/control</span>
        </h2>
      </div>
      <div className="px-5 py-5 relative">
        <div className="absolute z-10 top-[32px] left-9 text-gray-400">
          <MagnifyingGlass size={20} weight="bold" />
        </div>
        <input
          type="text"
          className="relative block w-full bg-gray-300/20 border-black/5 border-2 appearance-none rounded-md px-3 pl-12 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Buscar.."
        />
      </div>

      <ul className="px-5 py-4 pt-2 border-b border-b-black/5">
        <li className="flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md px-4 bg-black/5 text-black">
          <Stack size={20} weight="bold" /> Simular algo
        </li>
        <li className="flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-al px-4">
          <Archive size={20} weight="bold" /> Minhas simulações
        </li>
        <li className="flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all px-4">
          <Smiley size={20} weight="bold" /> Meus clientes
        </li>
      </ul>
      <div className="relative">
        <div className="px-5 py-4 pt-6 pb-[150px]">
          <h5 className="font-work uppercase text-1sm font-semibold text-black/50">
            tabelas
          </h5>
          <ul className="px-5 py-4 pt-2">
            <li
              onClick={() => navigate("/controle/usuarios")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/usuarios" && "text-black"
              } `}
            >
              <Users size={20} weight="bold" /> Usuários
            </li>
            <li
              onClick={() => navigate("/controle/moedas")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/moedas" && "text-black"
              } `}
            >
              <Coin size={20} weight="bold" /> Moedas
            </li>
            <li
              onClick={() => navigate("/controle/regime-tributario")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/regime-tributario" && "text-black"
              } `}
            >
              <Receipt size={20} weight="bold" /> Regime tributário
            </li>
            <li
              onClick={() => navigate("/controle/objetivas")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/objetivas" && "text-black"
              } `}
            >
              <Cube size={20} weight="bold" /> Objetivas
            </li>
            <li
              onClick={() => navigate("/controle/tipo-de-estimativa")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/tipo-de-estimativa" && "text-black"
              } `}
            >
              <HourglassSimpleHigh size={20} weight="bold" /> Tipo de estimativa
            </li>
            <li
              onClick={() => navigate("/controle/seguros")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/seguros" && "text-black"
              } `}
            >
              <ShieldCheck size={20} weight="bold" /> Seguros
            </li>
            <li
              onClick={() => navigate("/controle/incoterms")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/incoterms" && "text-black"
              } `}
            >
              <Bug size={20} weight="bold" /> Incoterms
            </li>
            <li
              onClick={() => navigate("/controle/icms")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/icms" && "text-black"
              } `}
            >
              <Car size={20} weight="bold" /> ICMS
            </li>
            <li
              onClick={() => navigate("/controle/ufs")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/ufs" && "text-black"
              } `}
            >
              <Buildings size={20} weight="bold" /> UFs
            </li>
            <li
              onClick={() => navigate("/controle/tipos-de-containers")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/tipos-de-containers" && "text-black"
              } `}
            >
              <Boat size={20} weight="bold" /> Tipos de containers
            </li>
            <li
              onClick={() => navigate("/controle/taxas-de-agenciamento")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/taxas-de-agenciamento" && "text-black"
              } `}
            >
              <Note size={20} weight="bold" /> Taxas de agenciamento
            </li>
            <li
              onClick={() => navigate("/controle/modais")}
              className={`flex text-black/50 text-sm items-center gap-3 py-[10px] mb-1 last:mb-0 cursor-pointer hover:text-black transition-all rounded-md ${
                pathname === "/controle/modais" && "text-black"
              } `}
            >
              <Mountains size={20} weight="bold" /> Modals
            </li>
          </ul>
        </div>

        <div className="w-[300px] bg-white h-[150px] px-5 py-5 fixed bottom-0 border-t border-t-black/5">
          <li
            onClick={signOut}
            className="flex text-black/50 text-sm items-center gap-3 py-[10px] mb-4 last:mb-0 cursor-pointer transition-all rounded-md text-red-500"
          >
            <SignOut size={20} weight="duotone" /> Sair da conta
          </li>
          <div className="flex justify-between items-center select-none cursor-pointer">
            <div className=" flex items-center gap-4">
              <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
                <img
                  src={`https://avatars.dicebear.com/api/adventurer-neutral/${account?.name}.svg`}
                  alt={account?.name || "Pedro"}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-work font-semibold">
                  {account?.name}
                </h3>
                <p className="text-work text-sm text-black/40 mt-[-5px]">
                  {account?.email}
                </p>
              </div>
            </div>
            <div className="text-black/60 ">
              <CaretDown size={20} weight="bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
