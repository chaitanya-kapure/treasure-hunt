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
    A1: "100",   // your Q3 answers
    A2: "200",
    A3: "300",
    A4: "400",
    A5: "500",
    A6: "600",
    A7: "700",
    A8: "800"
  };
  const riddles = {
    A1: "Go where the treasure is hidden.",
    A2: "Final place awaits you.",
    A3: "Look where everything started.",
    A4: "End lies at the beginning.",
    A5: "Find the final point.",
    A6: "Last step leads to treasure.",
    A7: "Go to your destiny.",
    A8: "Finish line is near."
  };

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    if (input === answers[id]) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
      localStorage.setItem(id + "r3", "1");
    } else {
      playSound("/sounds/freesound_community-boo-6377.mp3");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Round 3</h2>

        {!isCorrect && (
          <>
            <p>Enter your answer:</p>
            <input onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}

        {isCorrect && (
          <>
            <h3>🎯 Final Location</h3>
            <p>{riddles[id]}</p>
            <button onClick={() => router.push(`/team/${id}/final`)}>
              Go to Final Round
            </button>
          </>
        )}
      </div>
    </div>
  );
}