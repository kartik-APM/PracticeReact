export default function FriendList({ data, selectedFriend, onSelection }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={"Profile"} />
      <h3>{friend.name}</h3>

      {friend.balance > 0 ? (
        <p className="green">{`${friend.name} owes you ₹${Math.abs(
          friend.balance
        )}`}</p>
      ) : friend.balance < 0 ? (
        <p className="red">{`You owe ${friend.name} ₹${Math.abs(
          friend.balance
        )}`}</p>
      ) : (
        <p>{`You and ${friend.name} are even`}</p>
      )}

      <button className="button" onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
