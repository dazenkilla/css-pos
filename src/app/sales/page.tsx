"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { inventoryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlusCircle, MinusCircle, X, ShoppingCart, ScanLine } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrScanner } from '@yudiel/react-qr-scanner';

type CartItem = typeof inventoryItems[0] & { quantity: number };

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
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
    toast({
      title: "Item Added",
      description: `${product.name} has been added to the cart.`,
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

  const handleScan = (result: string) => {
      setScannerOpen(false);
      const product = inventoryItems.find(item => item.sku === result);
      if (product) {
        addToCart(product);
        toast({
          title: "Product Scanned",
          description: `${product.name} added to cart.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Scan Error",
          description: `Product with SKU "${result}" not found.`,
        });
      }
  };

  const handleScanError = (err: any) => {
    console.error(err);
    setScannerOpen(false);
    toast({
      variant: "destructive",
      title: "Scan Error",
      description: "Could not access the camera. Please check permissions and try again.",
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.11; // PPN 11%
  const total = subtotal + tax;

  const categories = [...new Set(inventoryItems.map(item => item.category))];

  const getImageUrl = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/300/200';
  };
  
  const getImageHint = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageHint : 'product';
  };
  
  const completeSale = () => {
    toast({
      title: "Sale Complete!",
      description: `Total: $${total.toFixed(2)}`,
    });
    setCart([]);
    setPaymentDialogOpen(false);
  }

  return (
    <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex items-center justify-between">
            <Tabs defaultValue={categories[0] || 'all'}>
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
             <Button variant="outline" onClick={() => setScannerOpen(true)}>
                <ScanLine className="h-4 w-4 mr-2" />
                Scan Product
            </Button>
        </div>
        <Tabs defaultValue={categories[0] || 'all'}>
            {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {inventoryItems.filter(item => item.category === category).map((product) => (
                  <Card key={product.sku} className="overflow-hidden">
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
                    <CardFooter className="flex flex-col items-start p-4 gap-2">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                      <Button className="w-full" size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>New Sale</CardTitle>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.sku} className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.sku, -1)}><MinusCircle className="h-4 w-4" /></Button>
                      <span>{item.quantity}</span>
                      <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.sku, 1)}><PlusCircle className="h-4 w-4" /></Button>
                    </div>
                    <p className="font-semibold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button size="icon" variant="ghost" className="text-muted-foreground" onClick={() => removeFromCart(item.sku)}><X className="h-4 w-4"/></Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {cart.length > 0 && (
            <>
              <Separator className="my-4" />
              <CardFooter className="flex flex-col gap-2 items-stretch">
                <div className="flex justify-between w-full text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between w-full text-muted-foreground"><span>Tax (11%)</span><span>${tax.toFixed(2)}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between w-full font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <Button className="w-full mt-4" onClick={() => setPaymentDialogOpen(true)}>Charge</Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
      <Dialog open={isPaymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>Total amount: <span className="font-bold text-foreground">${total.toFixed(2)}</span></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button variant="default" size="lg" onClick={completeSale}>Pay with Card</Button>
            <Button variant="secondary" size="lg" onClick={completeSale}>Pay with Cash</Button>
            <Button variant="secondary" size="lg" onClick={completeSale}>Other Payment Method</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isScannerOpen} onOpenChange={setScannerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Barcode/QR Code</DialogTitle>
            <DialogDescription>Point the camera at a barcode or QR code.</DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-lg">
              {isScannerOpen && (
                <QrScanner
                    onDecode={handleScan}
                    onError={handleScanError}
                />
              )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
