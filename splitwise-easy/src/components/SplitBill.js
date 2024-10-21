import { useState } from "react";
import Button from "./Button";

function SplitBill({ selectedFriend: friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourShare, setYourShare] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("you");
  const paidByFriend = bill - yourShare;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !yourShare) return;

    onSplitBill(whoIsPaying === "you" ? paidByFriend : -paidByFriend);
  };

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>

      <label>💰 BIll Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👨‍💼 Your expense</label>
      <input
        type="number"
        value={yourShare}
        onChange={(e) =>
          setYourShare(
            Number(e.target.value) > bill ? yourShare : Number(e.target.value)
          )
        }
      />

      <label>🏂 {friend.name}'s expense</label>
      <input disabled type="text" value={bill ? paidByFriend : ""} />

      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => {
          setWhoIsPaying(e.target.value);
        }}
      >
        <option value={"you"}>You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>

      <Button btnStyle={`button`} onClick={handleSubmit}>
        Split bill
      </Button>
    </form>
  );
}

export default SplitBill;
