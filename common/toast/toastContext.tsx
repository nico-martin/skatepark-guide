import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from '@common/utils/classnames';
import styles from './toastContext.module.css';

const DEFAULT_TIMEOUT = 5000;

export enum TOAST_BUTTON_TYPES {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
}

interface ToastI {
  message: string;
  timeout?: number;
  controls?: Array<{
    type?: TOAST_BUTTON_TYPES;
    text?: string;
    onClick?: ({ remove: Function }) => void;
  }>;
}

interface ToastEnrichedI extends ToastI {
  id: string;
  className?: string;
}

const Context = React.createContext<{
  addToast: (toast: ToastI) => void;
}>({ addToast: () => {} });

export const ToastProvider = ({ children }: { children: any }) => {
  const [toasts, setToasts] = React.useState<Array<ToastEnrichedI>>([]);

  const updateClassName = (id: string, className: string) =>
    setToasts((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, className } : toast))
    );

  const removeToast = (id: string) => {
    updateClassName(id, styles.toastFadeOut);

    window.setTimeout(
      () => setToasts(toasts.filter((toast) => toast.id !== id)),
      400
    );
  };

  const addToast = (toast: ToastI) => {
    const id = uuidv4();
    setToasts([
      ...toasts,
      {
        id,
        ...toast,
      },
    ]);
    window.setTimeout(() => updateClassName(id, styles.toastFadeIn), 100);
    window.setTimeout(() => removeToast(id), toast.timeout || DEFAULT_TIMEOUT);
  };

  return (
    <Context.Provider value={{ addToast }}>
      {children}
      <div className={styles.root}>
        {Boolean(toasts) &&
          toasts.map((toast) => (
            <div
              className={cn(styles.toast, {
                [toast.className]: Boolean(toast.className),
              })}
              key={toast.id}
            >
              <p className={styles.message}>{toast.message}</p>
              {Boolean(toast.controls) && (
                <div className={cn(styles.controls)}>
                  {toast.controls.map((button) => (
                    <button
                      onClick={() =>
                        button.onClick
                          ? button.onClick({
                              remove: () => removeToast(toast.id),
                            })
                          : removeToast(toast.id)
                      }
                      className={cn(
                        styles.button,
                        styles[
                          `button-${
                            button.type || Object.values(TOAST_BUTTON_TYPES)[0]
                          }`
                        ]
                      )}
                    >
                      {button.text || 'ok'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </Context.Provider>
  );
};

export const useToast = () => {
  const { addToast } = React.useContext(Context);
  return { addToast };
};
