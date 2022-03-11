import illustrationImg from "../assets/images/illustration.svg";
import logoIconImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import logInImg from "../assets/images/log-in.svg";

import "../styles/home.scss";
import { Button } from "../components/Button/";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database, ref, get, child } from "../services/firebase";

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const handleAuth = async function () {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  };

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === " ") {
      return;
    }
    const dbRef = ref(database);

    const roomRef = await get(child(dbRef, `rooms/${roomCode}`));

    if (!roomRef.exists()) {
      alert("Room does not exist");
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração de perguntas de respostas" />
        <strong>Crie salas de Q&amp;A</strong>
        <p>aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIconImg} alt="letmeask" />
          <button className="logInGoogle" onClick={handleAuth}>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator"> ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o codigo da sala"
              className="roomCode"
              onChange={(event) => {
                setRoomCode(event.target.value);
              }}
              value={roomCode}
            />
            <Button type="submit" id="home-btn">
              <img src={logInImg} alt="entrar na sala" id="logBtnImg" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
