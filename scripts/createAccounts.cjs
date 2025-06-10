const fs = require('fs');

const accounts = [
  {
    id: 'admin001',
    username: 'superadmin',
    password: 'Admin@123',
    role: 'superadmin'
  },
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `tenant00${i+1}`,
    username: `tenant${i+1}`,
    password: `Tenant${i+1}@123`,
    role: 'tenant'
  }))
];

fs.writeFileSync('data/accounts.json', JSON.stringify(accounts, null, 2));
console.log('Accounts generated:', accounts);
