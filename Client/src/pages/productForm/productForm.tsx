import st from "./productForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../shared/types";
import { useFormValidate } from "./hooks/useFormValidate";
import { useFormState } from "./hooks/useFormState";
import { CreateProduct, EditProduct } from "../../shared/api";
import { useDeleteProduct } from "./hooks/useDeleteProduct";
import { createPortal } from "react-dom";
import { DeleteModal } from "../../shared/ui/deleteModal";
import loader from "../../shared/assets/icons/loading.svg";

export const ProductForm = () => {
  const { id } = useParams(); // id редактируемой формы
  const navigate = useNavigate();
  const { formState, dispatch, isLoading } = useFormState(id);
  const { validate } = useFormValidate();
  const { isDeleteModalOpen, deleteProduct, closeModal, openDeletingModal } =
    useDeleteProduct(id);

  const isEditMode = !!id;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    dispatch({
      type: "UPDATE_FIELD",
      field: name as keyof Omit<Product, "id" | "createdAt">,
      value: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formState.values);

    if (Object.keys(errors).length === 0) {
      if (!isEditMode) {
        CreateProduct(formState.values)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        EditProduct(id, formState.values)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      dispatch({ type: "SET_ERRORS", errors });
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <>
      <header className={st.header}>
        <h1>{isEditMode ? "Редактирование" : "Создание"} типа продукции</h1>
        {isLoading && isEditMode && (
          <img className={st.loader} src={loader} alt="Загрузка..." />
        )}
      </header>
      <main className={st.main}>
        <form onSubmit={handleSubmit}>
          <div className={st.inputBlock}>
            <label htmlFor="quantity" className={st.inputTitle}>
              Кол-во пачек <span className={st.highlight}>*</span>
            </label>
            <div className={st.inputWrapper}>
              <input
                id="quantity"
                name="packsNumber"
                className={st.input}
                type="number"
                min={0}
                value={formState.values.packsNumber}
                onChange={handleInputChange}
              />
              {formState.errors.packsNumber && (
                <span className={st.errorMessage}>{formState.errors.packsNumber}</span>
              )}
            </div>
          </div>
          <div className={st.inputBlock}>
            <label htmlFor="type" className={st.inputTitle}>
              Тип упаковки <span className={st.highlight}>*</span>
            </label>
            <div className={st.inputWrapper}>
              <select
                id="type"
                name="packageType"
                className={st.select}
                value={formState.values.packageType}
                onChange={handleInputChange}
              >
                <option value="">Выберите тип упаковки</option>
                <option value="компрессия">компрессия</option>
                <option value="некомпрессия">некомпрессия</option>
              </select>
              {formState.errors.packageType && (
                <span className={st.errorMessage}>{formState.errors.packageType}</span>
              )}
            </div>
          </div>
          <div className={st.inputBlock}>
            <label htmlFor="isArchived" className={st.inputTitle}>
              Архивировано
            </label>
            <input
              id="isArchived"
              name="isArchived"
              type="checkbox"
              className={st.checkbox}
              checked={formState.values.isArchived}
              onChange={handleInputChange}
            />
          </div>
          <div className={st.inputBlock}>
            <label htmlFor="description" className={st.inputTitle}>
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              className={st.textarea}
              value={formState.values.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={st.btns}>
            {isEditMode && (
              <button
                onClick={openDeletingModal}
                type="button"
                className={`${st.btn} ${st.deleteBtn}`}
              >
                Удалить
              </button>
            )}
            <button
              type="button"
              onClick={handleRedirect}
              className={`${st.btn} ${st.cancelBtn}`}
            >
              Отмена
            </button>
            <button type="submit" className={`${st.btn} ${st.submitBtn}`}>
              {isEditMode ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
        {isDeleteModalOpen &&
          createPortal(
            <DeleteModal deleteProduct={deleteProduct} closeModal={closeModal} />,
            document.body
          )}
      </main>
    </>
  );
};
