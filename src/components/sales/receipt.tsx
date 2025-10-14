'use client';

import React from 'react';
import { NovaPosIcon } from '@/components/icons/nova-pos-icon';

type CartItem = {
    name: string;
    price: number;
    quantity: number;
};

export type SaleData = {
    cart: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
};

interface ReceiptProps {
  sale: SaleData;
}

export function Receipt({ sale }: ReceiptProps) {
  const { cart, subtotal, discount, tax, total } = sale;
  const printDate = new Date().toLocaleString();

  return (
    <div className="text-black bg-white">
      <div className="text-center mb-2">
        <NovaPosIcon className="mx-auto h-8 w-8" />
        <h2 className="text-lg font-bold">Nova POS</h2>
        <p>123 Coffee St, Jakarta</p>
        <p>{printDate}</p>
      </div>
      <hr />
      <div className="mb-1">
        {cart.map((item, index) => (
          <div key={index} className="item">
            <div>{item.quantity}x {item.name}</div>
            <div className="text-right">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <hr />
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
        <hr />
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Thank you!</p>
      </div>
    </div>
  );
};
