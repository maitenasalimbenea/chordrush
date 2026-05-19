
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [input, setInput] = useState("G,C,D,Em");
  const [chords, setChords] = useState(["G", "C", "D", "Em"]);
  const [bpm, setBpm] = useState(80);
  const [beats, setBeats] = useState(2);
  const [pattern, setPattern] = useState("↓↑↓↑");
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState("G");
  const [count, setCount] = useState(0);

  const timer = useRef(null);

  const presets = {
    Basicos: "G,C,D,Em",
    Rock: "A,E,F#m,D",
    Folk: "C,G,Am,F",
    Speed: "Dm,G,C,Am",
  };

  const parsed = useMemo(
    () => input.split(",").map((s) => s.trim()).filter(Boolean),
    [input]
  );

  const beep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.value = 880;

      osc.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.value = 0.03;

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  const nextChord = () => {
    const pick = chords[Math.floor(Math.random() * chords.length)];
    setCurrent(pick);
    beep();
  };

  useEffect(() => {
    if (running) {
      setCount(3);

      let c = 3;
      const countdown = setInterval(() => {
        c -= 1;
        setCount(c);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdown);

        nextChord();

        const ms = (60000 / bpm) * beats;

        timer.current = setInterval(() => {
          nextChord();
        }, ms);
      }, 3000);
    }

    return () => clearInterval(timer.current);
  }, [running, bpm, beats, chords]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background:
          "linear-gradient(135deg,#050505,#101010,#1b1b1b)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, marginBottom: 0 }}>ChordRush</h1>
        <p style={{ color: "#999" }}>
          Entrenador de acordes inspirado en estudios musicales.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {Object.entries(presets).map(([k, v]) => (
            <button
              key={k}
              onClick={() => {
                setInput(v);
                setChords(v.split(","));
              }}
              style={{
                background: "#222",
                color: "white",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              {k}
            </button>
          ))}
        </div>

        <div
          style={{
            background: "#111",
            padding: 20,
            borderRadius: 24,
            marginBottom: 20,
          }}
        >
          <p>Acordes</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              background: "#1d1d1d",
              color: "white",
              marginBottom: 12,
            }}
          />

          <button
            onClick={() => setChords(parsed)}
            style={{
              background: "white",
              color: "black",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            Guardar acordes
          </button>

          <div style={{ marginTop: 20 }}>
            <p>BPM: {bpm}</p>
            <input
              type="range"
              min="40"
              max="220"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <p>Cambiar cada {beats} tiempos</p>
            <input
              type="range"
              min="1"
              max="8"
              value={beats}
              onChange={(e) => setBeats(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <p>Rasgueo</p>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              style={{
                width: "100%",
                padding: 14,
                background: "#1d1d1d",
                color: "white",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
            <button
              onClick={() => setRunning(true)}
              style={{
                background: "white",
                color: "black",
                padding: "14px",
                cursor: "pointer",
              }}
            >
              Empezar
            </button>

            <button
              onClick={() => {
                setRunning(false);
                clearInterval(timer.current);
              }}
              style={{
                background: "#222",
                color: "white",
                padding: "14px",
                cursor: "pointer",
              }}
            >
              Detener
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#111",
            borderRadius: 24,
            padding: 50,
            textAlign: "center",
          }}
        >
          {count > 0 ? (
            <div style={{ fontSize: 120, color: "#666", fontWeight: "bold" }}>
              {count}
            </div>
          ) : (
            <div style={{ fontSize: 120, fontWeight: "bold" }}>{current}</div>
          )}

          <div style={{ fontSize: 40 }}>{pattern}</div>

          <p style={{ color: "#888" }}>Tempo {bpm} BPM</p>
        </div>
      </div>
    </div>
  );
}
