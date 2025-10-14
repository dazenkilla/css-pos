
export const inventoryItems = [
    { sku: 'coffee-001', name: 'Biji Kopi Artisan', category: 'Minuman', subCategory: 'Kopi', price: 18990, stock: 120, expiryDate: '2025-12-31' },
    { sku: 'pastry-001', name: 'Croissant Almond', category: 'Kue', subCategory: 'Viennoiserie', price: 4500, stock: 15, expiryDate: '2024-07-25' },
    { sku: 'gadget-001', name: 'Timbangan Kopi Digital', category: 'Merchandise', subCategory: 'Peralatan', price: 45000, stock: 30, expiryDate: null },
    { sku: 'tea-001', name: 'Teh Earl Grey Organik', category: 'Minuman', subCategory: 'Teh', price: 12500, stock: 80, expiryDate: '2026-05-20' },
    { sku: 'pastry-002', name: 'Muffin Blueberry', category: 'Kue', subCategory: 'Muffin', price: 3750, stock: 55, expiryDate: '2024-07-26' },
    { sku: 'gadget-002', name: 'Keramik Pour-Over', category: 'Merchandise', subCategory: 'Peralatan', price: 32000, stock: 18, expiryDate: null },
    { sku: 'coffee-002', name: 'Espresso Single-Origin', category: 'Minuman', subCategory: 'Kopi', price: 22000, stock: 8, expiryDate: '2025-10-15' },
    { sku: 'pastry-003', name: 'Kue Cokelat Chip', category: 'Kue', subCategory: 'Kue Kering', price: 2500, stock: 0, expiryDate: '2024-08-01' },
];

export const suppliers = [
    { id: 'SUP-001', name: 'PT Biji Kopi Nusantara' },
    { id: 'SUP-002', name: 'CV Roti Jaya Abadi' },
    { id: 'SUP-003', name: 'Gourmet Imports' },
    { id: 'SUP-004', name: 'Teh Premium Lestari' },
];

export const purchaseOrders = [
    { id: 'PO-00124', supplier: 'PT Biji Kopi Nusantara', date: '2023-10-25', status: 'Selesai', total: 450000, items: 3 },
    { id: 'PO-00125', supplier: 'CV Roti Jaya Abadi', date: '2023-11-02', status: 'Tertunda', total: 120500, items: 2 },
    { id: 'PO-00126', supplier: 'Gourmet Imports', date: '2023-11-05', status: 'Selesai', total: 875000, items: 5 },
    { id: 'PO-00127', supplier: 'PT Biji Kopi Nusantara', date: '2023-11-10', status: 'Dibatalkan', total: 300000, items: 2 },
    { id: 'PO-00128', supplier: 'Teh Premium Lestari', date: '2023-11-15', status: 'Tertunda', total: 250000, items: 4 },
];


export const users = [
    { id: "USR-001", name: "Samantha", email: "samantha@example.com", role: "Admin", lastActive: "2 jam lalu" },
    { id: "USR-002", name: "David", email: "david@example.com", role: "Kasir", lastActive: "15 menit lalu" },
    { id: "USR-003", name: "Brenda", email: "brenda@example.com", role: "Kasir", lastActive: "8 jam lalu" },
    { id: "USR-004", name: "James", email: "james@example.com", role: "Kasir", lastActive: "Kemarin" },
];
