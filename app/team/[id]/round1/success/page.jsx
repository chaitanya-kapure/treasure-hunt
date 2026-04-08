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
        <h2>Correct!</h2>
        <button onClick={() => router.push(`/team/${id}/round2`)}>Round 2</button>
      </div>
    </div>
  );
}
