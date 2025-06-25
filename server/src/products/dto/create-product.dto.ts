import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
