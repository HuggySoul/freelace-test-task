import st from "./tooltip.module.css";

interface IProps {
  children: React.ReactNode;
  content?: string;
}
export const Tooltip = ({ children, content }: IProps) => {
  return (
    <div
      style={{ cursor: `${content?.length ? "pointer" : "not-allowed"}` }}
      className={st.tooltip}
    >
      {children}
      {content?.length && <p className={st.content}>{content}</p>}
    </div>
  );
};
