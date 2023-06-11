import React from "react";
import { Cue } from "./Cue";
import { Footer } from "./Footer";
import { NavBar } from "./Header";
import { ImageHeader } from "./ImageHeader";

export const Dash = () => {
  return (
    <>
      <NavBar />
      <ImageHeader />
      <Cue />
      <Footer />
    </>
  );
};
