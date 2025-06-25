import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateOrderDto) {
    const { products, ...orderData } = data;

    return this.prisma.order.create({
      data: {
        ...orderData,
        user: { connect: { id: userId } },
        products: {
          create: products.map((p) => ({
            product: { connect: { id: p.productId } },
            variant: { connect: { id: p.variantId } },
            quantity: p.quantity,
          })),
        },
      },
      include: { products: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    const { userId, products, ...orderData } = data;

    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        ...(userId && { user: { connect: { id: userId } } }),
        ...(products && {
          products: {
            deleteMany: {}, // usuwa wszystkie stare
            create: products.map((p) => ({
              product: { connect: { id: p.productId } },
              variant: { connect: { id: p.variantId } },
              quantity: p.quantity,
            })),
          },
        }),
      },
      include: { products: true },
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
