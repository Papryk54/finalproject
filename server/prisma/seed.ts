import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: adminPassword,
      name: 'Admin',
      role: 'admin',
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@user.com',
      password: userPassword,
      name: 'Regular User',
      role: 'user',
    },
  });

  type FakeProductSeed = {
    title: string;
    description: string;
    price: number;
    variants: Array<{ label: string; price: number }>;
    images: { create: Array<{ url: string }> };
  };

  const productTitles = [
    'Loose Equality T-Shirt',
    'Unexpected Token Mug',
    '404 Hoodie',
    'Terminal Sticker Pack',
    'Production Deploy Bag',
    'Callback Hell Cap',
    'CSS Grid Mousepad',
    'Developer Pin Set',
    '500 Error T-Shirt',
    'Stack Overflow Notebook',
    "Collector's Energy Can",
    'LED Energizer Desk Stand',
    'Limited Edition Debug Juice',
    'RGB Energy Drink Display Case',
    'Syntax Sugar Energy Shot',
    'Async Boost Can Sleeve',
    'Console.log() Cup Holder',
    'Quantum Caffeine Dispenser',
    'DevRush Neon Flask',
    'Power Surge Desk Decoration',
  ];

  const productDescriptions = [
    "A shirt that celebrates JavaScript's questionable logic. Join the chaos.",
    'Never forget to close your brackets while sipping coffee.',
    'A comfy hoodie for days when even the compiler gives up on you.',
    'Cool stickers for uncool errors. Stick them everywhere but production.',
    'Stable on the outside, chaos inside. Like your last deploy.',
    'Covers your head while your mind loops in callbacks.',
    "The only grid you'll ever align perfectly.",
    "Wear your debug badges proudly. You've earned them.",
    'Blame included for free. Just point at the shirt.',
    'Write it down before StackOverflow goes down.',
    "A sleek collector's can filled with pixel-powered energy for late night debugging sessions. Comes with a matte finish and retro-futuristic vibes.",
    "Keep your energy drink glowing and within arm's reach. Perfect for intense coding marathons.",
    'Limited edition drink for those who live in the terminal. Effects may include sudden productivity spikes.',
    "Put your energy on display — literally. Glows in the dark and screams 'developer lifestyle'.",
    'Sugary, sassy, and slightly sarcastic. Tastes like productivity and regret.',
    'Thermal can sleeve that keeps your drink cool and your sass hot. Async-ready.',
    'A holder for your daily dose of caffeinated motivation. Compatible with most desks and dark humor.',
    'Because two shots of espresso just don’t cut it anymore. Welcome to quantum-level stimulation.',
    'Neon-themed flask for the chaotic neutral dev. Glows when deadlines are near.',
    'Fierce, funky, and full of energy. Your desk never looked this electric.',
  ];

  const getRandomVariants = (title: string, basePrice: number) => {
    const variantLabelsPool = [
      'Small',
      'Medium',
      'Large',
      'XL',
      'Classic',
      'Deluxe',
      'Lite Edition',
      'Pro Edition',
      'Max Power',
      'Debug Boost',
      'Quantum Core',
      'Turbo Charge',
      'Night Mode',
      'Energy+',
      'Silent Build',
    ];
    const count = Math.floor(Math.random() * 4) + 2;
    const shuffled = [...variantLabelsPool].sort(() => 0.5 - Math.random());

    return Array.from({ length: count }).map((_, i) => ({
      label: `${shuffled[i]} ${title.split(' ')[0]}`,
      price: parseFloat(
        (
          basePrice + (Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 20))
        ).toFixed(2),
      ),
    }));
  };

  const getRandomImages = () => {
    const imagesPool = [
      '/img/productPlaceholder1.png',
      '/img/productPlaceholder2.png',
      '/img/productPlaceholder3.png',
    ];
    const shuffled = [...imagesPool].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 4) + 2;
    return {
      create: shuffled.slice(0, count).map((url) => ({ url })),
    };
  };

  const allProducts: FakeProductSeed[] = productTitles.map((title, index) => {
    const basePrice = 49.99 + index * 5;
    return {
      title,
      description: productDescriptions[index],
      price: basePrice,
      variants: getRandomVariants(title, basePrice),
      images: getRandomImages(),
    };
  });

  for (const product of allProducts) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        variants: {
          create: product.variants,
        },
        images: product.images,
      },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
