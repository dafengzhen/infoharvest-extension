import type { KeyboardEvent } from 'react';

import { Button, Input } from 'bootstrap-react-logic';

interface UrlFormProps {
  onDelete: () => void;
  onSave: () => void;
  onUrlChange: (value: string) => void;
  url: string;
}

export const UrlForm = ({ onDelete, onSave, onUrlChange, url }: UrlFormProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave();
    } else if (event.key === 'Escape') {
      onDelete();
    }
  };

  return (
    <div className="hstack gap-2">
      <Input
        aria-label="New tab URL"
        onChange={(e) => onUrlChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter the URL"
        type="text"
        value={url}
      />
      <Button aria-label="Save URL" onClick={onSave} type="button" variant="primary">
        <i className="bi bi-check-lg" />
      </Button>
      <Button aria-label="Delete URL" onClick={onDelete} type="button" variant="danger">
        <i className="bi bi-trash" />
      </Button>
    </div>
  );
};
