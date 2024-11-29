import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed 10 Users
  const users = [
    {
      username: "john_doe",
      phone: "09123456789",
      email: "john.doe@example.com",
      age: 30,
      isActive: true,
    },
    {
      username: "jane_doe",
      phone: "09234567890",
      email: "jane.doe@example.com",
      age: 28,
      isActive: true,
    },
    {
      username: "mike_smith",
      phone: "09345678901",
      email: "mike.smith@example.com",
      age: 35,
      isActive: false,
    },
    {
      username: "susan_lee",
      phone: "09187654321",
      email: "susan.lee@example.com",
      age: 25,
      isActive: true,
    },
    {
      username: "chris_evans",
      phone: "09122334455",
      email: "chris.evans@example.com",
      age: 29,
      isActive: true,
    },
    {
      username: "emma_watson",
      phone: "09112233445",
      email: "emma.watson@example.com",
      age: 32,
      isActive: true,
    },
    {
      username: "tom_hardy",
      phone: "09213456789",
      email: "tom.hardy@example.com",
      age: 40,
      isActive: false,
    },
    {
      username: "kate_winslet",
      phone: "09322334455",
      email: "kate.winslet@example.com",
      age: 27,
      isActive: true,
    },
    {
      username: "leonardo_dicaprio",
      phone: "09412345678",
      email: "leo.dicaprio@example.com",
      age: 42,
      isActive: true,
    },
    {
      username: "brad_pitt",
      phone: "09567890123",
      email: "brad.pitt@example.com",
      age: 38,
      isActive: true,
    },
  ];

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    console.log(`Created user: ${createdUser.username}`);

    // Seed Profile for each user
    await prisma.profile.create({
      data: {
        user_id: createdUser.id,
        first_name: createdUser.username?.split("_")[0] || "FirstName",
        last_name: createdUser.username?.split("_")[1] || "LastName",
        bio: `Hello, I'm ${createdUser.username}`,
        address: "123 Main St",
      },
    });

    console.log(`Created profile for user: ${createdUser.username}`);
  }
}

main()
  .then(() => {
    console.log("Database seeding completed.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
