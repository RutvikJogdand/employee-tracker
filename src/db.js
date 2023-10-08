import Dexie from 'dexie';

// Define the database schema
const db = new Dexie('employees-db');
db.version(1).stores({
  employees: '++id, employee_name, designation, startDate, endDate',
});

export default db;