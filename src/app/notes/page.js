"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Notes from '@/components/Notes';
import Navbar from '@/components/Navbar';

export default function NotesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for a username in localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <Notes />
      </main>
    </>
  );
}
