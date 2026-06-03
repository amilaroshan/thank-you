"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://embed.typeform.com/next/embed.js";

declare global {
  interface Window {
    tf?: { load: () => void };
  }
}

type Props = {
  formId: string;
  className?: string;
};

export function TypeformEmbed({ formId, className }: Props) {
  useEffect(() => {
    // If the embed script is already on the page (e.g. after client-side
    // navigation), it won't re-scan the DOM on its own — so ask it to.
    if (window.tf) {
      window.tf.load();
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div data-tf-live={formId} className={className} />;
}
