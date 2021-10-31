import React from "react";
import { styled } from "@mui/system";
import ButtonAppBar from './AppBar'
import Footer from './Footer'

const CContainer = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
});

type CProps = {
  children: React.ReactNode;
};

export const Container: React.VFC<CProps> = ({ children }) => {
  return <CContainer>{children}</CContainer>;
};


export const Wrapper: React.VFC<CProps> = ({ children }) => {
  return (
    <CContainer>
      <ButtonAppBar />
      {children}
      <Footer />
    </CContainer>
  );
};
