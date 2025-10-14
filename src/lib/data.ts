export const inventoryItems = [
    { sku: 'coffee-001', name: 'Artisan Coffee Beans', category: 'Beverages', subCategory: 'Coffee', price: 18.99, stock: 120, expiryDate: '2025-12-31' },
    { sku: 'pastry-001', name: 'Almond Croissant', category: 'Pastries', subCategory: 'Viennoiserie', price: 4.50, stock: 15, expiryDate: '2024-07-25' },
    { sku: 'gadget-001', name: 'Digital Coffee Scale', category: 'Merchandise', subCategory: 'Equipment', price: 45.00, stock: 30, expiryDate: null },
    { sku: 'tea-001', name: 'Organic Earl Grey Tea', category: 'Beverages', subCategory: 'Tea', price: 12.50, stock: 80, expiryDate: '2026-05-20' },
    { sku: 'pastry-002', name: 'Blueberry Muffin', category: 'Pastries', subCategory: 'Muffins', price: 3.75, stock: 55, expiryDate: '2024-07-26' },
    { sku: 'gadget-002', name: 'Ceramic Pour-Over', category: 'Merchandise', subCategory: 'Equipment', price: 32.00, stock: 18, expiryDate: null },
    { sku: 'coffee-002', name: 'Single-Origin Espresso', category: 'Beverages', subCategory: 'Coffee', price: 22.00, stock: 8, expiryDate: '2025-10-15' },
    { sku: 'pastry-003', name: 'Chocolate Chip Cookie', category: 'Pastries', subCategory: 'Cookies', price: 2.50, stock: 0, expiryDate: '2024-08-01' },
];

export const purchaseOrders = [
    { id: 'PO-00124', supplier: 'Beans & Co.', date: '2023-10-25', status: 'Fulfilled', total: 450.00 },
    { id: 'PO-00125', supplier: 'Bakery Supplies Ltd.', date: '2023-11-02', status: 'Pending', total: 120.50 },
    { id: 'PO-00126', supplier: 'Brewing Gear Inc.', date: '2023-11-05', status: 'Fulfilled', total: 875.00 },
    { id: 'PO-00127', supplier: 'Beans & Co.', date: '2023-11-10', status: 'Cancelled', total: 300.00 },
];

export const users = [
    { id: "USR-001", name: "Samantha", email: "samantha@example.com", role: "Admin", lastActive: "2 hours ago" },
    { id: "USR-002", name: "David", email: "david@example.com", role: "Cashier", lastActive: "15 minutes ago" },
    { id: "USR-003", name: "Brenda", email: "brenda@example.com", role: "Cashier", lastActive: "8 hours ago" },
    { id: "USR-004", name: "James", email: "james@example.com", role: "Cashier", lastActive: "Yesterday" },
];
