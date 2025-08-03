import { useState } from "react";
import { DeleteProduct } from "../../../shared/api";
import { useNavigate } from "react-router-dom";

/** хук управляющий удалением продукта при редактировании */
export const useDeleteProduct = (id: string | undefined) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const deleteProduct = () => {
    if (!id) return;

    DeleteProduct(id)
      .then(() => {
        closeModal();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        closeModal();
      });
  };

  const openDeletingModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  return { isDeleteModalOpen, deleteProduct, openDeletingModal, closeModal };
};
