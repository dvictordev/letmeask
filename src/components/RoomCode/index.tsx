import { ButtonHTMLAttributes } from "react";
import copyImg from "../../assets/images/copy.svg";
import "./styles.scss";

import { useParams } from "react-router-dom";

type RoomCodeProps = {
  code: any;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="room-code-btn" onClick={copyToClipboard}>
      <div className="copy-box">
        <img src={copyImg} alt="copy to clipboard" />
      </div>
      <p>Sala #{code}</p>
    </button>
  );
}
