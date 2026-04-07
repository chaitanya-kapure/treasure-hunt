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
    if (!localStorage.getItem(id + "r1")) {
      router.push(`/team/${id}/round1`);
    }
  }, []);

  const answers = {
    A1: "shadow",
    A2: "echo",
    A3: "time",
    A4: "fire",
    A5: "water",
    A6: "wind",
    A7: "light",
    A8: "dark"
  };

  const riddles = {
    A1: "Go to the place where computers are used.",
    A2: "Find where you relax between lectures.",
    A3: "Look for the parking area.",
    A4: "Go near the main office.",
    A5: "Find the lab area.",
    A6: "Look near the canteen.",
    A7: "Find the stairs.",
    A8: "Go to the library."
  };

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    if (input.toLowerCase() === answers[id]) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
      localStorage.setItem(id + "r2", "1");
    } else {
      playSound("/sounds/freesound_community-boo-6377.mp3");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Round 2</h2>

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
            <button onClick={() => router.push(`/team/${id}/round3`)}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}