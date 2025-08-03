import st from "./notFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <main className={st.main}>
      <div className={st.content}>
        <h1 className={st.errNum}>404</h1>
        <p className={st.errTxt}>Страница не найдена</p>
      </div>
    </main>
  );
};
