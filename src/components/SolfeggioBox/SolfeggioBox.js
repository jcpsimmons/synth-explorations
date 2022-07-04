import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { solfeggioFrequencies } from "../../data/solfeggioFrequencies";
import { generateOctaves } from "../../utils/frequencyModulation";

export default function SolfeggioBox() {
  useEffect(() => {
    const vol = new Tone.Volume(-22).toDestination();
    const reverb = new Tone.JCReverb(0.4).connect(vol);
    const pingPong = new Tone.PingPongDelay(1.3, 0.5).connect(reverb);
    const synth = new Tone.Synth({
      envelope: { attack: 0.5, release: 0.5 },
    }).connect(pingPong);

    const noiseMakers = [vol, reverb, pingPong, synth];

    const interval = setInterval(() => {
      const randomFrequency =
        solfeggioFrequencies[
          Math.floor(Math.random() * solfeggioFrequencies.length)
        ];
      const octaves = generateOctaves(randomFrequency, 1);
      const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
      synth.triggerAttackRelease(randomOctave, 0.7);
    }, 300);

    return () => {
      clearInterval(interval);
      noiseMakers.forEach((noiseMaker) => noiseMaker.dispose());
    };
  }, []);

  return (
    <div>
      <h1>Solfeggio Box</h1>
    </div>
  );
}
