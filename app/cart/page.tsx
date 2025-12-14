"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, Package, CreditCard } from "lucide-react";
import Link from "next/link";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getProductById } from "@/utils/products";
import { Edit2, Check, X } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, updateItemColor, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isDark, toggleTheme, mounted } = useTheme();
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <CoffeeParticleScene />
        </div>

        <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
          <Link href="/products" prefetch={true}>
            <motion.button
              className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 min-w-[44px] min-h-[44px] touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="hidden sm:inline text-gray-700 dark:text-gray-200">쇼핑 계속하기</span>
            </motion.button>
          </Link>
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow min-w-[44px] min-h-[44px] touch-manipulation"
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
              <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                장바구니가 비어있습니다
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                제품을 장바구니에 담아보세요
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
        <Link href="/products">
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 min-w-[44px] min-h-[44px] touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">쇼핑 계속하기</span>
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
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <ShoppingCart className="w-10 h-10 text-coffee-600 dark:text-coffee-400" />
              장바구니
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {getTotalItems()}개의 제품이 담겨있습니다
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 장바구니 아이템 목록 */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-coffee-100 to-orange-100 dark:from-coffee-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image || "☕"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {item.category}
                          </p>
                          {item.color && (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {(() => {
                                  const product = getProductById(item.id);
                                  const colorName = product?.colors.find(c => c.code === item.color)?.name || "선택된 색상";
                                  return colorName;
                                })()}
                              </span>
                              {editingItemId === item.id ? (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setEditingItemId(null)}
                                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                  <X className="w-3 h-3" />
                                </motion.button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setEditingItemId(item.id)}
                                  className="p-1 text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400"
                                  title="색상 변경"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </motion.button>
                              )}
                            </div>
                          )}
                          {editingItemId === item.id && (() => {
                            const product = getProductById(item.id);
                            if (!product || !product.colors.length) return null;
                            return (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                              >
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  색상 선택
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {product.colors.map((color, colorIndex) => (
                                    <motion.button
                                      key={colorIndex}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => {
                                        updateItemColor(item.id, color.code);
                                        setEditingItemId(null);
                                      }}
                                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                                        item.color === color.code
                                          ? "border-coffee-600 dark:border-coffee-400 shadow-lg scale-110"
                                          : "border-gray-300 dark:border-gray-600 hover:border-coffee-400 dark:hover:border-coffee-500"
                                      }`}
                                      style={{ backgroundColor: color.code }}
                                      title={color.name}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            );
                          })()}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                        </motion.button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">수량:</span>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">
                            {(item.price * item.quantity).toLocaleString()}원
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            단가: {item.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* 장바구니 비우기 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                장바구니 비우기
              </motion.button>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-coffee-600" />
                  주문 요약
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>상품 금액</span>
                    <span>{getTotalPrice().toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>배송비</span>
                    <span>{getTotalPrice() >= 50000 ? "무료" : "5,000원"}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">총 결제금액</span>
                      <span className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">
                        {(getTotalPrice() + (getTotalPrice() >= 50000 ? 0 : 5000)).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    💡 50,000원 이상 구매 시 배송비 무료
                  </p>
                </div>
                <Link href="/checkout" prefetch={true}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    주문하기
                  </motion.button>
                </Link>
                <Link href="/products" prefetch={true}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-3 px-6 py-3 bg-white dark:bg-gray-700 text-coffee-600 dark:text-coffee-400 border-2 border-coffee-600 dark:border-coffee-400 rounded-xl font-semibold"
                  >
                    쇼핑 계속하기
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

