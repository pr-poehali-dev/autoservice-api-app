const API_BASE_URL = 'https://functions.poehali.dev';

interface NotificationSettings {
  readyNotifications: boolean;
  progressNotifications: boolean;
  reminderNotifications: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface Notification {
  id: number;
  type: 'ready' | 'in_progress' | 'reminder';
  title: string;
  message: string;
  time: string;
  timestamp: string;
  carModel?: string;
  isRead: boolean;
}

export const notificationsApi = {
  async getNotifications(userId: string = 'user_1'): Promise<Notification[]> {
    const response = await fetch(`${API_BASE_URL}/0c4c6e5c-75a7-4ed4-b072-76f0ad0be95d`, {
      method: 'GET',
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return data.notifications || [];
  },

  async markAsRead(notificationId: number, userId: string = 'user_1'): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/0c4c6e5c-75a7-4ed4-b072-76f0ad0be95d`, {
      method: 'POST',
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'mark_read',
        notification_id: notificationId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
  },

  async deleteNotification(notificationId: number, userId: string = 'user_1'): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/0c4c6e5c-75a7-4ed4-b072-76f0ad0be95d?id=${notificationId}`,
      {
        method: 'DELETE',
        headers: {
          'X-User-Id': userId,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }
  },

  async updateSettings(
    settings: NotificationSettings,
    userId: string = 'user_1'
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/0c4c6e5c-75a7-4ed4-b072-76f0ad0be95d`, {
      method: 'POST',
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'update_settings',
        settings
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update notification settings');
    }
  },

  async sendNotification(
    notification: {
      type: string;
      title: string;
      message: string;
      carModel?: string;
      push_enabled: boolean;
      sms_enabled: boolean;
      email_enabled: boolean;
    },
    userId: string = 'user_1'
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/0c4c6e5c-75a7-4ed4-b072-76f0ad0be95d`, {
      method: 'POST',
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'send_notification',
        notification
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }
  }
};
