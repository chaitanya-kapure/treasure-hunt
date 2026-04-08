"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const teams = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];

  return (
    <div className="center">
      <div className="card">
        <h1>Treasure Hunt</h1>
        <p>Select your team to start Round 1.</p>
        {teams.map((team) => (
          <button key={team} onClick={() => router.push(`/team/${team}/round1`)}>
            {team}
          </button>
        ))}
      </div>
    </div>
  );
}
