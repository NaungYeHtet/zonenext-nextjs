"use client";

import { useState } from "react";
import Modal from "../modal";
import TranslateText from "../translate-text";

export default function LoginForm() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
        aria-label={"Login"}
        onClick={() => setModalOpen(true)}
      >
        <TranslateText>general:login</TranslateText>
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold">Login</h2>
      </Modal>
    </>
  );
}
