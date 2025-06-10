export class CreateOrderDto {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  note?: string;
  userId?: string;
  products: {
    productId: string;
    quantity: number;
    note?: string;
  }[];
}
