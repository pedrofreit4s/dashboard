import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../simulations/components/button";
import { CustomSelect } from "../../../simulations/components/customSelect";
import { inputClassName } from "../../../simulations/components/input";
import { useIsLoading } from "../../../simulations/hooks/useIsLoading";
import { CustomerNameInput } from "../../../simulations/modals/customer/components/customerNameInput";
import { useUFs } from "../../../simulations/modals/customer/hooks/ufs";
import ReactInputMask from "react-input-mask";

interface IForm {
  customer_id: string;
  createdAt: string;
  uf_id: string;
}

export function FilterCard() {
  const { isLoading, setIsLoading } = useIsLoading();
  const { isLoading: isFilterLoading, setIsLoading: setIsFilterLoading } = useIsLoading();

  const { loadUFs, uf, setUf, ufs } = useUFs();
  const { control, setValue } = useForm<IForm>();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([loadUFs()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const onFilter = async () => {};

  return (
    <div className="w-full bg-white shadow-simulation-sm rounded-lg p-5">
      <div className="grid grid-cols-8 gap-4 items-center">
        <div className="col-span-3">
          <CustomerNameInput
            id="name"
            label="Por um cliente"
            defaultValue={{ key: "", value: "" }}
            select={async (item) => {
              setValue("customer_id", item.value);
            }}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="createdAt"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-[5px]">
                <label htmlFor={"createdAt"} className="text-simulation-label text-[14px] font-semibold">
                  Data de cadastro
                  <span className="text-red-600 text-md"></span>
                </label>
                <ReactInputMask mask="99/99/9999" className={inputClassName} id="createdAt" type="text" {...field} />
              </div>
            )}
          />
        </div>
        <div className="col-span-2">
          {ufs && !isLoading ? (
            <CustomSelect id="uf" label="UF" items={ufs} defaultValue={uf} select={(item) => setUf(item)} />
          ) : null}
        </div>
        <div className="col-span-1 flex justify-end pt-7">
          <Button confirmButtonText="Filtrar" isLoading={isFilterLoading} confirmButtonIsActive />
        </div>
      </div>
    </div>
  );
}
