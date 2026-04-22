import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private notifications: any[] = [];

  // ✅ FIXED: accept DTO-style object
  create(data: { userId: number; message: string }) {
    const notification = {
      id: Date.now(),
      userId: data.userId,
      message: data.message,
      isRead: false,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    return notification;
  }

  findAll() {
    return this.notifications;
  }

  // (OPTIONAL BUT USEFUL) mark as read
  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
    return notification;
  }
}