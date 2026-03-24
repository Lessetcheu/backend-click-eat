import argon2 from "argon2";
import prisma from "./prisma.js";


export const seedUsers = async () => {
  console.log("Seeding positions and users...");

  // Hash the default password using Argon2id for better security
  const hashedPassword = await argon2.hash("Password123!", {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  const roles = await prisma.role.findMany();
  const allPermissions = await prisma.permission.findMany();

  for (const role of roles) {
    const email = `${role.name.toLowerCase()}@gmail.com`;

    let user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: role.name.charAt(0) + role.name.slice(1).toLowerCase(),
          lastName: "User",
          email,
          phone: `+2376${Math.floor(10000000 + Math.random() * 89999999)}`,
          username: role.name.toLowerCase(),
          password: hashedPassword,
          profile: "/uploads/users/default.png",
          isActive: true,
          isVerified: true,
          isEmployee: role.name !== "USER",
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          firstName: role.name.charAt(0) + role.name.slice(1).toLowerCase(),
          lastName: "User",
          email,
          phone: `+2376${Math.floor(10000000 + Math.random() * 89999999)}`,
          username: role.name.toLowerCase(),
          password: hashedPassword,
          profile: "/uploads/users/default.png",
          isActive: true,
          isVerified: true,
          isEmployee: role.name !== "USER",
        },
      });
    }

    // Link the user to their role in the UserHasRoles table
    const existingRelation = await prisma.userHasRoles.findUnique({
      where: {
        userId_roleId: { userId: user.id, roleId: role.id },
      },
    });

    // If the user-role relationship doesn't exist yet, create it
    if (!existingRelation) {
      await prisma.userHasRoles.create({
        data: {
          userId: user.id,
          roleId: role.id,
          assignedBy: user.id,
        },
      });
    }

    // Assign all permissions to SUPERADMIN and DEVELOPPER roles
    if (["SUPERADMIN", "DEVELOPPER", "MANAGER", "USER"].includes(role.name)) {
      console.log(`Assigning all permissions to ${role.name}...`);

      for (const permission of allPermissions) {
        const existingPermissionLink =
          await prisma.roleHasPermissions.findUnique({
            where: {
              roleId_permissionId: {
                roleId: role.id,
                permissionId: permission.id,
              },
            },
          });

        if (!existingPermissionLink) {
          await prisma.roleHasPermissions.create({
            data: {
              roleId: role.id,
              permissionId: permission.id,
            },
          });
        }
      }

      console.log(`All permissions assigned to ${role.name}`);
    }

    console.log(
      `Created user "${user.username}" with role "${role.name}"`,
    );
  }

  console.log("Users & Positions seeded");
};
