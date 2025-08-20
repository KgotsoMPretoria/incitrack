// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@incitrack.dev";
    const password = "Admin123!";
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: "Admin",
            email,
            passwordHash: hash,
            role: "ADMIN",
        },
    });

    console.log("Seeded admin:", { email, password, id: user.id });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
