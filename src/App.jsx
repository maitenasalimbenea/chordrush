import { useState } from "react";

export default function App() {
  const [chord, setChord] = useState("C");
  const [showImg, setShowImg] = useState(true);
  const [strum, setStrum] = useState("");

  const [opts, setOpts] = useState({
    down: true,
    up: true,
    r: true,
  });

  function toggle(key) {
    setOpts({ ...opts, [key]: !opts[key] });
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

    const length = 6;
    const result = [];

    for (let i = 0; i < length; i++) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      result.push(pick);
    }

    setStrum(result.join(" "));
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial", color: "white", background: "#0a0a0a", minHeight: "100vh" }}>

      <h1>🎸 ChordRush</h1>

      {/* ACORDE */}
      <h2>Acorde</h2>

      <select value={chord} onChange={(e) => setChord(e.target.value)}>
        <option value="C">C</option>
        <option value="G">G</option>
        <option value="D">D</option>
        <option value="Am">Am</option>
      </select>

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={showImg}
          onChange={() => setShowImg(!showImg)}
        />
        Mostrar imagen del acorde
      </label>

      <div style={{ marginTop: 15 }}>
        {showImg ? (
          <img
            src={`/chords/${chord}.jpg`}
            alt={chord}
            width="180"
            style={{ borderRadius: 12 }}
          />
        ) : (
          <h1>{chord}</h1>
        )}
      </div>

      {/* RASGUEO */}
      <h2 style={{ marginTop: 30 }}>Rasgueo</h2>

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

      <button
        onClick={generateStrum}
        style={{
          padding: "10px 15px",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        Generar rasgueo
      </button>

      <h2 style={{ marginTop: 20 }}>{strum}</h2>

    </div>
  );
}
