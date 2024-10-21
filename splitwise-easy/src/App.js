import { useEffect, useState } from "react";
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

function setLocalStorage(friends) {
  localStorage.setItem("friends", JSON.stringify(friends));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("friends"));
  if (!data) return initialFriends;
  console.log(data);
  return data;
}

function App() {
  const [friends, setFriends] = useState(getLocalStorage());
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(null);

  useEffect(() => {
    setLocalStorage(friends);
  }, [friends]);

  const handleBtnClick = () => {
    setShowAddFriend((show) => !show);
  };

  const onFriendSelected = (friend) => {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleBillSplit = (value) => {
    const updatedFriendList = friends.map((friend) => {
      if (friend.id === selectedFriend.id) {
        return { ...friend, balance: friend.balance + value };
      }
      return friend;
    });
    setFriends([...updatedFriendList]);
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          data={friends}
          selectedFriend={selectedFriend}
          onSelection={onFriendSelected}
        />
        {showAddFriend ? <FormAddFriend onAddFriend={handleAddFriend} /> : null}
        <Button btnStyle={"button"} onClick={handleBtnClick}>
          {showAddFriend ? `Close` : `Add friend`}
        </Button>
      </div>
      {selectedFriend ? (
        <SplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleBillSplit}
        />
      ) : null}
    </div>
  );
}

export default App;
