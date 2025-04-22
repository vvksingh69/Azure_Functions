export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
};

export const products: Product[] = [
  {
    id: '1',
    title: 'Vivek Wireless Mouse',
    description: 'A smooth and responsive mouse with ergonomic design.',
    price: 25,
    count: 1,
  },
  {
    id: '2',
    title: 'Mechanical Keyboard',
    description: 'A tactile keyboard with RGB lighting and durable switches.',
    price: 85,
    count: 1,
  },
  {
    id: '3',
    title: '27-inch 4K Monitor',
    description: 'Ultra HD monitor with stunning color accuracy.',
    price: 320,
    count: 1,
  },
  {
    id: '4',
    title: 'USB-C Docking Station',
    description: 'Expand your laptop connectivity with this multi-port hub.',
    price: 60,
    count: 1,
  },
  {
    id: '5',
    title: 'Bluetooth Headphones',
    description: 'Wireless over-ear headphones with noise cancellation.',
    price: 70,
    count: 1,
  },
  {
    id: '6',
    title: 'Webcam 1080p',
    description: 'Full HD webcam with wide-angle lens and auto-focus.',
    price: 45,
    count: 1,
  },
  {
    id: '7',
    title: 'Portable SSD 1TB',
    description: 'High-speed external SSD for reliable data storage.',
    price: 110,
    count: 1,
  },
  {
    id: '8',
    title: 'Ergonomic Office Chair',
    description: 'Comfortable chair with adjustable lumbar support.',
    price: 150,
    count: 1,
  },
  {
    id: '9',
    title: 'Smart LED Desk Lamp',
    description:
      'Adjustable brightness and color temperature with touch controls.',
    price: 40,
    count: 1,
  },
  {
    id: '10',
    title: 'Noise-Canceling Earbuds',
    description:
      'Compact and lightweight earbuds with active noise cancellation.',
    price: 55,
    count: 1,
  },
];
