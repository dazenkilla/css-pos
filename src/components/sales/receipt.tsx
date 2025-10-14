
'use client';

import React from 'react';
import Image from 'next/image';

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
    payments: { method: string; amount: number }[];
    totalPaid: number;
    change: number;
    tableNumber?: string;
};

interface ReceiptProps {
  sale: SaleData;
}

export function Receipt({ sale }: ReceiptProps) {
  const { cart, subtotal, discount, tax, total, totalPaid, change, payments, tableNumber } = sale;
  const printDate = new Date().toLocaleString('id-ID');

  return (
    <div className="text-black bg-white">
      <div className="text-center mb-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} className="mx-auto h-8 w-8" />
        <h2 className="text-lg font-bold">Creative Software Solution</h2>
        <p>alamat bandung</p>
        <p>{printDate}</p>
        {tableNumber && <p>No. Meja: {tableNumber}</p>}
      </div>
      <hr />
      <div className="mb-1">
        {cart.map((item, index) => (
          <div key={index} className="item">
            <div>{item.quantity}x {item.name}</div>
            <div className="item-info">
                <span>@{item.price.toFixed(0)}</span>
                <span>Rp{(item.price * item.quantity).toFixed(0)}</span>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>Rp{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>DISKON</span>
          <span>-Rp{discount.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>PAJAK (11%)</span>
          <span>Rp{tax.toFixed(0)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>Rp{total.toFixed(0)}</span>
        </div>
      </div>
       <hr />
      <div className="space-y-1">
        {payments.map((p, i) => (
             <div className="flex justify-between" key={i}>
                <span>{p.method}</span>
                <span>Rp{p.amount.toFixed(0)}</span>
            </div>
        ))}
        <div className="flex justify-between">
          <span>TOTAL BAYAR</span>
          <span>Rp{totalPaid.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>KEMBALI</span>
          <span>Rp{(change > 0 ? change : 0).toFixed(0)}</span>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Terima kasih!</p>
      </div>
    </div>
  );
};

    