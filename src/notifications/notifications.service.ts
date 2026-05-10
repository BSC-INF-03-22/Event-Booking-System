import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private notifications: any[] = [];
  private idCounter = 1; // ✅ FIX: proper sequential IDs

  // CREATE
  create(data: { userId: number; message: string }) {
    const notification = {
      id: this.idCounter++, // ✅ 1, 2, 3, 4...
      userId: data.userId,
      message: data.message,
      isRead: false,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    return notification;
  }

  // READ ALL
  findAll() {
    return this.notifications;
  }

  // READ ONE
  findOne(id: number) {
    const notification = this.notifications.find(n => n.id === id);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  // UPDATE
  update(id: number, data: Partial<any>) {
    const notification = this.findOne(id);
    Object.assign(notification, data);
    return notification;
  }

  // MARK AS READ
  markAsRead(id: number) {
    const notification = this.findOne(id);
    notification.isRead = true;
    return notification;
  }

  // DELETE
  remove(id: number) {
    const index = this.notifications.findIndex(n => n.id === id);

    if (index === -1) {
      throw new NotFoundException('Notification not found');
    }

    const deleted = this.notifications[index];
    this.notifications.splice(index, 1);
    return deleted;
  }
}