"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Coffee, ArrowLeft, ShoppingCart, Palette, Sparkles, CheckCircle, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "@/utils/products";

export default function ProductsPage() {
  const { isDark, toggleTheme, mounted } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({});
  const { addToCart, getTotalItems } = useCart();
  const { showSuccess } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* 배경 파티클 효과 */}
      <div className="fixed inset-0 z-0">
        <CoffeeParticleScene />
      </div>

      {/* 네비게이션 바 */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
        <Link href="/" prefetch={true}>
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">홈으로</span>
          </motion.button>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/cart" prefetch={true}>
            <motion.button
              className="relative p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
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
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Palette className="w-16 h-16 text-coffee-600 dark:text-coffee-400 mx-auto" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              <span className="bg-gradient-to-r from-coffee-600 to-orange-600 bg-clip-text text-transparent">
                커피박 페인트 제품
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              마스티체와 함께 개발한 친환경 커피박 페인트 제품을 만나보세요
            </p>
          </motion.div>

          {/* 제품 목록 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => setSelectedProduct(product.id)}
              >
                <div className="mb-4 text-center flex items-center justify-center min-h-[200px] relative">
                  {product.image.startsWith('/') ? (
                    <img
                      src={product.image.replace(/#/g, '%23')}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain rounded-lg max-w-full max-h-[200px]"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image load error:', product.image);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="text-6xl">🖼️</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="text-6xl">{product.image}</div>
                  )}
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-coffee-100 dark:bg-coffee-900/30 text-coffee-700 dark:text-coffee-300 text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 min-h-[3rem]">
                  {product.description}
                </p>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    {product.price > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">
                          {product.price.toLocaleString()}원
                        </span>
                        {product.pricePerL && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product.pricePerL}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">
                        {product.pricePerL}
                      </span>
                    )}
                  </div>
                </div>
                {/* 색상 선택 */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    색상 선택
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, i) => {
                      const isSelected = (selectedColors[product.id] ?? 0) === i;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColors(prev => ({ ...prev, [product.id]: i }));
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            isSelected
                              ? "border-coffee-600 dark:border-coffee-400 shadow-lg scale-110"
                              : "border-gray-300 dark:border-gray-600 hover:border-coffee-400 dark:hover:border-coffee-500"
                          }`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {product.colors[selectedColors[product.id] ?? 0]?.name || product.colors[0].name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/products/${product.id}`} className="flex-1" prefetch={true}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-white dark:bg-gray-700 text-[#654321] dark:text-[#654A21] border-2 border-[#654321] dark:border-[#654A21] rounded-xl font-semibold hover:bg-[#654321]/10 dark:hover:bg-[#654A21]/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      상세보기
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-[#654321] hover:bg-[#473417] dark:bg-[#654A21] dark:hover:bg-[#654321] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const selectedColorIndex = selectedColors[product.id] ?? 0;
                      addToCart({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        color: product.colors[selectedColorIndex].code,
                        image: product.image,
                      });
                      showSuccess(`${product.name}이(가) 장바구니에 추가되었습니다!`);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    담기
                  </motion.button>
                </div>
                {product.masticeUrl && (
                  <motion.a
                    href={product.masticeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    마스티체 사이트
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>

          {/* 제품 특징 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-coffee-600 dark:text-coffee-400" />
              제품 특징
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🌱", title: "친환경", desc: "커피박 재활용으로 환경 보호" },
                { icon: "💨", title: "저VOC", desc: "실내 공기 질 개선" },
                { icon: "🎨", title: "독특한 색상", desc: "자연스러운 갈색 톤" },
                { icon: "✨", title: "기능성", desc: "공기 정화 및 탈취 효과" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-coffee-50 to-orange-50 dark:from-coffee-900/20 dark:to-orange-900/20 rounded-2xl"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 협업 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">제품 문의 및 협업</h2>
            <p className="text-lg mb-6 text-white/90">
              대량 구매, 맞춤 제작, 협업 문의는 언제든지 연락주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" prefetch={true}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-coffee-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  문의하기
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all"
              >
                010-7356-2482
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

