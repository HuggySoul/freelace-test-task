import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductList } from "../pages/productList";
import { routes } from "../shared/router";
import { ProductForm } from "../pages/productForm";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.productList.path} element={<ProductList />} />
        <Route path={routes.createProduct.path} element={<ProductForm />} />
        <Route path={routes.editProduct.path} element={<ProductForm />} />
        {/* <Route path={routes.notFound.path} element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};
