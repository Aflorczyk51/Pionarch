const mongoose = require('mongoose');
const Role = require('./models/role');

// Database connection setup here (e.g., dbConnection() or mongoose.connect())

const roles = [
    { roleName: 'admin' }, 
    { roleName: 'employee', permissions: ['read'] },
    { roleName: 'client', permissions: ['read'] },
];

// Function to add all permissions to the admin role
function addAllPermissionsToAdmin() {
    const adminRole = roles.find(role => role.roleName === 'admin');
    if (adminRole) {
        adminRole.permissions = ['create', 'read', 'update', 'delete'];
    }
}

// Insert roles into the database
Role.insertMany(roles)
    .then(() => {
        // Add all permissions to the admin role
        addAllPermissionsToAdmin();
        console.log('Roles seeded successfully.');
        mongoose.connection.close(); // Close the database connection
    })
    .catch((error) => {
        console.error('Error seeding roles:', error);
        mongoose.connection.close(); // Close the database connection in case of an error
    });
