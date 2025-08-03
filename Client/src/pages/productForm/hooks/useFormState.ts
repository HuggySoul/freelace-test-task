import { useEffect, useReducer, useState } from "react";
import { GetProductById } from "../../../shared/api";
import type { IFormState } from "../types";
import type { Product } from "../../../shared/types";
import { formReducer } from "../formReducer";

/** хук контролирующий состояние формы */
export const useFormState = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);

  // Начальное состояние формы
  const initialState: IFormState = {
    values: {
      packsNumber: 0,
      packageType: "" as Product["packageType"],
      isArchived: false,
      description: "",
    },
    errors: {},
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Загрузка данных для редактирования
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      GetProductById(id).then((res) => {
        if (res) {
          const { id, createdAt, ...except } = res;
          dispatch({ type: "SET_VALUES", values: except });
        }
        setIsLoading(false);
      });
    }
  }, [id]);

  return { formState, isLoading, dispatch };
};
