"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "./CartContext";

export interface Order {
  id: string;
  orderDate: string;
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    addressDetail?: string;
    postalCode: string;
    deliveryRequest?: string;
  };
  paymentMethod: string;
  status: "주문접수" | "결제완료" | "배송준비" | "배송중" | "배송완료" | "취소";
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderDate" | "status">) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  getTotalOrders: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // 로컬 스토리지에서 주문 내역 불러오기
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to load orders from localStorage", e);
      }
    }
  }, []);

  // 주문 내역 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, "id" | "orderDate" | "status">): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date().toISOString(),
      status: "주문접수",
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder.id;
  };

  const getOrder = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status, trackingNumber: status === "배송중" ? `TRACK-${Date.now()}` : order.trackingNumber } : order
      )
    );
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        updateOrderStatus,
        getTotalOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

