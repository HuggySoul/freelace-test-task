import st from "./deleteModal.module.css";
import { useEffect } from "react";

interface IProps {
  closeModal: () => void;
  deleteProduct: () => void;
}

export const DeleteModal = ({ closeModal, deleteProduct }: IProps) => {
  useEffect(() => {
    // Блокируем скролл на body при монтировании окна
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <dialog onClick={closeModal} className={st.modal}>
      <div className={st.modalContent}>
        <h3 className={st.title}>Удалить позицию?</h3>
        <div className={st.btns}>
          <button className={`${st.btn} ${st.cancelBtn}`} onClick={closeModal}>
            Отмена
          </button>
          <button className={`${st.btn} ${st.deleteBtn}`} onClick={deleteProduct}>
            Удалить
          </button>
        </div>
      </div>
    </dialog>
  );
};
