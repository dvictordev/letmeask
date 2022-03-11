import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useState } from "react";
import { database, ref, onValue, push } from "../services/firebase";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Room() {
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState("");
  const { user } = useAuth();

  type paramsType = {
    id: string;
  };

  const params = useParams<paramsType>();

  const roomId = params.id;

  async function handleCreateQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("User must be logged in!");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionsRef = ref(database, `rooms/${roomId}/questions`);

    await push(questionsRef, question);
    setNewQuestion("");
    // navigate(`/rooms/${RoomCode}`);
  }
  return (
    <div id="page-room">
      <header className="room-header">
        <img src={logoImg} alt="letmeask" />

        <RoomCode code={roomId} />
      </header>
      <main>
        <h1>Sala React Q&A</h1>

        <form>
          <textarea
            placeholder="O que voce quer perguntar ?"
            onChange={(event) => {
              setNewQuestion(event.target.value);
            }}
            value={newQuestion}
          ></textarea>

          <div className="form-footer">
            <p>
              para enviar uma pergunta, <button>faça seu login</button>.
            </p>

            <Button
              onClick={handleCreateQuestion}
              className="room-btn"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question"></div>
      </main>
    </div>
  );
}
