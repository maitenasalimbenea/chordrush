import { useState } from "react";

export default function App() {
  const chordsList = ["C", "G", "D", "Am", "Em", "F"];

  const [activeChords, setActiveChords] = useState(["C"]);
  const [currentChord, setCurrentChord] = useState("C");

  const [strum, setStrum] = useState("");

  const [opts, setOpts] = useState({
    down: true,
    up: true,
    r: true,
  });

  function toggleChord(chord) {
    setActiveChords(prev =>
      prev.includes(chord)
        ? prev.filter(c => c !== chord)
        : [...prev, chord]
    );
  }

  function toggleStrum(key) {
    setOpts(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function generate() {
    // elegir acorde aleatorio de los seleccionados
    const randomChord =
      activeChords[Math.floor(Math.random() * activeChords.length)];

    setCurrentChord(randomChord);

    // rasgueo
    const pool = [];
    if (opts.down) pool.push("↓");
    if (opts.up) pool.push("↑");
    if (opts.r) pool.push("R");

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

      {/* ACORDES MULTI-SELECCIÓN */}
      <h2>Acordes (seleccioná varios)</h2>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {chordsList.map(chord => (
          <button
            key={chord}
            onClick={() => toggleChord(chord)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: activeChords.includes(chord) ? "green" : "gray",
              color: "white",
              cursor: "pointer"
            }}
          >
            {chord}
          </button>
        ))}
      </div>

      <h1 style={{ fontSize: 70, marginTop: 20 }}>
        {currentChord}
      </h1>

      {/* RASGUEO */}
      <h2>Rasgueo</h2>

      <label>
        <input type="checkbox" checked={opts.down} onChange={() => toggleStrum("down")} />
        ↓ Abajo
      </label>

      <br />

      <label>
        <input type="checkbox" checked={opts.up} onChange={() => toggleStrum("up")} />
        ↑ Arriba
      </label>

      <br />

      <label>
        <input type="checkbox" checked={opts.r} onChange={() => toggleStrum("r")} />
        R Fuerte
      </label>

      <br /><br />

      <button onClick={generate}>
        Generar
      </button>

      <h2 style={{ marginTop: 20 }}>
        {strum}
      </h2>

    </div>
  );
}
