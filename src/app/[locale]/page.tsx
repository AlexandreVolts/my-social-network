"use client";

import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Home() {
  const t = useTranslations('Index');
  const [onLoginPage, setOnLoginPage] = useState(false);

  return (
    <main className="flex min-h-screen justify-between p-24">
      <div className="basis-0 grow">
        <h2 className="text-4xl">My social network</h2>
      </div>
      <div className="basis-0 grow">
        {onLoginPage?
        <LoginForm onSubmit={() => { }} onSwitch={()=>setOnLoginPage(false)}/>:
        <RegisterForm onSubmit={() => { }} onSwitch={()=>setOnLoginPage(true)}/>}
      </div>
    </main>
  )
}
