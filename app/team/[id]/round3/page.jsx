"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function Page() {
  const params = useParams();
  const id = String(params?.id || "").trim().toUpperCase();
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem(id + "r2")) {
      router.push(`/team/${id}/round2`);
    }
  }, []);
   const answers = {
    A1: "treasure",
    A2: "treasure",
    A3: "treasure",
    A4: "treasure",
    A5: "treasure",
    A6: "treasure",
    A7: "treasure",
    A8: "treasure"};
  const finalRiddle = "🏆 The treasure lies where your journey began.";
  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };
  const submit = () => {
    if (input.toLowerCase() === answers[id]) {
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
            <p>Enter your answer:</p>
            <input onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}
        {isCorrect && (
          <>
            <h3>🎉 FINAL CLUE</h3>
            <p>{finalRiddle}</p>
            <h2>🏆 YOU WON THE TREASURE HUNT!</h2>
          </>
        )}
      </div>
    </div>
  );
}