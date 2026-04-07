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
    A1: "0.5",
    A2: "0.5",
    A3: "0.5",
    A4: "0.5",
    A5: "0.5",
    A6: "0.5",
    A7: "0.5",
    A8: "0.5"
  };

  const riddles = {
    A1: "A gate for appearance, not for transit.\n Its original title belies its inactive role.\n🚂",
    A2: "A permanent fixture, more often seen than driven.\n The Civil/Mechanical Department's stationary mascot.\n🚜",
    A3: "A place of strict conduct; no rest is permitted.\n The readings are noted even before the experiment is finished.☠️",
    A4: "Naam mai chota par kaam bada;\n Khaas aapke liye LITERAL Hindi anuvaad: Choti Kendriya Sanganak suvidha",
    A5: "Oo gan kal aana",
    A6: "Once meant to roar down tracks,\nnow silent at the gates —\na journey that never moves,\nat the place where all do.",
    A7: "Find the stairs.",
    A8: "Shuruaat mein hi haath gande karaaye,\nMehnat karwaaye…\n par kuch haath na aaye."
  };

  const playSound = (path) => {
    new Audio(path).play().catch(() => { });
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