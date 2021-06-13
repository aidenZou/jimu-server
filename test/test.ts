import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function boot() {
  //   const result = await prisma.pages.create({
  //     data: {
  //       pageId: 'bbbbbb',
  //       title: 'bbbbb',
  //       data: {
  //         bbbbbb: 'bbbbbb',
  //       },
  //       Users: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //       Pages: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   });

  const result = await prisma.pages.findMany({
    select: {
      pageId: true,
      title: true,
      data: true,
      createdAt: true,
      updatedAt: true,
      pages: true,
    },
  });

  console.log('result :>> ', JSON.stringify(result, null, 2));
}

boot();
