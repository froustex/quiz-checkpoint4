function UserCard({ user }) {
  const date = new Date(user.created_at);
  const convertDate = date.toLocaleDateString("fr-FR");

  return (
    <div className="user-card">
      <div className="user-card-detail">
        {user.username}
        <p>Taux de réussite : {user.percentage_score}</p>
        <p> Note donnée par l'utilisateur: {user.rate}</p>
        <p>Inscrit depuis le {convertDate}</p>
      </div>
    </div>
  );
}

export default UserCard;
