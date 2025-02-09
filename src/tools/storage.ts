/* eslint-disable @typescript-eslint/no-explicit-any */

const isChromeStorageAvailable = () => Boolean(chrome?.storage?.sync);

export const getStorage = async <T = string>(key: string): Promise<null | T> => {
  try {
    if (isChromeStorageAvailable()) {
      return new Promise<null | T>((resolve, reject) => {
        chrome.storage.sync.get(key, (data) => {
          if ((chrome.runtime as any).lastError) {
            reject((chrome.runtime as any).lastError);
            return;
          }
          const value = data[key];
          try {
            resolve(value ? JSON.parse(value) : null);
          } catch {
            resolve(value);
          }
        });
      });
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Storage read error:', error);
    return null;
  }
};

export const saveStorage = async (key: string, value: unknown): Promise<void> => {
  try {
    const serialized = JSON.stringify(value);
    if (isChromeStorageAvailable()) {
      await new Promise<void>((resolve, reject) => {
        chrome.storage.sync.set({ [key]: serialized }, () => {
          if ((chrome.runtime as any).lastError) {
            reject((chrome.runtime as any).lastError);
          } else {
            resolve();
          }
        });
      });
    } else {
      localStorage.setItem(key, serialized);
    }
  } catch (error) {
    console.error('Storage save error:', error);
    throw error;
  }
};

export const removeStorage = async (key: string): Promise<void> => {
  try {
    if (isChromeStorageAvailable()) {
      await new Promise<void>((resolve, reject) => {
        chrome.storage.sync.remove(key, () => {
          if ((chrome.runtime as any).lastError) {
            reject((chrome.runtime as any).lastError);
          } else {
            resolve();
          }
        });
      });
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('Storage remove error:', error);
    throw error;
  }
};
