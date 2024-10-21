import { useState } from "react";
import FriendList from "./components/FriendList";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import SplitBill from "./components/SplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [openAddFriendForm, setOpenAddFriendForm] = useState(false);

  const handleBtnClick = () => {
    setOpenAddFriendForm(!openAddFriendForm);
  };

  const addFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <FriendList data={friends} selectFriend={onFriendSelected} />
        <div className="form">
          {openAddFriendForm ? <FormAddFriend onAddFriend={addFriend} /> : null}
        </div>
        <Button btnStyle={"button"} onClick={handleBtnClick}>
          {openAddFriendForm ? `Close` : `Add friend`}
        </Button>
      </div>
    </div>
  );
}

export default App;
