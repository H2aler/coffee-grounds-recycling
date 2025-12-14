"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle, Star, Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "@/utils/products";

// 정적 내보내기를 위한 generateStaticParams 함수
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const { addToCart, getTotalItems } = useCart();
  const { showSuccess } = useToast();
  const { isDark, toggleTheme, mounted } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const product = useMemo(() => products.find(p => p.id === productId), [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">제품을 찾을 수 없습니다</h1>
          <Link href="/products" prefetch={true}>
            <button className="px-6 py-3 bg-[#654321] hover:bg-[#473417] text-white rounded-xl transition-colors">
              제품 목록으로
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = useCallback(() => {
    // 같은 제품이 이미 장바구니에 있으면 수량만 증가시키고, 없으면 새로 추가
    // CartContext의 addToCart가 이미 수량을 관리하므로, 수량만큼 호출
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        color: product.colors[selectedColor].code,
        image: product.image,
      });
    }
    showSuccess(`${product.name} ${quantity}개가 장바구니에 추가되었습니다!`);
  }, [product, quantity, selectedColor, addToCart, showSuccess]);

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
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">목록으로</span>
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 제품 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 flex items-center justify-center"
            >
              <div className="text-center w-full">
                <div className="mb-6 flex items-center justify-center min-h-[400px] relative">
                  {product.image.startsWith('/') ? (
                    <Image
                      src={product.image.split('/').map((part, index) => 
                        index === 0 ? part : encodeURIComponent(part)
                      ).join('/')}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="object-contain rounded-lg max-w-full max-h-[500px]"
                      loading="lazy"
                      priority={false}
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="text-9xl">🖼️</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="text-9xl">{product.image}</div>
                  )}
                </div>
                <div className="inline-block px-4 py-2 bg-[#654321]/10 dark:bg-[#654A21]/20 text-[#654321] dark:text-[#654A21] rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              </div>
            </motion.div>

            {/* 제품 정보 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed font-medium">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-3 mb-6">
                  {product.price > 0 ? (
                    <>
                      <span className="text-4xl font-bold text-coffee-600 dark:text-coffee-400">
                        {product.price.toLocaleString()}원
                      </span>
                      {product.pricePerL && (
                        <span className="text-lg text-gray-500 dark:text-gray-400">
                          {product.pricePerL}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-coffee-600 dark:text-coffee-400">
                      {product.pricePerL}
                    </span>
                  )}
                </div>
              </div>

              {/* 색상 선택 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  색상 선택
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(index)}
                      className={`w-16 h-16 rounded-full border-4 transition-all ${
                        selectedColor === index
                          ? "border-[#654321] dark:border-[#654A21] shadow-lg scale-110"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  선택된 색상: {product.colors[selectedColor].name}
                </p>
              </div>

              {/* 수량 선택 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  수량
                </h3>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 w-12 text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                {product.price > 0 && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    총 가격: {(product.price * quantity).toLocaleString()}원
                  </p>
                )}
              </div>

              {/* 구매 버튼 */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 px-8 py-4 bg-[#654321] hover:bg-[#473417] dark:bg-[#654A21] dark:hover:bg-[#654321] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    장바구니에 담기
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleAddToCart();
                      setTimeout(() => {
                        window.location.href = "/checkout";
                      }, 300);
                    }}
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-[#654321] dark:text-[#654A21] border-2 border-[#654321] dark:border-[#654A21] rounded-xl font-semibold text-lg hover:bg-[#654321]/10 dark:hover:bg-[#654A21]/10 transition-colors"
                  >
                    바로 구매
                  </motion.button>
                </div>
                {product.masticeUrl && (
                  <motion.a
                    href={product.masticeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    마스티체 사이트에서 보기
                  </motion.a>
                )}
              </div>

              {/* 제품 특징 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  제품 특징
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 상세 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              제품 상세 정보
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  제품 설명
                </h3>
                <div className="text-base sm:text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-medium space-y-3">
                  {product.fullDescription
                    .split(/(?<=[.!?])\s+/)
                    .filter(sentence => sentence.trim().length > 0)
                    .map((sentence, index) => (
                      <p key={index} className="mb-3">
                        {sentence.trim()}
                      </p>
                    ))}
                </div>
              </div>
                <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#654321]/5 dark:bg-[#654A21]/10 p-5 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                    용량
                  </h4>
                  <p className="text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
                    {product.sizes.join(", ")}
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    도포 면적
                  </h4>
                  <p className="text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
                    {product.coverage}
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    건조 시간
                  </h4>
                  <p className="text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
                    {product.dryTime}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

