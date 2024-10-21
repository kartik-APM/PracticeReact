import { useState } from "react";
import Button from "./Button";

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImg] = useState("https://i.pravatar.cc/48?u=");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !imgUrl) {
      alert("Please fill in all fields");
      return;
    }

    const uId = crypto.randomUUID();
    const newFriend = {
      id: uId,
      name: name,
      image: `${imgUrl}${uId}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImg("https://i.pravatar.cc/48?u=");
  };

  return (
    <form className="form-add-friend">
      <label>👯 Friend Name</label>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />

      <label>👯 Image url</label>
      <input
        value={imgUrl}
        type="text"
        onChange={(e) => setImg(e.target.value)}
      />

      <Button btnStyle={`button`} onClick={handleSubmit}>
        Add
      </Button>
    </form>
  );
}

export default FormAddFriend;
