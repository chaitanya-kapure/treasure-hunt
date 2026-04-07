"use client";
import { useRouter, useParams } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const params = useParams();
  let id = String(params?.id || "").trim().toUpperCase();

  if (!id.startsWith("A")) {
    id = "A" + id;
  }

  return (
    <div className="center">
      <div className="card">
        <h2>Nice!</h2>
        <p>Go to Venue: Library Entrance</p>

        {/* <img src="https://i.imgflip.com/1bij.jpg" width="200"/> */}

        <button onClick={() => router.push(`/team/${id}/round3`)}>
          Final Round
        </button>
      </div>
    </div>
  );
}