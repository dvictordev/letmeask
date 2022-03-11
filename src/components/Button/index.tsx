import { ButtonHTMLAttributes } from "react";
import "./style.scss";

type btnProp = ButtonHTMLAttributes<HTMLElement>;

export function Button(props: btnProp) {
  return <button {...props} className="buttonComponent" />;
}
