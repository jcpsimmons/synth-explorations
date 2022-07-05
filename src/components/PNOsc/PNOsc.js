import React, { useEffect } from "react";
import * as Tone from "tone";

export default function PNOsc({ frequency }) {
  useEffect(() => {
    const vol = new Tone.Volume(12).toDestination();
    const filter = new Tone.BiquadFilter({
      frequency,
      type: "bandpass",
      Q: 500,
      gain: 100,
    }).connect(vol);
    new Tone.Noise("pink").connect(filter).start();
  }, []);
  return <div>pn freq: {frequency}</div>;
}
