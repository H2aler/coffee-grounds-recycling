"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, CreditCard, Package, Truck, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { showSuccess } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    addressDetail: "",
    postalCode: "",
    deliveryRequest: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 장바구니가 비어있으면 리다이렉트
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const shippingFee = getTotalPrice() >= 50000 ? 0 : 5000;
    
    // 주문 저장
    const newOrderId = addOrder({
      items: items,
      totalPrice: getTotalPrice(),
      shippingFee: shippingFee,
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        addressDetail: formData.addressDetail,
        postalCode: formData.postalCode,
        deliveryRequest: formData.deliveryRequest,
      },
      paymentMethod: formData.paymentMethod,
    });
    
    setOrderId(newOrderId);
    showSuccess("주문이 접수되었습니다!");
    
    // 주문 처리 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderComplete(true);
      clearCart();
    }, 1500);
  };

  const shippingFee = getTotalPrice() >= 50000 ? 0 : 5000;
  const totalPrice = getTotalPrice() + shippingFee;

  if (items.length === 0 && !isOrderComplete) {
    return null;
  }

  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <CoffeeParticleScene />
        </div>

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              주문이 완료되었습니다!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              주문해주셔서 감사합니다. 빠른 시일 내에 배송해드리겠습니다.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              주문번호: {orderId}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/orders" prefetch={true}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg"
                >
                  주문 내역 보기
                </motion.button>
              </Link>
              <Link href="/products" prefetch={true}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-gray-700 text-coffee-600 dark:text-coffee-400 border-2 border-coffee-600 dark:border-coffee-400 rounded-xl font-semibold text-lg"
                >
                  쇼핑 계속하기
                </motion.button>
              </Link>
            </div>
          </motion.div>
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
      <div className="fixed top-6 left-6 z-50">
        <Link href="/cart" prefetch={true}>
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">장바구니로</span>
          </motion.button>
        </Link>
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <CreditCard className="w-10 h-10 text-coffee-600 dark:text-coffee-400" />
              주문하기
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              배송 정보를 입력하고 주문을 완료해주세요
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 주문 폼 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 배송 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-coffee-600" />
                  배송 정보
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        전화번호 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        우편번호 *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="12345"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        주소 *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="기본 주소"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      상세 주소
                    </label>
                    <input
                      type="text"
                      name="addressDetail"
                      value={formData.addressDetail}
                      onChange={handleChange}
                      placeholder="상세 주소 (선택사항)"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      배송 요청사항
                    </label>
                    <textarea
                      name="deliveryRequest"
                      value={formData.deliveryRequest}
                      onChange={handleChange}
                      rows={3}
                      placeholder="배송 시 요청사항을 입력해주세요 (선택사항)"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors resize-none"
                    />
                  </div>

                  {/* 결제 방법 */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      결제 방법
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { value: "card", label: "신용카드", icon: "💳" },
                        { value: "bank", label: "계좌이체", icon: "🏦" },
                        { value: "phone", label: "휴대폰 결제", icon: "📱" }
                      ].map((method) => (
                        <motion.button
                          key={method.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.paymentMethod === method.value
                              ? "border-coffee-600 dark:border-coffee-400 bg-coffee-50 dark:bg-coffee-900/20"
                              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                          }`}
                        >
                          <div className="text-3xl mb-2">{method.icon}</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {method.label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* 주문 버튼 */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className={`w-full mt-6 px-8 py-4 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        주문 처리 중...
                      </>
                    ) : (
                      "주문하기"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-coffee-600" />
                  주문 요약
                </h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>상품 금액</span>
                    <span>{getTotalPrice().toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>배송비</span>
                    <span>{shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">총 결제금액</span>
                      <span className="text-xl font-bold text-coffee-600 dark:text-coffee-400">
                        {totalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <strong>연락처</strong>
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    📞 010-7356-2482<br />
                    ✉️ mastice@naver.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

