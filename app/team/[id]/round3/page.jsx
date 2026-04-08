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
    if (!id) return;
    if (!localStorage.getItem(id + "r2")) {
      router.push(`/team/${id}/round2`);
    }
  }, [id, router]);

  const answers = {
    A1: "18J",
    A2: "18J",
    A3: "18J",
    A4: "18J",
    A5: "18J",
    A6: "18J",
    A7: "18J",
    A8: "18J",
  };

  const finalRiddle =
    "Where silence speaks the loudest,\nclimb toward the doors of knowledge but do not enter.\nNot ahead, not behind;\nlook where the unnoticed waits in color.";

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    const normalizedInput = input.trim().toLowerCase();
    const normalizedAnswer = String(answers[id] || "").trim().toLowerCase();
    if (normalizedInput === normalizedAnswer) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
    } else {
      playSound("/sounds/freesound_community-boo-6377.mp3");
    }
  };

  if (!answers[id]) {
    return (
      <div className="center">
        <div className="card">
          <h2>Invalid Team</h2>
          <p>Please go back and select a valid team ID.</p>
          <button onClick={() => router.push("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div className="card">
        <h2>Final Round</h2>

        {!isCorrect && (
          <>
            <p>Enter your answer:</p>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}

        {isCorrect && (
          <>
            <h3>Final Clue</h3>
            <p style={{ whiteSpace: "pre-line" }}>{finalRiddle}</p>
            <h2>You won the Treasure Hunt!</h2>
          </>
        )}
      </div>
    </div>
  );
}
