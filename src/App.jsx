import { useState } from "react";

export default function App() {
  const chords = ["C", "G", "D", "Am", "Em", "F"];

  const [selectedChords, setSelectedChords] = useState(["C"]);
  const [currentChord, setCurrentChord] = useState("C");

  const [strumOptions, setStrumOptions] = useState({
    down: true,
    up: true,
    r: true,
  });

  const [strum, setStrum] = useState("");

  function toggleChord(chord) {
    setSelectedChords(prev =>
      prev.includes(chord)
        ? prev.filter(c => c !== chord)
        : [...prev, chord]
    );
  }

  function toggleStrum(key) {
    setStrumOptions(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function generate() {
    if (selectedChords.length === 0) {
      setCurrentChord("Seleccioná acordes");
      return;
    }

    const randomChord =
      selectedChords[Math.floor(Math.random() * selectedChords.length)];

    setCurrentChord(randomChord);

    const pool = [];
    if (strumOptions.down) pool.push("↓");
    if (strumOptions.up) pool.push("↑");
    if (strumOptions.r) pool.push("R");

    if (pool.length === 0) {
      setStrum("Seleccioná rasgueo");
      return;
    }

    const result = Array.from({ length: 6 }, () =>
      pool[Math.floor(Math.random() * pool.length)]
    );

    setStrum(result.join(" "));
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "white",
      fontFamily: "Arial",
      padding: 30,
      textAlign: "center"
    }}>

      <h1>🎸 ChordRush</h1>

      {/* ACORDES */}
      <h2>Seleccioná acordes</h2>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {chords.map(chord => (
          <button
            key={chord}
            onClick={() => toggleChord(chord)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: selectedChords.includes(chord) ? "green" : "gray",
              color: "white"
            }}
          >
            {chord}
          </button>
        ))}
      </div>

      <h1 style={{ fontSize: 60, marginTop: 20 }}>
        {currentChord}
      </h1>

      {/* RASGUEO */}
      <h2>Rasgueo</h2>

      <label><input type="checkbox" checked={strumOptions.down} onChange={() => toggleStrum("down")} /> ↓ Abajo</label>
      <br />
      <label><input type="checkbox" checked={strumOptions.up} onChange={() => toggleStrum("up")} /> ↑ Arriba</label>
      <br />
      <label><input type="checkbox" checked={strumOptions.r} onChange={() => toggleStrum("r")} /> R fuerte</label>

      <br /><br />

      <button onClick={generate}>
        Generar
      </button>

      <h2 style={{ marginTop: 20 }}>{strum}</h2>

    </div>
  );
}
