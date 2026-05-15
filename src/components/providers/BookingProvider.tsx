"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PopupModal } from "react-calendly";

interface BookingContextType {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      {mounted && isOpen && (
        <PopupModal
          url="https://calendly.com/adityabharti"
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={document.body}
        />
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}
