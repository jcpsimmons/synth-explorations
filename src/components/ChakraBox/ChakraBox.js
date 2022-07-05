import { chakraFrequencies } from "data/chakraFrequencies";
import React from "react";
import SingleChakraProgression from "./SingleChakraProgression";

export default function ChakraBox() {
  return (
    <div>
      <h1>Chakra Box (single)</h1>
      <div>
        {/* root + 3rd eye sound super good */}
        <SingleChakraProgression frequency={chakraFrequencies.thirdEye / 4} />
        <SingleChakraProgression frequency={chakraFrequencies.root / 4} />
        {/* <SingleChakraProgression frequency={chakraFrequencies.crown / 4} /> */}
      </div>
    </div>
  );
}
