import { useEffect, useState } from 'react';

import { NEW_TAB_URL } from '../constants.ts';
import { getStorage } from '../tools/storage.ts';

export default function NewTab() {
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    let isUnmounted = false;
    let timeoutId: number | undefined;

    const safeSetMessage = (msg: string) => {
      if (!isUnmounted) {
        setMessage(msg);
      }
    };

    async function initialize() {
      if (!chrome?.runtime) {
        safeSetMessage('Error: chrome.runtime is not available.');
        return;
      }

      try {
        const newTabUrl = await getStorage(NEW_TAB_URL);
        if (newTabUrl) {
          window.location.href = newTabUrl;
          return;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        safeSetMessage(`Error reading storage: ${errorMessage}`);
        return;
      }

      safeSetMessage('Please wait, opening the settings page...');
      timeoutId = window.setTimeout(async () => {
        try {
          if (chrome.runtime.openOptionsPage) {
            await chrome.runtime.openOptionsPage();
          } else {
            window.location.href = `../../options.html`;
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          safeSetMessage(`Error opening options page: ${errorMessage}`);
        }
      }, 1000);
    }

    void initialize();

    return () => {
      isUnmounted = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return message && <p className="lead p-2 text-secondary">{message}</p>;
}
