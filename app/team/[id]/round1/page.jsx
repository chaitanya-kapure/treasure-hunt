"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = String(params?.id || "").trim().toUpperCase();

  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const router = useRouter();

  const answers = {
    A1: "42",
    A2: "25",
    A3: "25",
    A4: "81",
    A5: "4",
    A6: "15",
    A7: "15",
    A8: "33"
  };

  const riddles = {
    A1: "Go where books live in silence.",
    A2: "Find the place where students eat.",
    A3: "Look for the biggest hall in college.",
    A4: "Find where water flows.",
    A5: "Look where events happen.",
    A6: "Find the entry gate.",
    A7: "Go to the sports area.",
    A8: "Find the admin office."
  };

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    if (input === answers[id]) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
      localStorage.setItem(id + "r1", "1");
    } else {
      playSound("/sounds/freesound_community-boo-6377.mp3");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Round 1</h2>

        {!isCorrect && (
          <>
            <p>Enter your answer:</p>
            <input onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}

        {isCorrect && (
          <>
            <h3>🎯 Next Location</h3>
            <p>{riddles[id]}</p>
            <button onClick={() => router.push(`/team/${id}/round2`)}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}