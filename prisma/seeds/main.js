const { PrismaClient } = require("@prisma/client");

const {LikeSeeder} = require("./LikeSeeder");

const prisma = new PrismaClient();

const { UserSeeder } = require("./UserSeeder");
const { PostSeeder } = require("./PostSeeder");
const { CommentSeeder } = require("./CommentSeeder");

async function main() {
    try {
        await UserSeeder();
        await PostSeeder();
        await CommentSeeder();
        await LikeSeeder();
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();