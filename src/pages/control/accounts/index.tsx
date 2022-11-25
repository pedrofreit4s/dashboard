import React from "react";
import { Button } from "../../../shared/components/button";
import { Container } from "../../../shared/components/container";
import { Trash, Pencil } from "phosphor-react";

export function AccountsPage() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black/90 font-work font-bold text-xl">
            Usuários cadastrados
          </h2>
          <p className="text-sm text-black/50">
            administre todos os usuários do sistema
          </p>
        </div>
        <Button type="button">Criar usuário</Button>
      </div>
      <div className="mt-14 overflow-auto">
        <table className="border-collapse shadow-sm shadow-black/10 rounded-md text-left border border-black/5">
          <thead className="shadow-md shadow-black/5">
            <tr className="text-1sm uppercase">
              <th className="py-4 px-6 tracking-wider font-semibold">Conta</th>
              <th className="py-4 px-6 tracking-wider font-semibold">Nome</th>
              <th className="py-4 px-6 tracking-wider font-semibold">Email</th>
              <th className="py-4 px-6 tracking-wider font-semibold">
                Administrador
              </th>
              <th className="py-4 px-6 tracking-wider font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((key) => (
              <tr
                key={key}
                className="even:bg-black/5 hover:bg-black/5 transition-all"
              >
                <td className="py-4 px-6">ACC_3434-345</td>
                <td className="py-4 px-6">Roberto Sales Silva</td>
                <td className="py-4 px-6">
                  roberto.sales.da.silva@empresa.com
                </td>
                <td className="py-4 px-6">Sim</td>
                <td className="py-4 px-6">12/02/2021 às 13:45:23</td>
                <td className="py-4 px-6">
                  <div className="flex gap-4">
                    <Trash size={22} className="text-red-600 cursor-pointer" />
                    <Pencil size={22} className="text-primary cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
