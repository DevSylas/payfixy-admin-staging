import { useState, useCallback } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
    } catch (err) {
      setIsCopied(false);
      setError("Failed to copy");
    }

    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  return { copyToClipboard, isCopied, error };
};

export default useCopyToClipboard;
