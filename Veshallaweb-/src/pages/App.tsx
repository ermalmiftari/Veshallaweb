import React from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";
import ContactUs from "./ContactUs";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <ContactUs />
      </main>
    </>
  );
}
