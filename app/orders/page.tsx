"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Calendar, MapPin, Phone, Mail, Truck, CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useOrder } from "@/contexts/OrderContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrder();
  const { isDark, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "주문접수":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "결제완료":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "배송준비":
        return <Package className="w-5 h-5 text-yellow-500" />;
      case "배송중":
        return <Truck className="w-5 h-5 text-orange-500" />;
      case "배송완료":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "취소":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "주문접수":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300";
      case "결제완료":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "배송준비":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300";
      case "배송중":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300";
      case "배송완료":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "취소":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <CoffeeParticleScene />
        </div>

        <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
          <Link href="/" prefetch={true}>
            <motion.button
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">홈으로</span>
            </motion.button>
          </Link>
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xl" suppressHydrationWarning>{mounted ? (isDark ? "☀️" : "🌙") : "🌙"}</span>
          </motion.button>
        </div>

        <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12"
            >
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                주문 내역이 없습니다
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                아직 주문한 제품이 없습니다
              </p>
              <Link href="/products" prefetch={true}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  제품 보러가기
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* 배경 파티클 효과 */}
      <div className="fixed inset-0 z-0">
        <CoffeeParticleScene />
      </div>

      {/* 네비게이션 바 */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
        <Link href="/">
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">홈으로</span>
          </motion.button>
        </Link>
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">{isDark ? "☀️" : "🌙"}</span>
        </motion.button>
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <Package className="w-10 h-10 text-coffee-600 dark:text-coffee-400" />
              주문 내역
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              총 {orders.length}개의 주문이 있습니다
            </p>
          </motion.div>

          {/* 주문 목록 */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8"
              >
                {/* 주문 헤더 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        주문번호: {order.id}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">
                      {(order.totalPrice + order.shippingFee).toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      배송비 포함
                    </p>
                  </div>
                </div>

                {/* 주문 상품 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    주문 상품
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-coffee-100 to-orange-100 dark:from-coffee-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {item.image || "☕"}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.category} · 수량: {item.quantity}개
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {(item.price * item.quantity).toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 배송 정보 */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-coffee-600" />
                      배송지 정보
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-2 text-sm">
                      <p className="text-gray-900 dark:text-gray-100 font-semibold">
                        {order.customerInfo.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        [{order.customerInfo.postalCode}] {order.customerInfo.address}
                        {order.customerInfo.addressDetail && ` ${order.customerInfo.addressDetail}`}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        {order.customerInfo.phone}
                      </div>
                      {order.customerInfo.deliveryRequest && (
                        <p className="text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                          <strong>배송 요청사항:</strong> {order.customerInfo.deliveryRequest}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-coffee-600" />
                      결제 정보
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">결제 방법</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">
                          {order.paymentMethod === "card" ? "💳 신용카드" : order.paymentMethod === "bank" ? "🏦 계좌이체" : "📱 휴대폰 결제"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">상품 금액</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {order.totalPrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">배송비</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {order.shippingFee === 0 ? "무료" : `${order.shippingFee.toLocaleString()}원`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">총 결제금액</span>
                        <span className="font-bold text-coffee-600 dark:text-coffee-400">
                          {(order.totalPrice + order.shippingFee).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 배송 추적 */}
                {order.trackingNumber && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">배송 추적번호</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

