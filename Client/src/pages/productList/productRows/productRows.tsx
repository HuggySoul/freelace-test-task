import type { Product } from "../../../shared/types";
import infoIcon from "../../../shared/assets/icons/infoIcon.svg";
import editIcon from "../../../shared/assets/icons/editIcon.svg";
import deleteIcon from "../../../shared/assets/icons/deleteIcon.svg";
import st from "./productRows.module.css";
import { useState } from "react";
import { DeleteModal } from "../../../shared/ui/deleteModal";
import { DeleteProduct } from "../../../shared/api";
import { createPortal } from "react-dom";
import { Tooltip } from "../tooltip";
import { useNavigate } from "react-router-dom";

interface IProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductRows = ({ products, setProducts }: IProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const navigate = useNavigate();

  const deleteProduct = () => {
    if (!selectedProductId) return;

    DeleteProduct(selectedProductId)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        closeModal();
      });
  };

  const openDeletingModal = (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <>
      {products.map((product, i) => (
        <tr key={product.id}>
          <td scope="row">{i + 1}</td>
          <td>{product.packsNumber}</td>
          <td>{product.packageType}</td>
          <td>{new Date(product.createdAt).toLocaleDateString("ru-RU")}</td>
          <td>{product.isArchived ? "Активно" : "Архив"}</td>
          <td>
            <Tooltip content={product.description}>
              <img className={st.infoIcon} src={infoIcon} alt="Описание" />
            </Tooltip>
          </td>
          <td>
            <div className={st.btns}>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className={st.tableBtn}
              >
                <img className={st.editIcon} src={editIcon} alt="Редактировать" />
              </button>
              <button
                onClick={() => openDeletingModal(product.id)}
                className={st.tableBtn}
              >
                <img className={st.deleteIcon} src={deleteIcon} alt="Удалить" />
              </button>
            </div>
          </td>
        </tr>
      ))}

      {isDeleteModalOpen &&
        createPortal(
          <DeleteModal deleteProduct={deleteProduct} closeModal={closeModal} />,
          document.body
        )}
    </>
  );
};
