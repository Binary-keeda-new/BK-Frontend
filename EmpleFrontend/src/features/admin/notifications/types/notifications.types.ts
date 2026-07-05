export type NotificationType = 'info' | 'warning' | 'success' | 'alert';

export interface Notification {
  _id: string;
  id?: string;
  title: string;
  message: string;
  type: NotificationType;
  isLive: boolean;
  createdAt?: string;
}

export interface NotificationFormData {
  title: string;
  message: string;
  type: NotificationType;
  isLive: boolean;
}