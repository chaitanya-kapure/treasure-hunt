"use client";
export default function Home() {
  const teams = ["A1","A2","A3","A4","A5","A6","A7","A8"];
  const openTeam = (team) => {
    window.open(`/team/${team}/round1`, "_blank");
  };
  return (
    <div className="center">
      <div className="card">
        <h1>Treasure Hunt</h1>
        {teams.map(t => (
          <button key={t} onClick={()=>openTeam(t)}>{t}</button>
        ))}
      </div>
    </div>
  );
}