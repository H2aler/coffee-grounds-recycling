"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Mail, Phone, MapPin, ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제로는 API로 전송하거나 이메일 서비스를 사용
    // 여기서는 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* 배경 파티클 효과 */}
      <div className="fixed inset-0 z-0">
        <CoffeeParticleScene />
      </div>

      {/* 네비게이션 바 */}
      <div className="fixed top-6 left-6 z-50">
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
      </div>

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Coffee className="w-16 h-16 text-coffee-600 dark:text-coffee-400 mx-auto" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              <span className="bg-gradient-to-r from-coffee-600 to-orange-600 bg-clip-text text-transparent">
                문의하기
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              커피박 재활용에 대한 문의사항이나 제안사항을 보내주세요
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 연락처 정보 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  연락처 정보
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-lg">
                      <Mail className="w-6 h-6 text-coffee-600 dark:text-coffee-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">이메일</h3>
                      <a href="mailto:mastice@naver.com" className="text-gray-600 dark:text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                        mastice@naver.com
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        (마스티체 이메일)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-lg">
                      <Phone className="w-6 h-6 text-coffee-600 dark:text-coffee-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">전화</h3>
                      <a href="tel:010-7356-2482" className="text-gray-600 dark:text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                        010-7356-2482
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        (마스티체 연락처)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-lg">
                      <MapPin className="w-6 h-6 text-coffee-600 dark:text-coffee-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">주소</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        경기도 안산시 상록구 송호1길 59<br />
                        (이동) 1F Mastice space
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 문의 폼 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      문의가 접수되었습니다!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      빠른 시일 내에 답변드리겠습니다.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          이름 *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                          placeholder="홍길동"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          이메일 *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          전화번호
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                          placeholder="010-1234-5678"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          문의 유형 *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors"
                        >
                          <option value="">선택해주세요</option>
                          <option value="product">제품 문의</option>
                          <option value="purchase">구매 문의</option>
                          <option value="construction">시공 문의</option>
                          <option value="class">원데이 클래스 문의</option>
                          <option value="partnership">협업/파트너십 문의</option>
                          <option value="technical">기술 문의</option>
                          <option value="other">기타</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        메시지 *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-colors resize-none"
                        placeholder="문의사항을 입력해주세요..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-coffee-700 to-orange-700 dark:from-coffee-600 dark:to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>전송 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>문의 보내기</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

