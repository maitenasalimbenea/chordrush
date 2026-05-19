import { useState } from "react";

export default function App() {
  const [chord, setChord] = useState("C");
  const [strum, setStrum] = useState("");

  const [opts, setOpts] = useState({
    down: true,
    up: true,
    r: true,
  });

  function toggle(key) {
    setOpts(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function generateStrum() {
    const pool = [];
    if (opts.down) pool.push("↓");
    if (opts.up) pool.push("↑");
    if (opts.r) pool.push("R");

    if (pool.length === 0) {
      setStrum("Seleccioná al menos una opción");
      return;
    }

    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(pool[Math.floor(Math.random() * pool.length)]);
    }

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

      {/* ACORDE */}
      <h2>Acorde</h2>

      <select value={chord} onChange={(e) => setChord(e.target.value)}>
        <option value="C">C</option>
        <option value="G">G</option>
        <option value="D">D</option>
        <option value="Am">Am</option>
      </select>

      <h1 style={{ fontSize: 70 }}>{chord}</h1>

      {/* RASGUEO */}
      <h2>Rasgueo</h2>

      <label>
        <input
          type="checkbox"
          checked={opts.down}
          onChange={() => toggle("down")}
        />
        ↓ Abajo
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={opts.up}
          onChange={() => toggle("up")}
        />
        ↑ Arriba
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={opts.r}
          onChange={() => toggle("r")}
        />
        R Fuerte
      </label>

      <br /><br />

      <button onClick={generateStrum}>
        Generar rasgueo
      </button>

      <h2 style={{ marginTop: 20, fontSize: 30 }}>
        {strum}
      </h2>

    </div>
  );
}
