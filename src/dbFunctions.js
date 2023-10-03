import db from './db';

// Create a new employee entry
export async function createEmployeeEntry(data) {
  return await db.employees.add(data);
}

// Read all employees
export async function getAllEmployees() {
  return await db.employees.toArray();
}

// Update an employee
export async function editEmployeeData(id, updatedData) {
  return await db.employees.update(id, updatedData);
}

// Delete an employee
export async function deleteEmployeeData(id) {
  return await db.employees.delete(id);
}
