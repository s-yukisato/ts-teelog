import React from "react";
import { Wrapper } from "../styles/Wrapper";

import { ReactComponent as AboveWave } from "../Assets/wave/wave001.svg";

const Index: React.VFC = () => {
  return (
    <Wrapper>
      <AboveWave />
      <h1 style={{ textAlign: "center" }}>Teelog</h1>

    </Wrapper>
  );
};

export default Index;
