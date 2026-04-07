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
    A1: "0.2",
    A2: "0.2",
    A3: "0.2",
    A4: "0.2",
    A5: "0.2",
    A6: "0.2",
    A7: "0.2",
    A8: "0.2"
  };

  const riddles = {
    A1: "Kya Veeru Paaji apni premika ko 'kutto ko saamne nachne denge??' Jaanane ke liye iss 'point' pe aao!",
    A2: "Naam se chai ka level high lagta hai…\nReality thodi mid hai 😭\nPar peeche jo bada tank dikhta hai — wahi asli hint hai.”",
    A3: "MLSC ka phele interaction yahi hua tha. (Interaction kahe ya Interrogation?😉)",
    A4: "Koi chota celebration ho ya life ka naya chapter, \nyaha aane ke baad muh pe naya flavour,\n kapdo pe rang aur dher sari memories banti hai",
    A5: "Sarkari khaana hai janab,\n der se hi aayega!🤗",
    A6: "No stadium, no sunlight —\nstill, the rallies never stop.",
    A7: "Tempted to enter the big hall?\nResist. Your location is right in front it.",
    A8: "Before the pressure of the final test,\nthe last refuge for minds seeking rest.\n🐘🛐"
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
            <p style={{ whiteSpace: "pre-line" }}>{riddles[id]}</p>
            <button onClick={() => router.push(`/team/${id}/round2`)}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}
