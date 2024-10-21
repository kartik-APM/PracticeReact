import { useState } from "react";
import Button from "./Button";

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !imgUrl) {
      alert("Please fill in all fields");
      return;
    }

    const newFriend = {
      id: Date.now(),
      name: name,
      image: imgUrl,
      balance: 0,
    };

    onAddFriend(newFriend);
    setImg("");
    setName("");
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
