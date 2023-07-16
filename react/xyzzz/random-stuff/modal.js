import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useState } from "react";

export function Modal() {
  const [openModal, setOpenModal] = useState("none");

  return (
    <div>
      <h3>Modal Popup</h3>
      <button onClick={() => setOpenModal("login")}>Login</button>
      <button onClick={() => setOpenModal("register")}>Register</button>
      <Dialog
        style={{ backgroundColor: "gray" }}
        isOpen={openModal === "login"}
      >
        <h1>Login</h1>
        <button onClick={() => setOpenModal("none")}>Close</button>
      </Dialog>
      <Dialog
        style={{ backgroundColor: "gray" }}
        isOpen={openModal === "register"}
      >
        <h1>Register</h1>
        <button onClick={() => setOpenModal("none")}>Close</button>
      </Dialog>
    </div>
  );
}
