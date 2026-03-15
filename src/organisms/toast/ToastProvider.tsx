import { Toaster, ToasterProps } from 'react-hot-toast';

export function ToastProvider({ position = 'bottom-right', reverseOrder = false, children, ...other }: ToasterProps) {
  return (
    <Toaster position={position} reverseOrder={reverseOrder} {...other}>
      {children}
    </Toaster>
  );
}
