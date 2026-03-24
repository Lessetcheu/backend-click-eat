import { seedPermissions } from './permission.seed.js';
import { seedRoles } from './role.seed.js';
import { seedUsers } from './user.seed.js';

const runSeeds = async () => {
  try {
    await seedRoles();
    await seedPermissions();
    await seedUsers();
    
    console.log('All seeds executed successfully ✅');
    process.exit(0);
  } catch (error) {
    console.error('Seed execution failed ❌', error);
    process.exit(1);
  }
};

runSeeds();
