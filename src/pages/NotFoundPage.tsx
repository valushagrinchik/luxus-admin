import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Страница не найдена</h2>
      <button
        className="btn btn_light"
        onClick={() => navigate("/")}
        type="button"
      >
        Вернуться на главную
      </button>
    </div>
  );
};
export default NotFoundPage;
