import React from "react";
import { Input } from "../shared/components/Input";
import { Lock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { api } from "../shared/services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function AuthenticatePage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function onSubmit({ email, password }: any) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      localStorage.setItem("session.token", data.token);
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      navigate("/controle/usuarios");
    } catch (error: any) {
      Swal.fire({
        title: "Erro!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Bem-vindo ao JURID
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Acesse a sua conta
            {/* <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a> */}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Endereço de e-mail"
              label="Endereço de e-mail"
              customClassName="rounded-none rounded-t-md"
              register={register}
            />

            <Input
              id="password"
              autoComplete="current-password"
              type="password"
              name="password"
              required
              placeholder="Sua senha"
              label="Sua senha"
              customClassName="rounded-none rounded-b-md"
              register={register}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                {...register("remember")}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu a sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={18} />
              </span>
              Acessar plataforma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
