import Dexie from 'dexie';

// Define the database schema
const db = new Dexie('employees-db');
db.version(1).stores({
  employees: '++id, name, designation, start_date, end_date',
});

export default db;