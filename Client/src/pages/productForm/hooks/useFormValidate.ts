import type { Product } from "../../../shared/types";
import type { IErrors } from "../types";

/** хук валидирующий форму */
export const useFormValidate = () => {
  const validate = (formData: Omit<Product, "id" | "createdAt">) => {
    const errors: IErrors = {};

    if (
      !formData.packsNumber ||
      isNaN(formData.packsNumber) ||
      Number(formData.packsNumber) < 1
    ) {
      errors.packsNumber = "Количество пачек должно быть числом больше 0";
    }

    if (!formData.packageType) {
      errors.packageType = "Выберите тип упаковки";
    }

    return errors;
  };

  return { validate };
};
