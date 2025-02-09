import { Alert } from 'bootstrap-react-logic';
import { useCallback, useMemo, useState } from 'react';

type AlertType = 'danger' | 'info' | 'success';

export const useAlert = () => {
  const [alertState, setAlertState] = useState<{
    message: string;
    type: AlertType;
    visible: boolean;
  }>({ message: '', type: 'info', visible: false });

  const showAlert = useCallback((message: string, type: AlertType) => {
    setAlertState({ message, type, visible: true });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  }, []);

  const AlertComponent = useMemo(
    () =>
      alertState.visible && (
        <Alert
          className="mt-4"
          dismissible
          onVisibleChange={hideAlert}
          variant={alertState.type}
          visible={alertState.visible}
        >
          {alertState.message}
        </Alert>
      ),
    [alertState, hideAlert],
  );

  return { AlertComponent, showAlert };
};
