import { Card, Label } from 'bootstrap-react-logic';
import { useCallback, useEffect, useState } from 'react';

import About from '../components/about.tsx';
import { UrlForm } from '../components/url-form.tsx';
import { NEW_TAB_URL } from '../constants.ts';
import { useAlert } from '../hooks/use-alert.tsx';
import { getStorage, removeStorage, saveStorage } from '../tools/storage.ts';

const isValidUrl = (input: string) => {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
};

export default function Options() {
  const [url, setUrl] = useState<string>('');
  const { AlertComponent, showAlert } = useAlert();

  useEffect(() => {
    const initializeUrl = async () => {
      try {
        const savedUrl = await getStorage<string>(NEW_TAB_URL);
        setUrl(savedUrl || '');
      } catch (error) {
        console.error(error);
        showAlert('Failed to load saved URL', 'danger');
      }
    };
    void initializeUrl();
  }, [showAlert]);

  const handleSave = useCallback(async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl || !isValidUrl(trimmedUrl)) {
      showAlert('Please enter a valid URL', 'danger');
      return;
    }

    try {
      await saveStorage(NEW_TAB_URL, trimmedUrl);
      showAlert('URL saved successfully!', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Failed to save URL', 'danger');
    }
  }, [url, showAlert]);

  const handleDelete = useCallback(async () => {
    try {
      await removeStorage(NEW_TAB_URL);
      setUrl('');
      showAlert('URL reset to default', 'info');
    } catch (error) {
      console.error(error);
      showAlert('Failed to reset URL', 'danger');
    }
  }, [showAlert]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <Card cardBody className="bg-body-tertiary border shadow-sm">
          <Label className="text-secondary mb-3 fs-5">New Tab URL Settings</Label>
          <UrlForm onDelete={handleDelete} onSave={handleSave} onUrlChange={setUrl} url={url} />
          {AlertComponent}
          <About />
        </Card>
      </div>
    </div>
  );
}
