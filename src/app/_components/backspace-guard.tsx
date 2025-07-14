"use client";

import { useEffect } from "react";

export function BackspaceGuard() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent backspace from navigating back in browser
      // Only prevent if not in an input field, textarea, or contenteditable element
      if (event.key === "Backspace") {
        const target = event.target as HTMLElement;
        const isInputField = 
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.contentEditable === "true";
        
        if (!isInputField) {
          event.preventDefault();
        }
      }
    };

    // Add listener to document to catch all events
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null; // This component doesn't render anything
}