import type { Product } from "../../shared/types";

/** Возможные ошибки в форме */
export interface IErrors {
  packsNumber?: string;
  packageType?: string;
}

/** Тип стейта для редьюсера формы*/
export interface IFormState {
  values: Omit<Product, "id" | "createdAt">;
  errors: IErrors;
}

/** Тип экшена для редьюсера формы */
export type FormAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof Omit<Product, "id" | "createdAt">;
      value: number | Product["packageType"] | boolean | string | undefined;
    }
  | { type: "SET_ERRORS"; errors: IErrors }
  | { type: "SET_VALUES"; values: Omit<Product, "id" | "createdAt"> };
