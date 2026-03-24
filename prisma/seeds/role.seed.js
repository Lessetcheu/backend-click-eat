import prisma from "./prisma.js";

const rolesSeed = [
  { name: 'SUPERADMIN', description: 'Rôle de super administrateur', isActive: true },
  { name: 'ADMIN', description: 'Rôle d’administrateur', isActive: true },
  { name: 'DEVELOPER', description: 'Rôle de développeur', isActive: true },
  { name: 'COOK', description: 'Rôle de cuisinier', isActive: true },
];

export const seedRoles = async () => {
  console.log('Seeding roles...');

  for (const role of rolesSeed) {
    const existingRole = await prisma.role.findFirst({
      where: {
        name: role.name,
      },
    });

    if (existingRole) {
      await prisma.role.update({
        where: { id: existingRole.id },
        data: role,
      });
    } else {
      await prisma.role.create({ data: role });
    }
  }

  console.log('Roles seeded');
};
