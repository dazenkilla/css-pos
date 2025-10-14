
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { inventoryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlusCircle, MinusCircle, X, ShoppingCart, Ticket, Printer, Wallet, CreditCard, QrCode, Landmark, Tag, ShoppingBag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Receipt, SaleData } from '@/components/sales/receipt';
import { renderToString } from 'react-dom/server';


type CartItem = typeof inventoryItems[0] & { quantity: number };
type Payment = { method: 'Tunai' | 'Kartu' | 'QR' | 'Transfer Bank'; amount: number };

export default function DirectSalePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [isQrDialogOpen, setQrDialogOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const { toast } = useToast();

  const addToCart = (product: typeof inventoryItems[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.sku === product.sku);
      if (existingItem) {
        return prevCart.map((item) =>
          item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (sku: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - totalDiscount;
  const tax = taxableAmount * 0.11; // PPN 11%
  const total = taxableAmount + tax;
  
  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const remainingAmount = total - totalPaid;

  const categories = [...new Set(inventoryItems.map(item => item.category))];

  const getImageUrl = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/300/200';
  };
  
  const getImageHint = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageHint : 'product';
  };
  
  const applyDiscount = () => {
    const newDiscount = parseFloat(discountInput);
    if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
      setDiscount(newDiscount);
      setDiscountDialogOpen(false);
      toast({
        title: "Diskon Diterapkan",
        description: `Diskon ${newDiscount}% telah diterapkan pada subtotal.`
      })
    } else {
      toast({
        variant: 'destructive',
        title: "Diskon Tidak Valid",
        description: "Silakan masukkan persentase antara 0 dan 100."
      })
    }
  }
  
  const handleAddPayment = (method: 'Tunai' | 'Kartu' | 'QR' | 'Transfer Bank') => {
    if (method === 'QR') {
        if (remainingAmount > 0) {
            setQrDialogOpen(true);
        }
        return;
    }
    
    if (remainingAmount > 0) {
        setPayments([...payments, { method, amount: remainingAmount > 0 ? remainingAmount : 0 }]);
    }
  };

  const confirmQrPayment = () => {
    setPayments([...payments, { method: 'QR', amount: remainingAmount > 0 ? remainingAmount : 0 }]);
    setQrDialogOpen(false);
  }

  const handlePaymentAmountChange = (index: number, newAmount: number) => {
    const newPayments = [...payments];
    newPayments[index].amount = newAmount;
    setPayments(newPayments);
  };
  
  const handlePrint = (saleData: SaleData) => {
    if (!saleData) return;
  
    const receiptString = renderToString(<Receipt sale={saleData} />);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cetak Struk</title>
            <style>
              @page {
                size: 58mm auto;
                margin: 0;
              }
              body { 
                font-family: 'Courier New', Courier, monospace;
                font-size: 9px; 
                line-height: 1.4;
                margin: 0;
                padding: 3mm;
                width: 52mm; /* 58mm - 3mm padding di setiap sisi */
                color: #000;
              }
              #receipt-print {
                width: 100%;
              }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .mb-1 { margin-bottom: 0.25rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mt-4 { margin-top: 1rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .h-8 { height: 2rem; }
              .w-8 { width: 2rem; }
              .text-lg { font-size: 1.125rem; }
              .font-bold { font-weight: 700; }
              hr { border-top: 1px dashed black; margin: 0.5rem 0; }
              .flex { display: flex; }
              .justify-between { justify-content: space-between; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .item { display: flex; flex-direction: column; }
              .item-info { display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            <div id="receipt-print">${receiptString}</div>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const completeSale = () => {
    const saleId = `SALE-${Date.now().toString().slice(-6)}`;
    const saleData: SaleData = {
      cart,
      subtotal,
      discount: totalDiscount,
      tax,
      total,
      payments,
      totalPaid,
      change: totalPaid - total,
    };
    
    // Langsung panggil fungsi print
    handlePrint(saleData);
    
    toast({
      title: "Penjualan Selesai!",
      description: `Total: Rp${total.toLocaleString('id-ID')}`,
    });

    setCart([]);
    setDiscount(0);
    setPayments([]);
    setPaymentDialogOpen(false);
  }

  return (
    <>
      <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-5">
        
        {/* Panel Pemilihan Produk */}
        <div className="lg:col-span-3">
          <Tabs defaultValue={categories[0] || 'all'}>
            <div className="flex items-center">
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {inventoryItems.filter(item => item.category === category).map((product) => (
                    <Card 
                      key={product.sku} 
                      className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-0">
                        <Image
                          alt={product.name}
                          className="aspect-square w-full object-cover"
                          height="200"
                          src={getImageUrl(product.sku)}
                          width="200"
                          data-ai-hint={getImageHint(product.sku)}
                        />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-3">
                        <h3 className="font-semibold text-sm truncate w-full">{product.name}</h3>
                        <p className="font-bold text-base">Rp{product.price.toLocaleString('id-ID')}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Panel Keranjang */}
        <div className="lg:col-span-2">
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <CardTitle>Pesanan Saat Ini</CardTitle>
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold bg-muted p-2 rounded-md">
                <ShoppingBag className="h-5 w-5"/>
                <span>Penjualan Langsung</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground mt-4">Keranjang Anda kosong.</p>
                  <p className="text-sm text-muted-foreground/80">Ketuk produk untuk menambahkannya ke pesanan.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.sku} className="flex items-center gap-4">
                      <Image
                        alt={item.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={getImageUrl(item.sku)}
                        width="64"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Rp{item.price.toLocaleString('id-ID')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.sku, -1)}><MinusCircle className="h-3.5 w-3.5" /></Button>
                          <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.sku, 1)}><PlusCircle className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                      <p className="font-semibold w-24 text-right">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => removeFromCart(item.sku)}><X className="h-4 w-4"/></Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <>
                <Separator />
                <CardFooter className="flex flex-col gap-2 items-stretch p-4">
                  <div className="flex justify-between w-full text-muted-foreground"><span>Subtotal</span><span>Rp{subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between w-full text-muted-foreground">
                    <span>Diskon ({discount}%)</span>
                    <span>-Rp{totalDiscount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground"><span>Pajak (11%)</span><span>Rp{tax.toLocaleString('id-ID')}</span></div>
                  <Separator className="my-2" />
                  <div className="flex justify-between w-full font-semibold text-lg"><span>Total</span><span>Rp{total.toLocaleString('id-ID')}</span></div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="lg" onClick={() => setDiscountDialogOpen(true)}>
                      <Ticket className="mr-2 h-4 w-4"/>
                      Diskon
                    </Button>
                    <Button size="lg" onClick={() => setPaymentDialogOpen(true)} disabled={cart.length === 0}>Bayar</Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>

        {/* Dialog Diskon */}
        <Dialog open={isDiscountDialogOpen} onOpenChange={setDiscountDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terapkan Diskon</DialogTitle>
              <DialogDescription>Masukkan persentase diskon untuk diterapkan pada subtotal.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Diskon (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  className="col-span-3"
                  placeholder="cth. 10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={applyDiscount}>Terapkan Diskon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Pembayaran */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Selesaikan Pembayaran</DialogTitle>
              <DialogDescription>
                Bagi pembayaran ke beberapa metode jika diperlukan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Jumlah Total</p>
                    <p className="text-4xl font-bold">Rp{total.toLocaleString('id-ID')}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Pembayaran</p>
                  {payments.map((payment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                      <span className="font-semibold flex-1">{payment.method}</span>
                       <Input 
                        type="number"
                        value={payment.amount.toFixed(0)}
                        onChange={(e) => handlePaymentAmountChange(index, parseFloat(e.target.value) || 0)}
                        className="w-32"
                       />
                       <Button variant="ghost" size="icon" onClick={() => setPayments(payments.filter((_, i) => i !== index))}>
                          <X className="h-4 w-4" />
                       </Button>
                    </div>
                  ))}
                  {payments.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Belum ada pembayaran.</p>}
                </div>

                <div className="flex justify-between items-center text-lg font-semibold bg-muted p-3 rounded-md">
                    <span>Sisa</span>
                    <span>Rp{remainingAmount > 0 ? remainingAmount.toLocaleString('id-ID') : '0'}</span>
                </div>

                {remainingAmount > 0.001 && (
                    <div className="grid grid-cols-2 gap-2 justify-center">
                        <Button variant="secondary" onClick={() => handleAddPayment('Tunai')}>
                          <Wallet className="mr-2 h-4 w-4" />
                          Tunai
                        </Button>
                        <Button variant="secondary" onClick={() => handleAddPayment('Kartu')}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Kartu
                        </Button>
                        <Button variant="secondary" onClick={() => handleAddPayment('QR')}>
                          <QrCode className="mr-2 h-4 w-4" />
                          QR
                        </Button>
                        <Button variant="secondary" onClick={() => handleAddPayment('Transfer Bank')}>
                          <Landmark className="mr-2 h-4 w-4" />
                          Transfer Bank
                        </Button>
                    </div>
                )}
            </div>
            <DialogFooter>
               <Button 
                className="w-full" 
                size="lg" 
                onClick={completeSale}
                disabled={remainingAmount > 0.001 || cart.length === 0}
              >
                Selesaikan Penjualan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog QR Code */}
        <Dialog open={isQrDialogOpen} onOpenChange={setQrDialogOpen}>
          <DialogContent className="sm:max-w-xs">
            <DialogHeader>
              <DialogTitle>Pembayaran QR</DialogTitle>
              <DialogDescription>
                Pindai kode QR di bawah ini untuk membayar.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-4">
                <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pay-Rp${(remainingAmount > 0 ? remainingAmount : 0).toLocaleString('id-ID')}`}
                    alt="QR Code Pembayaran"
                    width={200}
                    height={200}
                />
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Tagihan</p>
                    <p className="text-2xl font-bold">Rp{(remainingAmount > 0 ? remainingAmount : 0).toLocaleString('id-ID')}</p>
                </div>
            </div>
            <DialogFooter>
              <Button className="w-full" onClick={confirmQrPayment}>
                Konfirmasi Pembayaran
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </>
  );
}
