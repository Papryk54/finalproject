import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const { userId, products, ...orderData } = data;

    return this.prisma.order.create({
      data: {
        ...orderData,
        ...(userId && { user: { connect: { id: userId } } }),
        products: {
          create: products.map((p) => ({
            product: { connect: { id: p.productId } },
            quantity: p.quantity,
            note: p.note,
          })),
        },
      },
      include: { products: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { products: true } });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { products: true },
    });
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
            deleteMany: {},
            create: products.map((p) => ({
              product: { connect: { id: p.productId } },
              quantity: p.quantity,
              note: p.note,
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
