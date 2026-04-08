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
    if (!localStorage.getItem(id + "r1")) {
      router.push(`/team/${id}/round1`);
    }
  }, [id, router]);

  const answers = {
    A1: "250",
    A2: "250",
    A3: "250",
    A4: "250",
    A5: "250",
    A6: "250",
    A7: "250",
    A8: "250",
  };

  const riddles = {
    A1: "A gate for appearance, not for transit. Its original title belies its inactive role.",
    A2: "A permanent fixture, more often seen than driven. The Civil/Mechanical Department's stationary mascot.\n🚜",
    A3: "A place of strict conduct; no rest is permitted. The readings are noted even before the experiment is finished.",
    A4: "Naam mein chhota par kaam bada;\n Khas aapke liye literal Hindi anuvaad: Choti Kendriya Sanganak Suvidha.",
    A5: "Oo gan, kal aana.",
    A6: "Once meant to roar down tracks, now silent at the gates. A journey that never moves, at the place where all do.",
    A7: "Not the main one, but where most stories are made. Assignments can wait, chai cannot. Step away from the front and you will find it where the college ends.",
    A8: "Shuruaat mein hi haath gande karaye, mehnat karvaye, par kuchh haath na aaye.",
  };

  const playSound = (path) => {
    new Audio(path).play().catch(() => {});
  };

  const submit = () => {
    const normalizedInput = input.trim().toLowerCase();
    if (normalizedInput === answers[id]) {
      playSound("/sounds/tunetank-winner-awards-logo-484333.mp3");
      setIsCorrect(true);
      localStorage.setItem(id + "r2", "1");
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
        <h2>Round 2</h2>

        {!isCorrect && (
          <>
            <p>Enter your answer:</p>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={submit}>Submit</button>
          </>
        )}

        {isCorrect && (
          <>
            <h3>Next Location</h3>
            <p style={{ whiteSpace: "pre-line" }}>{riddles[id]}</p>
            <button onClick={() => router.push(`/team/${id}/round3`)}>Next</button>
          </>
        )}
      </div>
    </div>
  );
}
