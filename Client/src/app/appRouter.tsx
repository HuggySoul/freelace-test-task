import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ProductList } from "../pages/productList";
import { routes } from "../shared/router";
import { ProductForm } from "../pages/productForm";
import { NotFoundPage } from "../pages/notFoundPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.productList.path} element={<ProductList />} />
        <Route path={routes.createProduct.path} element={<ProductForm />} />
        <Route path={routes.editProduct.path} element={<ProductForm />} />
        <Route path={routes.notFound.path} element={<NotFoundPage />} />
        <Route
          path={routes.allNotExistingRoutes.path}
          element={<Navigate to={routes.notFound.path} replace />}
        />
      </Routes>
    </Router>
  );
};
