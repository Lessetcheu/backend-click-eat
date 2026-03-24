import prisma from "./prisma.js";

const modulesWithPermissions = [
  {
    title: `Gestion des rôles`,
    description: 'Module pour la gestion des rôles',
    permissions: [
      {
        permissionKey: 'ROLE:LIST',
        title: 'Voir tous les rôles',
        description: 'Permet de consulter la liste complète des rôles',
      },
      {
        permissionKey: 'ROLE:CREATE',
        title: 'Créer un rôle',
        description: 'Permet de créer un nouveau rôle',
      },
      {
        permissionKey: 'ROLE:UPDATE',
        title: 'Modifier un rôle',
        description: 'Permet de modifier un rôle existant',
      },
      {
        permissionKey: 'ROLE:VIEW',
        title: 'Consulter un rôle',
        description: 'Permet de voir les détails d\u2019un rôle',
      },
      {
        permissionKey: 'ROLE:SOFT_DELETE',
        title: 'Désactiver un rôle',
        description: 'Permet de désactiver temporairement un rôle sans le supprimer définitivement',
      },
      {
        permissionKey: 'ROLE:HARD_DELETE',
        title: 'Supprimer définitivement un rôle',
        description: 'Permet de supprimer un rôle de façon permanente',
      },
      {
        permissionKey: 'ROLE:STATUS_CHANGE',
        title: 'Modifier le statut d\u2019un rôle',
        description: 'Permet de changer le statut (actif/inactif) d\u2019un rôle',
      },
      {
        permissionKey: 'ROLE:RESTORE',
        title: 'Restaurer un rôle',
        description: 'Permet de restaurer un rôle désactivé ou supprimé temporairement',
      },
    ],
  },
];

export const seedPermissions = async () => {
  console.log('Seeding permission modules and permissions...');

  for (const moduleData of modulesWithPermissions) {
    let module = null;

    const existingModule = await prisma.permissionModule.findFirst({
      where: {
        title: moduleData.title,
      },
    });

    if (existingModule) {
      module = await prisma.permissionModule.update({
        where: { id: existingModule.id },
        data: { title: moduleData.title, description: moduleData.description },
      });
    } else {
      module = await prisma.permissionModule.create({
        data: { title: moduleData.title, description: moduleData.description },
      });
    }

    // Upsert des permissions rattachées au module
    for (const perm of moduleData.permissions) {
      const existingPermission = await prisma.permission.findFirst({
        where: {
          permissionKey: perm.permissionKey,
        },
      });

      if (existingPermission && module) {
        await prisma.permission.update({
          where: { id: existingPermission.id },
          data: {
            title: perm.title,
            description: perm.description,
            moduleId: module.id,
          },
        });
      } else {
        await prisma.permission.create({
          data: {
            permissionKey: perm.permissionKey,
            title: perm.title,
            description: perm.description,
            moduleId: module.id,
          },
        });
      }
    }
  }

  console.log('Permissions seeded ✅');
};
