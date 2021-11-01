import React from "react";
import { Wrapper } from "../styles/Wrapper";

import { ReactComponent as AboveWave } from "../Assets/wave/wave001.svg";
import { ReactComponent as BelowWave } from "../Assets/wave/wave002.svg";

const Index: React.VFC = () => {
  return (
    <Wrapper>
      <AboveWave />
      <h1 style={{ textAlign: "center" }}>Teelog</h1>
      <div>
        <BelowWave />
      </div>
    </Wrapper>
  );
};

export default Index;
