import PNOsc from "components/PNOsc/PNOsc";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";

const BASE_TIME = 10;

export default function SingleChakraProgression({
  frequency,
  amplitude = -16,
  iteration = 1,
}) {
  const [isChild, setIsChild] = useState(false);

  useEffect(() => {
    const randomPanVal = Math.random() * 2 - 1;
    const autoPanner = new Tone.Panner(randomPanVal).toDestination();
    const vol = new Tone.Volume(amplitude).connect(autoPanner);
    const synth = new Tone.Synth({
      envelope: {
        attack: BASE_TIME,
        decay: BASE_TIME,
        sustain: 0.6,
        release: BASE_TIME,
      },
    }).connect(vol);
    synth.triggerAttackRelease(frequency * iteration, 31536000);

    var lfo = new Tone.LFO(Math.random(), -1, 1); // hertz, min, max
    lfo.connect(autoPanner.pan);
    lfo.start();

    const noiseMakers = [vol, synth];

    const timeoutId = setTimeout(() => {
      setIsChild(true);
    }, Math.random() * (BASE_TIME * 1000) + 10000);

    return () => {
      clearTimeout(timeoutId);
      noiseMakers.forEach((noiseMaker) => noiseMaker.dispose());
    };
  }, [amplitude, frequency, iteration]);

  return (
    <div>
      <h5>Single Chakra Progression</h5>
      <p>frequency: {frequency * iteration}</p>
      {isChild && iteration < 12 && (
        <>
          <SingleChakraProgression
            frequency={frequency}
            amplitude={amplitude - 2}
            iteration={iteration + 1}
          />
        </>
      )}
      {/* <PNOsc frequency={frequency * iteration} /> */}

      {iteration === 12 && <p>Complete</p>}
    </div>
  );
}
