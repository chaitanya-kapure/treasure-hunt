"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = String(params?.id || "").trim().toUpperCase();

  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(id + "r3")) {
      window.location.href = `/team/${id}/round3`;
    }
  }, []);

  // ✅ SAME FOR ALL TEAMS
  const finalAnswer = "winner";

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    if (input.toLowerCase() === finalAnswer) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
    } else {
      playSound("/sounds/freesound_community-boo-6377.mp3");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Final Round</h2>

        {!isCorrect && (
          <>
            <p>Enter final answer:</p>
            <input onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}

        {isCorrect && (
          <>
            <h1>🏆 YOU WON!</h1>
            <p>Go claim your treasure 🎁</p>
          </>
        )}
      </div>
    </div>
  );
}