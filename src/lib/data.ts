

import { PlaceHolderImages } from './placeholder-images';

export const inventoryItems = [
    { sku: 'prod-001', name: 'Takoyaki Baso', category: 'Makanan', subCategory: 'Takoyaki', price: 25000, stock: 50, expiryDate: null },
    { sku: 'prod-002', name: 'Takoyaki Sosis', category: 'Makanan', subCategory: 'Takoyaki', price: 25000, stock: 50, expiryDate: null },
    { sku: 'prod-003', name: 'Takoyaki Crab Stik', category: 'Makanan', subCategory: 'Takoyaki', price: 28000, stock: 40, expiryDate: null },
    { sku: 'prod-004', name: 'Souffle Cake', category: 'Kue', subCategory: 'Dessert', price: 35000, stock: 20, expiryDate: '2024-07-26' },
    { sku: 'prod-005', name: 'Dorayaki', category: 'Kue', subCategory: 'Dessert', price: 18000, stock: 60, expiryDate: '2024-07-28' },
    { sku: 'prod-006', name: 'Es Teh Jumbo', category: 'Minuman', subCategory: 'Es Teh', price: 8000, stock: 100, expiryDate: null },
    { sku: 'prod-007', name: 'Es Teh Kampul', category: 'Minuman', subCategory: 'Es Teh', price: 10000, stock: 100, expiryDate: null },
    { sku: 'prod-008', name: 'Es Teh Markisa', category: 'Minuman', subCategory: 'Es Teh', price: 12000, stock: 80, expiryDate: null },
    { sku: 'prod-009', name: 'Es Teh Leci', category: 'Minuman', subCategory: 'Es Teh', price: 12000, stock: 80, expiryDate: null },
    { sku: 'prod-010', name: 'Es Teh Original', category: 'Minuman', subCategory: 'Es Teh', price: 6000, stock: 150, expiryDate: null },
    { sku: 'prod-011', name: 'Es Teh Blackcurrant', category: 'Minuman', subCategory: 'Es Teh', price: 12000, stock: 75, expiryDate: null },
    { sku: 'prod-012', name: 'Es Teh Lemon', category: 'Minuman', subCategory: 'Es Teh', price: 10000, stock: 90, expiryDate: null },
    { sku: 'prod-013', name: 'Abura Soba', category: 'Makanan', subCategory: 'Mie', price: 45000, stock: 30, expiryDate: null },
    { sku: 'prod-014', name: 'Bola Susu', category: 'Kue', subCategory: 'Cemilan', price: 15000, stock: 45, expiryDate: '2024-08-01' },
    { sku: 'prod-015', name: 'Sandwich Buah', category: 'Kue', subCategory: 'Dessert', price: 28000, stock: 15, expiryDate: '2024-07-25' },
    { sku: 'prod-016', name: 'Poket Doraemon', category: 'Kue', subCategory: 'Dessert', price: 20000, stock: 0, expiryDate: '2024-07-27' },
    { sku: 'prod-017', name: 'Paket Spesial 1', category: 'Paket', subCategory: 'Promo', price: 65000, stock: 100, expiryDate: null },
    { sku: 'prod-018', name: 'Paket Spesial 2', category: 'Paket', subCategory: 'Promo', price: 75000, stock: 100, expiryDate: null },
    { sku: 'prod-019', name: 'Paket Spesial 3', category: 'Paket', subCategory: 'Promo', price: 85000, stock: 100, expiryDate: null },
    { sku: 'prod-020', name: 'Paket Spesial 4', category: 'Paket', subCategory: 'Promo', price: 95000, stock: 100, expiryDate: null },
    { sku: 'prod-021', name: 'Kaisen Goma', category: 'Makanan', subCategory: 'Nasi', price: 55000, stock: 25, expiryDate: null },
    { sku: 'prod-022', name: 'Soy Chicken', category: 'Makanan', subCategory: 'Nasi', price: 48000, stock: 28, expiryDate: null },
    { sku: 'prod-023', name: 'Coffee Latte', category: 'Minuman', subCategory: 'Kopi', price: 22000, stock: 60, expiryDate: null }
];


export const suppliers = [
    { id: 'SUP-001', name: 'PT Makanan Enak', contactName: 'Budi Santoso', phone: '081234567890', email: 'budi@makananenak.com' },
    { id: 'SUP-002', name: 'CV Minuman Segar', contactName: 'Siti Aminah', phone: '081298765432', email: 'siti@minumansegar.com' },
    { id: 'SUP-003', name: 'Toko Kue Bahagia', contactName: 'John Doe', phone: '081122334455', email: 'john@kuebahagia.com' },
    { id: 'SUP-004', name: 'Sumber Bahan Pokok', contactName: 'Lestari Wibowo', phone: '085611112222', email: 'info@sumberpokok.id' },
];

export const purchaseOrders = [
    { id: 'PO-00124', supplier: 'PT Makanan Enak', date: '2023-10-25', status: 'Selesai', total: 450000, items: 3 },
    { id: 'PO-00125', supplier: 'Toko Kue Bahagia', date: '2023-11-02', status: 'Tertunda', total: 120500, items: 2 },
    { id: 'PO-00126', supplier: 'CV Minuman Segar', date: '2023-11-05', status: 'Selesai', total: 875000, items: 5 },
    { id: 'PO-00127', supplier: 'PT Makanan Enak', date: '2023-11-10', status: 'Dibatalkan', total: 300000, items: 2 },
    { id: 'PO-00128', supplier: 'Sumber Bahan Pokok', date: '2023-11-15', status: 'Tertunda', total: 250000, items: 4 },
];


export const users = [
    { id: "USR-001", name: "Samantha", email: "samantha@example.com", role: "Admin", lastActive: "2 jam lalu" },
    { id: "USR-002", name: "David", email: "david@example.com", role: "Kasir", lastActive: "15 menit lalu" },
    { id: "USR-003", name: "Brenda", email: "brenda@example.com", role: "Kasir", lastActive: "8 jam lalu" },
    { id: "USR-004", name: "James", email: "james@example.com", role: "Kasir", lastActive: "Kemarin" },
];

const createSale = (id: string, date: string, paymentMethods: {method: string, amount?: number}[]) => {
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const items = [];
  let subtotal = 0;
  const usedIndexes = new Set();

  for (let j = 0; j < itemCount; j++) {
    let itemIndex;
    do {
      itemIndex = Math.floor(Math.random() * inventoryItems.length);
    } while (usedIndexes.has(itemIndex));
    usedIndexes.add(itemIndex);
    
    const product = inventoryItems[itemIndex];
    const quantity = Math.floor(Math.random() * 2) + 1;
    items.push({
      name: product.name,
      price: product.price,
      quantity: quantity
    });
    subtotal += product.price * quantity;
  }
  
  const total = subtotal; // Simplified total for mock data
  
  const finalPayments = paymentMethods.map(p => ({
      method: p.method,
      amount: p.amount || total / paymentMethods.length
  }));

  return {
    id,
    date,
    total,
    items,
    payments: finalPayments,
  };
};

const generateSales = () => {
    let sales = [];
    // Cash sales
    for (let i=1; i<=20; i++) {
        sales.push(createSale(`SALE-CASH-${i}`, `2023-11-${String(i).padStart(2,'0')}`, [{ method: 'Tunai' }]));
    }
    // Card sales
    for (let i=1; i<=20; i++) {
        sales.push(createSale(`SALE-CARD-${i}`, `2023-11-${String(i).padStart(2,'0')}`, [{ method: 'Kartu' }]));
    }
    // QR sales
    for (let i=1; i<=20; i++) {
        sales.push(createSale(`SALE-QR-${i}`, `2023-11-${String(i).padStart(2,'0')}`, [{ method: 'QR' }]));
    }
    // Bank Transfer sales
    for (let i=1; i<=20; i++) {
        sales.push(createSale(`SALE-BANK-${i}`, `2023-11-${String(i).padStart(2,'0')}`, [{ method: 'Transfer Bank' }]));
    }
    // Split payment
    sales.push(createSale(`SALE-SPLIT-1`, `2023-11-21`, [{ method: 'Tunai' }, { method: 'Kartu' }]));
    sales.push(createSale(`SALE-SPLIT-2`, `2023-11-22`, [{ method: 'QR' }, { method: 'Tunai' }]));

    return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const salesHistory = generateSales();


// --- Pre-calculated Analytics Data ---

const getImageUrlBySku = (sku: string) => {
    const image = PlaceHolderImages.find(img => img.id === sku);
    return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/64/64';
};

const getSkuByName = (name: string) => {
    const item = inventoryItems.find(item => item.name === name);
    return item ? item.sku : null;
}

const calculateTopSellingProducts = () => {
    const productSales: { [key: string]: { name: string, quantity: number } } = {};
    salesHistory.forEach(sale => {
        sale.items.forEach(item => {
            if (productSales[item.name]) {
                productSales[item.name].quantity += item.quantity;
            } else {
                productSales[item.name] = { name: item.name, quantity: item.quantity };
            }
        });
    });

    return Object.values(productSales)
        .map(product => {
            const sku = getSkuByName(product.name);
            return {
                ...product,
                imageUrl: sku ? getImageUrlBySku(sku) : getImageUrlBySku('placeholder')
            };
        })
        .sort((a, b) => {
            if (b.quantity !== a.quantity) {
                return b.quantity - a.quantity;
            }
            return a.name.localeCompare(b.name); // Stable sort
        })
        .slice(0, 5); // Display top 5
};

export const topSellingProducts = calculateTopSellingProducts();
