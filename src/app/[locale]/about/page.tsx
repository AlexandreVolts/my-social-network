"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";

export default function About() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between p-24">
        <Modal opened={opened} closeOnClickOutside title="Modal" onClose={()=>setOpened(false)}>
          <RegisterForm onSubmit={()=>setOpened(false)} onSwitch={()=>{}} />
        </Modal>
        <Button  label="open modal" onClick={()=>setOpened(true)}/>
      </main>
      <Footer />
    </>
  )
}