import type { IFormState, FormAction } from "./types";

/** Редьюсер для формы */
export const formReducer = (state: IFormState, action: FormAction): IFormState => {
  switch (action.type) {
    case "UPDATE_FIELD": { //Обновить состояние поля
      const value =
        action.field === "packsNumber" && typeof action.value === "string"
          ? Number(action.value)
          : action.value;
      return {
        ...state,
        values: { ...state.values, [action.field]: value },
        // Сбрасываем ошибку при изменении поля
        errors: { ...state.errors, [action.field]: "" },
      };
    }
    case "SET_ERRORS": // Добавить ошибки валидации
      return { ...state, errors: action.errors };
    case "SET_VALUES": // Инициализация данными с сервера при редактировании
      return { ...state, values: action.values, errors: {} };
    default:
      return state;
  }
};
