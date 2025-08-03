import st from "./productList.module.css";
import loading from "../../shared/assets/icons/loading.svg";
import { useGetProducts } from "./useGetProducts";
import { ProductRows } from "./productRows";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const { isLoading, products, setProducts } = useGetProducts();
  const navigate = useNavigate();

  return (
    <>
      <header className={st.header}>
        <h1 className={st.title}>Список выпускаемой продукции</h1>
        <button onClick={() => navigate("/product")} className={st.createBtn}>
          Создать тип продукции
        </button>
      </header>
      <main className={st.main}>
        {isLoading ? (
          <img className={st.loading} src={loading} alt="Загрузка..." />
        ) : (
          <table className={st.productTable}>
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Кол-во пачек</th>
                <th scope="col">Тип упаковки</th>
                <th scope="col">Дата создания</th>
                <th scope="col">Статус</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <ProductRows setProducts={setProducts} products={products} />
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};
