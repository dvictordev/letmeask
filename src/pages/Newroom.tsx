import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoIconImg from "../assets/images/logo.svg";

import "../styles/home.scss";
import { Button } from "../components/Button/";
import { database, ref, push } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

import {} from "../services/firebase";

export function Newroom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  const navigate = useNavigate();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === " ") {
      return;
    }

    const roomRef = ref(database, "rooms");

    const firebaseRoom = await push(roomRef, {
      authorId: user?.id,
      title: newRoom,
    });

    navigate(`/rooms/${firebaseRoom.key}`);
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

          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              className="roomCode"
              onChange={(event) => {
                setNewRoom(event.target.value);
              }}
              value={newRoom}
            />
            <Button type="submit" className="create-room">
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
