export default function FriendList({ data, selectFriend }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend key={friend.id} friend={friend} selectFriend={selectFriend} />
      ))}
    </ul>
  );
}

function Friend({ friend, selectFriend }) {
  return (
    <li>
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

      <button className="button" onClick={() => selectFriend(friend.id)}>
        {" "}
        Select
      </button>
    </li>
  );
}
