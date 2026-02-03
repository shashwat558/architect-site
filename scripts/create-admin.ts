
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function createAdmin() {
  const email = process.argv[2] || "admin@adrs.com";
  const password = process.argv[3] || "admin123";
  const name = process.argv[4] || "Admin User";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists. Updating password...`);
      await prisma.admin.update({
        where: { email },
        data: { password: hashedPassword, name },
      });
      console.log("Admin password updated successfully!");
    } else {
      await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      console.log(`Admin created successfully!`);
    }

    console.log(`\nAdmin credentials:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`\nYou can now login at /admin/login`);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
