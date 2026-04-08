import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  // Создать заказ
  async createOrder(data: {
    price: bigint;
    checkout: string;
    adress_destination: string;
    userId: number;
    phone_customer: string;
  }) {
    return this.prisma.order.create({
      data: {
        price: data.price,
        checkout: data.checkout,
        adress_destination: data.adress_destination,
        userId: data.userId,
        phone_customer: data.phone_customer,
        status: 'pending', // начальный статус
        time_order: new Date(),
      },
    });
  }

  // Найти заказ по ID
  async findOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }, // подтянет данные пользователя
    });
  }

  // Найти все заказы пользователя
  async findOrdersByUserId(userId: number) {
  const orders = await this.prisma.order.findMany({
    where: { userId },
    orderBy: { time_order: 'desc' },
  });
  
  // Всегда возвращаем массив (даже если пустой)
  return orders;

  }



  async findActiveOrders(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
        status: { notIn: ['delivered', 'cancelled'] },
      },
      orderBy: { time_order: 'desc' },
    });
  }


  // Обновить статус заказа (с проверкой владельца)
  async updateOrderStatusIfOwner(orderId: number, userId: number, status: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });
    
    if (!order) {
      throw new NotFoundException('Order not found or not yours');
    }
    
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }



  // Найти все заказы
  async findAllOrders() {
    return this.prisma.order.findMany({
      include: { user: true },
      orderBy: { time_order: 'desc' },
    });
  }

  // Обновить статус заказа
  async updateOrderStatus(orderId: number, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  // Удалить заказ
  async deleteOrder(orderId: number) {
    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}