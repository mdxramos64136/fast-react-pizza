import { useState } from "react";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p
        id="username-instruction"
        className="mb-4 text-sm text-stone-600 md:text-base"
      >
        👋 Welcome! Please start by telling us your name:
      </p>

      <label htmlFor="username" className="sr-only">
        Your full name
      </label>
      <input
        id="username"
        aria-describedby="username-instruction"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-3 w-72"
      />

      <div aria-live="ppolite">
        {username !== "" && (
          <div>
            <Button type="primary">Start ordering</Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default CreateUser;
