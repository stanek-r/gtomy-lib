import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@/components/atoms/Icon/Icon';
import { SvgIconType } from '@/models/svg.model';

export function ToastProvider() {
  return <Toaster position="bottom-right" reverseOrder={false} />;
}

export interface ShowToastSettings {
  message: string;
  duration?: number;
  icon?: SvgIconType;
  iconColor?:
    | 'inherit'
    | 'base'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

export function showToast({ message, duration, icon, iconColor = 'base' }: ShowToastSettings) {
  return toast(message, {
    icon: <Icon icon={icon} color={iconColor} content={false} className="mr-1.5" />,
    duration,
  });
}
