import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ICustomerForm {
  cnpj?: string;
  name?: string;
  fantasy_name?: string;
  is_icms_tax_payer?: boolean;
  is_industry?: boolean;
  is_cde?: boolean;
}

export function useCustomerForm(defaultValues: ICustomerForm) {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICustomerForm>({
    resolver: yupResolver(
      yup.object({
        cnpj: yup.string(),
        name: yup.string().required("Nome é obrigatório!"),
        fantasy_name: yup.string().required("Nome fantasia é obrigatório!"),
      })
    ),

    defaultValues: defaultValues,
  });

  return { formRef, control, register, handleSubmit, watch, reset, setValue, formState: { errors } };
}
