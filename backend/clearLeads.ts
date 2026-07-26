import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.contactLead.deleteMany();
  console.log("Cleared all previous leads from MongoDB");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
