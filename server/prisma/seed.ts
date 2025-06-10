import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'mistrz@fluxshop.pl',
      password: 'supersekretnehaslo',
      name: 'Mistrz Kodów',
    },
  });

  const product1 = await prisma.product.create({
    data: {
      title: 'Flux Sneakers',
      description: 'Stylowe buty do codziennego użytku.',
      price: 299.99,
      images: {
        create: [
          { url: 'https://example.com/images/flux-sneakers-1.jpg' },
          { url: 'https://example.com/images/flux-sneakers-2.jpg' },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'Flux Hoodie',
      description: 'Ciepła bluza z kapturem dla fanów FluxShop.',
      price: 159.99,
      images: {
        create: [{ url: 'https://example.com/images/flux-hoodie.jpg' }],
      },
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      contactName: 'Mistrz Kodów',
      contactEmail: 'mistrz@fluxshop.pl',
      contactPhone: '123456789',
      address: 'Flux Street 42, Kodoland',
      note: 'Proszę o szybka wysyłkę!',
      products: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
            note: 'Poproszę rozmiar 42',
          },
          {
            productId: product2.id,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log('Seed wykonany pomyślnie');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
