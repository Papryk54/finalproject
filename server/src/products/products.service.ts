import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

interface VariantInput {
  label: string;
  price: number;
}

interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  imageUrls?: string[];
  existingImageIds?: string[];
  variants?: VariantInput[];
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    price: number;
    imageUrls: string[];
    variants?: VariantInput[];
  }) {
    return this.prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        images: {
          create: data.imageUrls.map((url) => ({ url })),
        },
        variants: data.variants
          ? {
              create: data.variants.map((v) => ({
                label: v.label,
                price: v.price,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        variants: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { images: true, variants: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { images: true, variants: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    const {
      title,
      description,
      price,
      imageUrls,
      existingImageIds = [],
      variants,
    } = data;

    let parsedPrice: number | undefined = undefined;

    if (price !== undefined) {
      parsedPrice = parseFloat(price as any);
      if (isNaN(parsedPrice)) {
        throw new BadRequestException('Invalid price format');
      }
    }

    const updateData: any = {
      ...(title && { title }),
      ...(description && { description }),
      ...(parsedPrice !== undefined && { price: parsedPrice }),
    };

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateData,
    });

    if (imageUrls) {
      await this.prisma.productImage.deleteMany({
        where: {
          productId: id,
          NOT: { id: { in: existingImageIds } },
        },
      });

      const existingImages = await this.prisma.productImage.findMany({
        where: { id: { in: existingImageIds } },
        select: { url: true },
      });

      const existingUrls = existingImages.map((img) => img.url);
      const newUrls = imageUrls.filter((url) => !existingUrls.includes(url));

      if (newUrls.length > 0) {
        await this.prisma.productImage.createMany({
          data: newUrls.map((url) => ({ productId: id, url })),
        });
      }
    }

    if (variants) {
      await this.prisma.productVariant.deleteMany({ where: { productId: id } });

      await this.prisma.productVariant.createMany({
        data: variants.map((v) => {
          const parsedVariantPrice = parseFloat(v.price as any);
          if (isNaN(parsedVariantPrice)) {
            throw new BadRequestException(
              `Invalid variant price for label "${v.label}"`,
            );
          }
          return {
            productId: id,
            label: v.label,
            price: parsedVariantPrice,
          };
        }),
      });

      const minPrice = Math.min(...variants.map((v) => parseFloat(v.price as any)));
      if (!isNaN(minPrice)) {
        await this.prisma.product.update({
          where: { id },
          data: { price: minPrice },
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.prisma.productImage.deleteMany({ where: { productId: id } });
    await this.prisma.productVariant.deleteMany({ where: { productId: id } });
    return this.prisma.product.delete({ where: { id } });
  }
}
