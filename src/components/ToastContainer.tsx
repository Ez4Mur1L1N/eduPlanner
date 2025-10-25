import Toast from './Toast';
import { Toast as ToastType } from '../types';

interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: number) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
