"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { inventoryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlusCircle, MinusCircle, X, ShoppingCart, Ticket, Printer } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReactToPrint } from 'react-to-print';
import { Receipt } from '@/components/sales/receipt';

type CartItem = typeof inventoryItems[0] & { quantity: number };
type Payment = { method: 'Cash' | 'Card'; amount: number };

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [lastSale, setLastSale] = useState<{ cart: CartItem[], total: number, discount: number, tax: number, subtotal: number } | null>(null);

  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);

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
        title: "Discount Applied",
        description: `${newDiscount}% discount has been applied to the subtotal.`
      })
    } else {
      toast({
        variant: 'destructive',
        title: "Invalid Discount",
        description: "Please enter a valid percentage between 0 and 100."
      })
    }
  }
  
  const handleAddPayment = (method: 'Cash' | 'Card') => {
    if (remainingAmount > 0) {
        setPayments([...payments, { method, amount: remainingAmount > 0 ? remainingAmount : 0 }]);
    }
  };

  const handlePaymentAmountChange = (index: number, newAmount: number) => {
    const newPayments = [...payments];
    newPayments[index].amount = newAmount;
    setPayments(newPayments);
  };
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const completeSale = () => {
    // Here you would typically save the sale to a database
    setLastSale({ cart, total, discount: totalDiscount, tax, subtotal });
    toast({
      title: "Sale Complete!",
      description: `Total: $${total.toFixed(2)}`,
      action: <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print Receipt</Button>
    });
    // Reset state for next sale
    setCart([]);
    setDiscount(0);
    setPayments([]);
    setPaymentDialogOpen(false);
  }

  return (
    <>
      <div className="hidden">
        {lastSale && <Receipt ref={receiptRef} sale={lastSale} />}
      </div>
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
                  <div className="flex justify-between w-full text-muted-foreground">
                    <span>Discount ({discount}%)</span>
                    <span>-${totalDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground"><span>Tax (11%)</span><span>${tax.toFixed(2)}</span></div>
                  <Separator className="my-2" />
                  <div className="flex justify-between w-full font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full mt-4" onClick={() => setDiscountDialogOpen(true)}>
                      <Ticket className="mr-2 h-4 w-4"/>
                      Add Discount
                    </Button>
                    <Button className="w-full mt-4" onClick={() => setPaymentDialogOpen(true)}>Charge</Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>

        {/* Discount Dialog */}
        <Dialog open={isDiscountDialogOpen} onOpenChange={setDiscountDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply Discount</DialogTitle>
              <DialogDescription>Enter a discount percentage to apply to the subtotal.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. 10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={applyDiscount}>Apply Discount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>
                Split payment across multiple methods if needed.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-4xl font-bold">${total.toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Payments</p>
                  {payments.map((payment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                      <span className="font-semibold flex-1">{payment.method}</span>
                       <Input 
                        type="number"
                        value={payment.amount.toFixed(2)}
                        onChange={(e) => handlePaymentAmountChange(index, parseFloat(e.target.value) || 0)}
                        className="w-32"
                       />
                       <Button variant="ghost" size="icon" onClick={() => setPayments(payments.filter((_, i) => i !== index))}>
                          <X className="h-4 w-4" />
                       </Button>
                    </div>
                  ))}
                  {payments.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No payments added yet.</p>}
                </div>

                <div className="flex justify-between items-center text-lg font-semibold bg-muted p-3 rounded-md">
                    <span>Remaining</span>
                    <span>${remainingAmount.toFixed(2)}</span>
                </div>

                {remainingAmount > 0 && (
                    <div className="flex gap-2 justify-center">
                        <Button variant="secondary" onClick={() => handleAddPayment('Cash')}>Pay with Cash</Button>
                        <Button variant="secondary" onClick={() => handleAddPayment('Card')}>Pay with Card</Button>
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
                Complete Sale
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

    