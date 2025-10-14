'use client';

import React from 'react';
import { NovaPosIcon } from '@/components/icons/nova-pos-icon';

type CartItem = {
    name: string;
    price: number;
    quantity: number;
};

type SaleData = {
    cart: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
};

interface ReceiptProps {
  sale: SaleData;
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ sale }, ref) => {
  const { cart, subtotal, discount, tax, total } = sale;
  const printDate = new Date().toLocaleString();

  return (
    <div ref={ref} className="p-8 font-mono text-xs text-black bg-white">
      <div className="text-center mb-4">
        <NovaPosIcon className="mx-auto h-12 w-12" />
        <h2 className="text-xl font-bold">Nova POS</h2>
        <p>123 Coffee St, Jakarta</p>
        <p>www.novapos.example</p>
        <p>{printDate}</p>
      </div>
      <hr className="my-2 border-dashed border-black" />
      <div className="mb-2">
        <div className="flex justify-between font-bold">
          <span>ITEM</span>
          <span>TOTAL</span>
        </div>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.quantity}x {item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr className="my-2 border-dashed border-black" />
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>DISCOUNT</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>TAX (11%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <hr className="my-2 border-dashed border-black" />
        <div className="flex justify-between font-bold text-base">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

    