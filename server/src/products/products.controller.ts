import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() body: CreateProductDto & { variants: string },
  ) {
    let variants;
    try {
      variants = JSON.parse(body.variants);
    } catch {
      throw new BadRequestException('Invalid variants format.');
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      throw new BadRequestException('At least one variant is required.');
    }

    const prices = variants.map((v) => parseFloat(v.price));
    const lowestPrice = Math.min(...prices);

    if (!isFinite(lowestPrice)) {
      throw new BadRequestException('Invalid variant prices.');
    }

    return this.productService.create({
      title: body.title,
      description: body.description,
      price: lowestPrice,
      imageUrls: images.map((img) => `/uploads/${img.filename}`),
      variants: variants.map((v) => ({
        label: v.label,
        price: parseFloat(v.price),
      })),
    });
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body()
    body: UpdateProductDto & { existingImageIds?: string; variants: string },
  ) {
    let existingImageIds: string[] = [];
    let variants = [];
    try {
      existingImageIds = JSON.parse(body.existingImageIds || '[]');
      variants = JSON.parse(body.variants);
    } catch {}

    const imageUrls = images.map((img) => `/uploads/${img.filename}`);

    return this.productService.update(id, {
      ...body,
      imageUrls,
      existingImageIds,
      variants,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
