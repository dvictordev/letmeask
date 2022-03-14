import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useEffect, useState } from "react";
import { database, ref, onValue, push } from "../services/firebase";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

import { useAuth } from "../hooks/useAuth";

export function Room() {
  const [newQuestion, setNewQuestion] = useState("");
  const { user } = useAuth();

  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");
  type paramsType = {
    id: string;
  };

  type FirebaseQuestions = Record<
    string,
    {
      author: {
        name: string;
        avatar: string;
      };
      content: string;
      isAnswered: boolean;
      isHighlighted: boolean;
    }
  >;

  type Questions = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  };

  const params = useParams<paramsType>();
  const roomId = params.id;

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}/`);

    onValue(roomRef, (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            author: value.author,
            content: value.content,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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
  }
  return (
    <div id="page-room">
      <header className="room-header">
        <img src={logoImg} alt="letmeask" />

        <RoomCode code={roomId} />
      </header>
      <main>
        <div className="main-header">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <form>
          <textarea
            placeholder="O que voce quer perguntar ?"
            onChange={(event) => {
              setNewQuestion(event.target.value);
            }}
            value={newQuestion}
          ></textarea>

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}

            <Button
              onClick={handleCreateQuestion}
              className="room-btn"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
          <div className="questions">
            {questions.map((element) => (
              <div className="question">
                <p>{element.content}</p>
                <div className="user-info">
                  <img
                    id="userImage"
                    src={element.author.avatar}
                    alt="user image"
                  />
                  <span>{element.author.name}</span>
                </div>
              </div>
            ))}
          </div>
        </form>
      </main>
    </div>
  );
}
