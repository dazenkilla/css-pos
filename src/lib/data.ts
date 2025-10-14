

import { PlaceHolderImages } from './placeholder-images';

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
    { id: 'SUP-001', name: 'PT Biji Kopi Nusantara', contactName: 'Budi Hartono', phone: '081234567890', email: 'budi@kopinusantara.com' },
    { id: 'SUP-002', name: 'CV Roti Jaya Abadi', contactName: 'Siti Aminah', phone: '081298765432', email: 'siti@rotijaya.com' },
    { id: 'SUP-003', name: 'Gourmet Imports', contactName: 'John Doe', phone: '081122334455', email: 'john@gourmetimports.com' },
    { id: 'SUP-004', name: 'Teh Premium Lestari', contactName: 'Lestari Wibowo', phone: '085611112222', email: 'info@tehpremium.id' },
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
