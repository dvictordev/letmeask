import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question({ content, author }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <div className="question-footer">
        <div className="user-info">
          <img id="userImage" src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
