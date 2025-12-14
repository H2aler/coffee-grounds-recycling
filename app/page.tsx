"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Leaf, Recycle, TrendingUp, Sparkles, Search, ArrowRight, Zap, ArrowLeft, Handshake, Package, ShoppingCart, Wrench, CheckCircle, X, Bot, MessageCircle, HelpCircle, Star, Lightbulb, Phone, Mail, BookOpen, TrendingDown, Heart, ArrowUp, Calculator, Palette, Home, Info, Settings, Clock, DollarSign, FileText, Users, RotateCcw, Award, ExternalLink, Newspaper } from "lucide-react";
import Link from "next/link";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import InteractiveStats from "@/components/InteractiveStats";
import FloatingCards from "@/components/FloatingCards";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

// 검색어 하이라이트 함수
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
  section: string;
  type: 'section' | 'page';
  keywords: string[];
}

const searchResults: SearchResult[] = [
  {
    id: 'recycle',
    title: '재활용 방법',
    description: '커피박을 활용한 다양한 재활용 아이디어',
    section: 'recycle',
    type: 'section',
    keywords: ['재활용', '방법', '아이디어', '활용', '페인트', '탈취제', '인테리어', 'DIY']
  },
  {
    id: 'partnership',
    title: '파트너십',
    description: '마스티체와 함께하는 커피박 페인트 연구 개발 및 판매',
    section: 'partnership',
    type: 'section',
    keywords: ['파트너', '마스티체', '협약', '협력', '제조', '생산']
  },
  {
    id: 'rd',
    title: '연구 개발 과정',
    description: '마스티체와 함께하는 커피박 페인트 연구 개발의 단계별 과정',
    section: 'rd',
    type: 'section',
    keywords: ['연구', '개발', '과정', '단계', 'R&D', '기술']
  },
  {
    id: 'service',
    title: '시공/서비스 안내',
    description: '전문 시공 서비스와 다양한 옵션을 제공합니다',
    section: 'service',
    type: 'section',
    keywords: ['시공', '서비스', '안내', '시공팀', 'A/S', '점검']
  },
  {
    id: 'products',
    title: '제품 보기',
    description: '커피박 친환경 페인트 제품 목록',
    section: '/products',
    type: 'page',
    keywords: ['제품', '페인트', '구매', '상품', '가격']
  }
];

export default function CoffeeGroundsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showAIDI, setShowAIDI] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNewsWidget, setShowNewsWidget] = useState(true);
  const [isNewsWidgetExpanded, setIsNewsWidgetExpanded] = useState(false);
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(0);
  
  // 엣지 패널 외부 클릭 시 닫기
  const edgePanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNewsWidgetExpanded && edgePanelRef.current && !edgePanelRef.current.contains(event.target as Node)) {
        setIsNewsWidgetExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNewsWidgetExpanded]);
  const [aidiTab, setAidiTab] = useState<'quick' | 'chat' | 'tools' | 'help'>('quick');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const [chatInput, setChatInput] = useState("");
  const { isDark, toggleTheme, mounted } = useTheme();
  const { getTotalItems } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // window 스크롤을 사용하여 경고 방지
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // AI 채팅 핸들러
  const handleChatSubmit = useCallback((message: string) => {
    if (!message.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { role: 'user' as const, message: message.trim() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // AI 응답 생성 (간단한 키워드 기반)
    setTimeout(() => {
      let aiResponse = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("제품") || lowerMessage.includes("추천")) {
        aiResponse = "추천 제품을 안내해드리겠습니다:\n\n1. [LINK:/products/1]Table / stool (set)[/LINK] - 핸드크래프트 가구\n2. [LINK:/products/2]Mastice Portfolio#141[/LINK] - 웨이브 스톤 텍스처\n3. [LINK:/products/3]Mastice Portfolio#129[/LINK] - 아트 플라스터\n\n제품을 클릭하면 자세한 정보를 확인하실 수 있습니다.";
      } else if (lowerMessage.includes("인테리어") || lowerMessage.includes("컨설팅")) {
        aiResponse = "인테리어 컨설팅 서비스를 제공하고 있습니다:\n\n• 색상 추천\n• 디자인 컨설팅\n• 견적 상담\n• 맞춤 제안\n\n문의 페이지에서 상담 신청이 가능합니다.";
      } else if (lowerMessage.includes("비용") || lowerMessage.includes("가격") || lowerMessage.includes("시공")) {
        aiResponse = "시공 비용은 면적과 제품에 따라 다릅니다:\n\n• 기본 시공: ㎡당 약 50,000원\n• 맞춤 제작: 제품별 상이\n• 정확한 견적: 문의 필요\n\n전화(010-7356-2482) 또는 이메일로 문의해주세요.";
      } else if (lowerMessage.includes("faq") || lowerMessage.includes("질문") || lowerMessage.includes("도움")) {
        aiResponse = "자주 묻는 질문:\n\n• 사용법: 일반 페인트와 동일하게 사용\n• 맞춤 제작: 가능 (2주 소요)\n• 배송: 택배/화물 착불\n• 환불: 맞춤 제작은 불가\n\n더 자세한 내용은 도움말 탭을 확인해주세요.";
      } else if (lowerMessage.includes("연락") || lowerMessage.includes("문의") || lowerMessage.includes("전화")) {
        aiResponse = "연락처 정보:\n\n📞 전화: 010-7356-2482\n✉️ 이메일: mastice@naver.com\n📍 주소: 경기도 안산시 상록구 송호1길 59\n\n평일 10:00~18:00 운영합니다.";
      } else {
        aiResponse = "죄송합니다. 더 구체적으로 질문해주시면 도와드리겠습니다.\n\n다음과 같은 질문이 가능합니다:\n• 제품 추천\n• 인테리어 컨설팅\n• 비용 문의\n• FAQ\n• 연락처";
      }

      setChatMessages(prev => [...prev, { role: 'ai' as const, message: aiResponse }]);
    }, 500);
  }, []);

  // 검색 결과 필터링 (메모이제이션)
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    return searchResults.filter(result =>
      result.title.toLowerCase().includes(lowerSearchTerm) ||
      result.description.toLowerCase().includes(lowerSearchTerm) ||
      result.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm))
    );
  }, [searchTerm]);

  // 검색 결과 클릭 핸들러
  const handleResultClick = useCallback((result: SearchResult) => {
    setSearchTerm("");
    setShowResults(false);
    
    if (result.type === 'page') {
      window.location.href = result.section;
    } else {
      const element = document.getElementById(result.section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  // 외부 클릭 시 검색 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50 dark:bg-gray-900 relative overflow-hidden" style={{ position: 'relative' }}>
      {/* 배경 파티클 효과 */}
      <div className="fixed inset-0 z-0">
        <CoffeeParticleScene />
      </div>

      {/* 갤럭시 엣지 패널 스타일 (좌측 상단) */}
      {showNewsWidget && (
        <div ref={edgePanelRef} className="fixed left-0 top-20 sm:top-24 z-50 flex items-start">
          {/* 핸들 (항상 보임 - 세로 NEWS 텍스트) */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsNewsWidgetExpanded(!isNewsWidgetExpanded);
            }}
            className="w-12 h-24 sm:h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-r-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer touch-manipulation min-w-[48px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="text-white font-bold text-base tracking-wider relative z-10" style={{ letterSpacing: '0.1em', writingMode: 'vertical-rl', textOrientation: 'upright' }}>
              NEWS
            </span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white/80"
            />
          </motion.button>

          {/* 패널 (왼쪽에서 오른쪽으로 슬라이드 - 버튼 누르기 전에는 완전히 숨김) */}
          {isNewsWidgetExpanded && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ 
                x: 0,
                opacity: 1,
              }}
              exit={{ 
                x: -400,
                opacity: 0,
              }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 40
              }}
              className="w-[calc(100vw-4rem)] sm:w-96 max-w-[calc(100vw-4rem)] sm:max-w-96 h-auto max-h-[calc(100vh-2rem)] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-r-2xl shadow-2xl border-r border-t border-b border-emerald-200/50 dark:border-emerald-700/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
              {/* 뉴스 탭 선택 */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedNewsIndex(0)}
                  className={`flex-1 px-3 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all touch-manipulation min-h-[44px] ${
                    selectedNewsIndex === 0
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  순환자원 지정
                </button>
                <button
                  onClick={() => setSelectedNewsIndex(1)}
                  className={`flex-1 px-3 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all touch-manipulation min-h-[44px] ${
                    selectedNewsIndex === 1
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  조례안 통과
                </button>
                <button
                  onClick={() => setSelectedNewsIndex(2)}
                  className={`flex-1 px-3 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all touch-manipulation min-h-[44px] ${
                    selectedNewsIndex === 2
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  조례안 상세
                </button>
              </div>

              {/* 첫 번째 기사: 순환자원 지정 */}
              {selectedNewsIndex === 0 && (
                <>
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                            정책 소식
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            2025년 7월 21일
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                          커피 찌꺼기가 <span className="text-emerald-700 dark:text-emerald-400">순환자원</span>으로 지정되었습니다!
                        </h3>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsNewsWidgetExpanded(false)}
                      className="p-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="닫기"
                    >
                      <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </motion.button>
                  </div>

                  {/* 내용 */}
                  <div className="space-y-4 mb-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      환경부가 커피 찌꺼기, 폐식용유, 왕겨·쌀겨를 순환자원으로 추가 지정했습니다. 
                      순환자원으로 지정되면 폐기물 규제를 면제받아 재활용이 더욱 활성화될 것으로 기대됩니다.
                    </p>
                    
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700/30">
                      <h4 className="font-semibold text-sm text-emerald-900 dark:text-emerald-300 mb-2">주요 내용</h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>커피 찌꺼기 연간 약 15만톤 배출</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>퇴비, 건축자재, 생활용품 등 다양한 분야 재활용 가능</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>바이오에너지로도 활용 가능</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 버튼 */}
                  <div className="flex justify-center">
                    <motion.a
                      href="https://www.nongmin.com/article/20250721500620"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all touch-manipulation min-h-[44px]"
                    >
                      <Newspaper className="w-4 h-4" />
                      <span>기사 보기</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </>
              )}

              {/* 두 번째 기사: 조례안 통과 */}
              {selectedNewsIndex === 1 && (
                <>
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                            정책 소식
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            2025년 11월 24일
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                          경기도 커피찌꺼기 재활용 지원 <span className="text-emerald-700 dark:text-emerald-400">조례안</span> 상임위 통과!
                        </h3>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsNewsWidgetExpanded(false)}
                      className="p-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="닫기"
                    >
                      <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </motion.button>
                  </div>

                  {/* 내용 */}
                  <div className="space-y-4 mb-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      김태희 경기도의원(더불어민주당, 안산2)이 대표발의한 「경기도 커피찌꺼기 재활용 지원 조례안」이 
                      11월 21일 제387회 정례회 제2차 도시환경위원회에서 원안 가결되었습니다.
                    </p>
                    
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700/30">
                      <h4 className="font-semibold text-sm text-emerald-900 dark:text-emerald-300 mb-2">주요 내용</h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>도지사의 커피찌꺼기 재활용 활성화 시책 수립·추진</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>경기도 커피찌꺼기 재활용 계획 수립</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>시·군 재활용 사업 지원 및 협력체계 구축</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                          <span>재활용 촉진 기여자에 대한 포상 근거 마련</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 버튼 */}
                  <div className="flex justify-center">
                    <motion.a
                      href="https://v.daum.net/v/20251124091946171?f=p"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all touch-manipulation min-h-[44px]"
                    >
                      <Newspaper className="w-4 h-4" />
                      <span>기사 보기</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </>
              )}

              {/* 세 번째 기사: 조례안 상세 */}
              {selectedNewsIndex === 2 && (
                <>
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                            정책 소식
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            2025년 11월 21일
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                          경기도 커피찌꺼기 재활용 지원 <span className="text-emerald-700 dark:text-emerald-400">조례안</span>
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            📅 2025년 11월 21일
                          </span>
                          <span className="flex items-center gap-1">
                            📍 도시환경위원회 회의실
                          </span>
                          <span className="flex items-center gap-1">
                            👤 수석전문위원 신성해
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsNewsWidgetExpanded(false)}
                      className="p-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="닫기"
                    >
                      <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </motion.button>
                  </div>

                  {/* 내용 */}
                  <div className="space-y-4 mb-6">
                    {/* 제안이유 */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border-l-4 border-amber-400">
                      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        제안이유
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        우리나라 커피산업이 대형화, 프랜차이즈화, 고급화 등으로 인해 커피소비가 급증함에 따라 
                        커피찌꺼기 발생량이 증가하고 있으며 이에 따른 폐기물 처리비용 또한 증가하고 있어 
                        커피찌꺼기의 처리 및 재활용 등을 위한 사회적 비용을 저감하기 위한 근본적인 대안 마련이 필요합니다.
                      </p>
                    </div>

                    {/* 주요내용 */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-l-4 border-green-400">
                      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-green-600" />
                        주요내용
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>재활용 활성화 시책 수립</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>재활용 추진계획 수립</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>재활용 활성화 사업 지원</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>협력체계 구축</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 버튼 */}
                  <div className="flex justify-center">
                    <Link href="/detail" prefetch={true}>
                      <motion.button
                        onClick={() => {
                          setIsNewsWidgetExpanded(false);
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }, 0);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all touch-manipulation min-h-[44px]"
                      >
                        <FileText className="w-4 h-4" />
                        <span>상세 내용 보기</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
          )}
        </div>
      )}

      {/* 상단 네비게이션 */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-8 z-50 flex items-start gap-2 sm:gap-3">
        {/* 첫 번째 줄: 장바구니, 다크모드, AIDI 버튼 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/cart" prefetch={true}>
            <motion.button
              className="relative p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </motion.button>
          </Link>
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow min-w-[44px] min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            suppressHydrationWarning
          >
            <span className="text-lg sm:text-xl">{mounted ? (isDark ? "☀️" : "🌙") : "🌙"}</span>
          </motion.button>
          <motion.button
            onClick={() => setShowAIDI(!showAIDI)}
            className="p-2.5 sm:p-3 rounded-full bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#C9A372] text-white shadow-lg hover:shadow-xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="AIDI 도우미"
            aria-label="AIDI 도우미 열기"
            aria-expanded={showAIDI}
            aria-controls="aidi-modal"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Bot className="w-4 h-4 sm:w-4 sm:h-4 relative z-10" />
          </motion.button>
        </div>
      </div>

      {/* AIDI 모달 */}
      {showAIDI && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAIDI(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />
          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 sm:top-28 right-3 sm:right-8 w-[calc(100vw-1rem)] sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-200/50 dark:border-amber-800/30 z-50 overflow-hidden backdrop-blur-sm"
          >
                <div className="bg-gradient-to-br from-[#654321] via-[#8B6F47] to-[#A67C52] p-4 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></div>
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 drop-shadow-lg" />
                      <h3 className="font-semibold text-base drop-shadow-md">AIDI 도우미</h3>
                    </div>
                    <button
                      onClick={() => setShowAIDI(false)}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* 탭 메뉴 */}
                  <div className="flex gap-1 bg-white/15 backdrop-blur-sm rounded-lg p-1 relative z-10">
                    {[
                      { id: 'quick', label: '빠른 액션', icon: Zap },
                      { id: 'chat', label: 'AI 채팅', icon: MessageCircle },
                      { id: 'tools', label: '도구', icon: Settings },
                      { id: 'help', label: '도움말', icon: HelpCircle }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setAidiTab(tab.id as any)}
                            className={`flex-1 px-2 py-2.5 rounded-md text-xs font-medium transition-all touch-manipulation min-h-[44px] ${
                              aidiTab === tab.id
                                ? 'bg-gradient-to-br from-amber-100 to-amber-50 text-[#654321] border border-amber-300/50 shadow-md'
                                : 'text-white/90 hover:bg-white/15 hover:text-white'
                            }`}
                        >
                          <Icon className="w-3 h-3 mx-auto mb-0.5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto bg-gradient-to-b from-amber-50/50 via-[#FFF8F0] to-amber-50/30 dark:from-[#2A1F15] dark:via-[#1A1209] dark:to-[#2A1F15]">
                  {/* 빠른 액션 탭 */}
                  {aidiTab === 'quick' && (
                    <div>
                      <div className="grid grid-cols-2 gap-3">
                    {/* 빠른 검색 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                        if (input) {
                          input.focus();
                        }
                      }}
                      className="p-3 sm:p-3 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/60 dark:border-amber-700/40 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md touch-manipulation"
                    >
                      <Search className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-1 sm:mb-2" />
                      <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">빠른 검색</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">원하는 정보 찾기</div>
                    </motion.button>

                    {/* 제품 추천 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        window.location.href = "/products";
                      }}
                      className="p-2.5 sm:p-3 bg-gradient-to-br from-[#FFF8F0] to-amber-50 dark:from-[#2A1F15] dark:to-amber-900/10 rounded-lg border border-[#A67C52]/30 dark:border-[#C9A372]/30 hover:border-[#8B6F47]/50 dark:hover:border-[#C9A372]/50 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100/50 dark:hover:from-amber-900/20 dark:hover:to-amber-800/15 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md"
                    >
                      <Star className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-1 sm:mb-2" />
                      <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">제품 추천</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">맞춤 제품 찾기</div>
                    </motion.button>

                    {/* 인테리어 컨설팅 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        window.location.href = "/contact";
                      }}
                      className="p-3 sm:p-3 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/60 dark:border-amber-700/40 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md touch-manipulation"
                    >
                      <Lightbulb className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-1 sm:mb-2" />
                      <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">인테리어 컨설팅</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">전문가 상담</div>
                    </motion.button>

                    {/* FAQ */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        const element = document.getElementById("recycle");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="p-2.5 sm:p-3 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-emerald-900/15 dark:to-teal-900/10 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 hover:bg-gradient-to-br hover:from-emerald-100/90 hover:to-teal-100/70 dark:hover:from-emerald-900/25 dark:hover:to-teal-900/20 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md"
                    >
                      <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mb-2" />
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">FAQ</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">자주 묻는 질문</div>
                    </motion.button>

                    {/* 문의하기 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        window.location.href = "/contact";
                      }}
                      className="p-2.5 sm:p-3 bg-gradient-to-br from-[#FFF8F0] to-amber-50 dark:from-[#2A1F15] dark:to-amber-900/10 rounded-lg border border-[#A67C52]/30 dark:border-[#C9A372]/30 hover:border-[#8B6F47]/50 dark:hover:border-[#C9A372]/50 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100/50 dark:hover:from-amber-900/20 dark:hover:to-amber-800/15 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-1 sm:mb-2" />
                      <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">문의하기</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">1:1 상담</div>
                    </motion.button>

                    {/* 가이드 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        window.location.href = "/detail";
                      }}
                      className="p-3 sm:p-3 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/60 dark:border-amber-700/40 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all text-left min-h-[80px] sm:min-h-[100px] shadow-sm hover:shadow-md touch-manipulation"
                    >
                      <BookOpen className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-1 sm:mb-2" />
                      <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">가이드</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">상세 정보</div>
                    </motion.button>

                    {/* 통계 보기 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        const element = document.getElementById("stats");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="p-3 bg-gradient-to-br from-[#FFF8F0] to-amber-50 dark:from-[#2A1F15] dark:to-amber-900/10 rounded-lg border border-[#A67C52]/30 dark:border-[#C9A372]/30 hover:border-[#8B6F47]/50 dark:hover:border-[#C9A372]/50 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100/50 dark:hover:from-amber-900/20 dark:hover:to-amber-800/15 transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <TrendingUp className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-2" />
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">통계 보기</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">재활용 현황</div>
                    </motion.button>

                    {/* 시공 문의 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAIDI(false);
                        const element = document.getElementById("service");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="p-3 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-emerald-900/15 dark:to-teal-900/10 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 hover:bg-gradient-to-br hover:from-emerald-100/90 hover:to-teal-100/70 dark:hover:from-emerald-900/25 dark:hover:to-teal-900/20 transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <Wrench className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mb-2" />
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">시공 문의</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">전문 시공 서비스</div>
                    </motion.button>
                      </div>

                      {/* 빠른 연락처 */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">빠른 연락처</div>
                      <div className="space-y-2">
                        <a
                          href="tel:010-7356-2482"
                          className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">010-7356-2482</span>
                        </a>
                        <a
                          href="mailto:mastice@naver.com"
                          className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">mastice@naver.com</span>
                        </a>
                      </div>
                      </div>
                    </div>
                  )}

                  {/* AI 채팅 탭 */}
                  {aidiTab === 'chat' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <div className="relative inline-block mb-2">
                            <Bot className="w-10 h-10 text-[#8B6F47] dark:text-[#C9A372] mx-auto drop-shadow-lg" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent animate-[shimmer_2s_infinite] rounded-full"></div>
                          </div>
                          <p className="text-sm font-medium bg-gradient-to-r from-[#654321] to-[#8B6F47] dark:from-[#C9A372] dark:to-[#A67C52] bg-clip-text text-transparent">AI 도우미와 대화해보세요</p>
                        </div>
                        {chatMessages.length > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setChatMessages([]);
                              setChatInput("");
                            }}
                            className="p-2 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 hover:from-amber-200 hover:to-amber-100 dark:hover:from-amber-900/40 dark:hover:to-amber-800/30 transition-all border border-amber-200/50 dark:border-amber-700/30"
                            title="새로 시작"
                          >
                            <RotateCcw className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372]" />
                          </motion.button>
                        )}
                      </div>
                      
                      {/* 채팅 메시지 영역 */}
                      <div className="space-y-3 max-h-[40vh] overflow-y-auto mb-4 px-1">
                        {chatMessages.length === 0 ? (
                          <div className="text-center py-6">
                            <p className="text-sm font-medium bg-gradient-to-r from-[#654321] to-[#8B6F47] dark:from-[#C9A372] dark:to-[#A67C52] bg-clip-text text-transparent mb-4">안녕하세요! 무엇을 도와드릴까요?</p>
                            <div className="space-y-2">
                              {[
                                "제품 추천해주세요",
                                "인테리어 컨설팅 받고 싶어요",
                                "시공 비용이 궁금해요",
                                "FAQ 보여주세요"
                              ].map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setChatInput(suggestion);
                                    handleChatSubmit(suggestion);
                                  }}
                                  className="block w-full text-left px-3 py-2.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-white to-amber-50/50 dark:from-gray-700 dark:to-amber-900/10 rounded-lg hover:from-amber-50 hover:to-amber-100/70 dark:hover:from-amber-900/20 dark:hover:to-amber-800/15 transition-all text-gray-800 dark:text-gray-200 border border-amber-200/50 dark:border-amber-700/30 hover:border-amber-300/70 dark:hover:border-amber-600/50 shadow-sm hover:shadow-md min-h-[44px] flex items-center"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          chatMessages.map((msg, idx) => {
                            // 링크 파싱 함수
                            const parseMessage = (text: string) => {
                              const parts: (string | React.ReactElement)[] = [];
                              // [/LINK]를 먼저 찾고, 그 앞에서 [LINK:를 찾는 방식으로 변경
                              const linkRegex = /\[LINK:([^\]]+)\](.*?)\[\/LINK\]/g;
                              let lastIndex = 0;
                              let match;
                              let linkIndex = 0;

                              while ((match = linkRegex.exec(text)) !== null) {
                                // 링크 이전 텍스트
                                if (match.index > lastIndex) {
                                  const beforeText = text.substring(lastIndex, match.index);
                                  if (beforeText) {
                                    parts.push(beforeText);
                                  }
                                }
                                // 링크
                                parts.push(
                                  <Link
                                    key={`link-${idx}-${linkIndex++}`}
                                    href={match[1]}
                                    className="text-[#A67C52] dark:text-[#C9A372] font-semibold hover:underline"
                                    onClick={() => setShowAIDI(false)}
                                  >
                                    {match[2]}
                                  </Link>
                                );
                                lastIndex = linkRegex.lastIndex;
                              }
                              // 남은 텍스트
                              if (lastIndex < text.length) {
                                parts.push(text.substring(lastIndex));
                              }
                              return parts.length > 0 ? parts : [text];
                            };

                            return (
                              <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words ${
                                    msg.role === 'user'
                                      ? 'bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#C9A372] text-white hover:from-[#654321] hover:via-[#8B6F47] hover:to-[#A67C52] transition-all shadow-md'
                                      : 'bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-gray-100 border border-amber-200/30 dark:border-gray-600/50 shadow-sm'
                                  }`}
                                >
                                  {msg.role === 'ai' && msg.message.includes('[LINK:') ? (
                                    <div className="whitespace-pre-wrap">
                                      {parseMessage(msg.message).map((part, i) => (
                                        <span key={i}>{part}</span>
                                      ))}
                                    </div>
                                  ) : (
                                    msg.message
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* 채팅 입력 */}
                      <div className="flex gap-2 mt-4">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && chatInput.trim()) {
                              handleChatSubmit(chatInput);
                            }
                          }}
                          placeholder="메시지를 입력하세요..."
                          className="flex-1 px-3 py-2 text-sm border border-amber-200/60 dark:border-amber-700/40 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/50 focus:border-[#8B6F47] dark:focus:ring-[#C9A372]/50 dark:focus:border-[#C9A372] transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (chatInput.trim()) {
                              handleChatSubmit(chatInput);
                            }
                          }}
                          className="px-4 py-2.5 sm:py-2 bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#C9A372] text-white rounded-md hover:from-[#654321] hover:via-[#8B6F47] hover:to-[#A67C52] transition-all shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* 도구 탭 */}
                  {aidiTab === 'tools' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">유용한 도구</h4>
                      
                      {/* 페인트 계산기 */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const area = prompt("도포할 면적을 입력하세요 (㎡):");
                          if (area) {
                            const areaNum = parseFloat(area);
                            const coverage = 10; // 1L당 10㎡
                            const liters = Math.ceil(areaNum / coverage);
                            alert(`필요한 페인트 양: 약 ${liters}L\n(면적: ${areaNum}㎡ 기준)`);
                          }
                        }}
                        className="w-full p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/60 dark:border-amber-700/40 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all text-left shadow-sm hover:shadow-md touch-manipulation min-h-[60px]"
                      >
                        <Calculator className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-2" />
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">페인트 계산기</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">필요한 페인트 양 계산</div>
                      </motion.button>

                      {/* 비용 계산기 */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const area = prompt("시공할 면적을 입력하세요 (㎡):");
                          if (area) {
                            const areaNum = parseFloat(area);
                            const pricePerM2 = 50000; // ㎡당 5만원 가정
                            const total = areaNum * pricePerM2;
                            alert(`예상 비용: ${total.toLocaleString()}원\n(면적: ${areaNum}㎡, ㎡당 50,000원 기준)\n\n※ 정확한 견적은 문의 바랍니다.`);
                          }
                        }}
                        className="w-full p-4 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-emerald-900/15 dark:to-teal-900/10 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 hover:bg-gradient-to-br hover:from-emerald-100/90 hover:to-teal-100/70 dark:hover:from-emerald-900/25 dark:hover:to-teal-900/20 transition-all text-left shadow-sm hover:shadow-md touch-manipulation min-h-[60px]"
                      >
                        <DollarSign className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mb-2" />
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">비용 계산기</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">시공 예상 비용 계산</div>
                      </motion.button>

                      {/* 색상 추천 */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const room = prompt("공간 유형을 선택하세요:\n1. 거실\n2. 침실\n3. 주방\n4. 화장실\n5. 사무실");
                          const recommendations = {
                            '1': '거실에는 따뜻한 베이지나 라이트 브라운 톤을 추천합니다.',
                            '2': '침실에는 차분한 다크 브라운이나 네추럴 그레이를 추천합니다.',
                            '3': '주방에는 밝은 화이트나 라이트 그레이를 추천합니다.',
                            '4': '화장실에는 밝은 톤의 화이트나 라이트 베이지를 추천합니다.',
                            '5': '사무실에는 차분한 그레이나 다크 우드 톤을 추천합니다.'
                          };
                          alert(recommendations[room as keyof typeof recommendations] || '맞춤 컨설팅을 위해 문의해주세요.');
                        }}
                        className="w-full p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/60 dark:border-amber-700/40 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all text-left shadow-sm hover:shadow-md touch-manipulation min-h-[60px]"
                      >
                        <Palette className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-2" />
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">색상 추천</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">공간별 색상 추천</div>
                      </motion.button>

                      {/* 제작 일정 확인 */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          alert('📅 제작 일정 안내\n\n• 스탠다드 제품: 주문 후 영업일 기준 3일 이내 출고\n• 맞춤 제작 제품: 주문 후 2주 이내 발송\n• 배송: 퀵 또는 용달 착불 배송\n\n정확한 일정은 문의해주세요.');
                        }}
                        className="w-full p-4 bg-gradient-to-br from-[#FFF8F0] to-amber-50 dark:from-[#2A1F15] dark:to-amber-900/10 rounded-lg border border-[#A67C52]/30 dark:border-[#C9A372]/30 hover:border-[#8B6F47]/50 dark:hover:border-[#C9A372]/50 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100/50 dark:hover:from-amber-900/20 dark:hover:to-amber-800/15 transition-all text-left shadow-sm hover:shadow-md touch-manipulation min-h-[60px]"
                      >
                        <Clock className="w-4 h-4 text-[#8B6F47] dark:text-[#C9A372] mb-2" />
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">제작 일정</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">제작 및 배송 일정 확인</div>
                      </motion.button>
                    </div>
                  )}

                  {/* 도움말 탭 */}
                  {aidiTab === 'help' && (
                    <div className="space-y-3">
                      <div className="mb-4">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">자주 묻는 질문</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">FAQ를 통해 빠르게 해결하세요</p>
                      </div>
                      
                      {[
                        {
                          q: "커피박 페인트는 어떻게 사용하나요?",
                          a: "커피박 페인트는 일반 페인트와 동일하게 사용하시면 됩니다. 표면을 깨끗이 정리한 후 롤러나 브러시로 도포하시면 됩니다."
                        },
                        {
                          q: "맞춤 제작이 가능한가요?",
                          a: "네, 맞춤 제작이 가능합니다. 원하시는 색상, 텍스처, 사이즈로 제작해드립니다. 문의해주시면 상세히 안내해드리겠습니다."
                        },
                        {
                          q: "배송은 어떻게 되나요?",
                          a: "택배 또는 화물 착불 배송으로 진행됩니다. 스탠다드 제품은 3일 이내, 맞춤 제작은 2주 이내 발송됩니다."
                        },
                        {
                          q: "환불 및 교환이 가능한가요?",
                          a: "맞춤 제작 상품의 특성상 교환 및 환불은 불가합니다. 모든 제품은 출고 전 상태 확인을 위한 영상 촬영 후 발송됩니다."
                        }
                      ].map((faq, idx) => (
                        <details
                          key={idx}
                          className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <summary className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer">
                            {faq.q}
                          </summary>
                          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{faq.a}</p>
                        </details>
                      ))}

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">추가 도움이 필요하신가요?</h5>
                        <div className="space-y-2">
                          <a
                            href="/contact"
                            className="block p-2 text-sm bg-coffee-50 dark:bg-coffee-900/20 text-coffee-600 dark:text-coffee-400 rounded-lg hover:bg-coffee-100 dark:hover:bg-coffee-900/30 transition-colors text-center"
                          >
                            문의하기
                          </a>
                          <a
                            href="tel:010-7356-2482"
                            className="block p-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center"
                          >
                            📞 010-7356-2482
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}

      {/* 히어로 섹션 */}
      <motion.section
        style={{ opacity, scale, y }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Coffee className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-coffee-600 dark:text-coffee-400 mx-auto" />
            </motion.div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 px-2">
              <span className="text-[#654321] dark:text-[#654A21]">
                커피박
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 bg-clip-text text-transparent">
              재활용의 새로운 시작
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              커피찌꺼기를 활용한 다양한 정보와
              <br />
              아이디어를 공유하는 혁신적인 공간입니다
            </p>
          </motion.div>

          {/* 검색 바 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative" ref={searchInputRef}>
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 sm:w-6 sm:h-6 z-10" />
              <input
                type="text"
                placeholder="커피박 관련 내용 검색..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => {
                  if (searchTerm.trim()) {
                    setShowResults(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredResults.length > 0) {
                    handleResultClick(filteredResults[0]);
                  } else if (e.key === 'Escape') {
                    setShowResults(false);
                    setSearchTerm("");
                  }
                }}
                className="w-full px-10 sm:px-12 py-4 sm:py-4 pr-12 sm:pr-14 text-base sm:text-lg rounded-2xl border-2 border-[#654321]/30 dark:border-[#654A21]/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#654321] dark:focus:border-[#654A21] transition-all shadow-xl touch-manipulation"
                aria-label="커피박 관련 내용 검색"
                aria-expanded={showResults}
                aria-controls="search-results"
                aria-autocomplete="list"
              />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSearchTerm("");
                    setShowResults(false);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 shadow-sm hover:shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                  title="검색어 지우기"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}

              {/* 검색 결과 드롭다운 */}
              {showResults && filteredResults.length > 0 && (
                <motion.div
                  id="search-results"
                  role="listbox"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-coffee-200 dark:border-coffee-800 overflow-hidden z-50 max-h-96 overflow-y-auto"
                >
                  {filteredResults.map((result, index) => (
                    <motion.button
                      key={result.id}
                      role="option"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)' }}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-4 sm:p-4 hover:bg-coffee-50 dark:hover:bg-coffee-900/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 touch-manipulation min-h-[60px] flex items-center"
                      aria-label={`${result.title} - ${result.description}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {result.type === 'page' ? (
                            <Package className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                          ) : (
                            <Search className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {highlightText(result.title, searchTerm)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {highlightText(result.description, searchTerm)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* 검색 결과 없음 */}
              {showResults && searchTerm.trim() && filteredResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-coffee-200 dark:border-coffee-800 p-6 text-center z-50"
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    "{searchTerm}"에 대한 검색 결과가 없습니다.
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    다른 키워드로 검색해보세요.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 스크롤 인디케이터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 cursor-pointer group"
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
            >
              <span className="text-sm mb-2 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors">
                스크롤하여 더 보기
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 rotate-90 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 통계 섹션 */}
      <section id="stats" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              커피박 재활용 현황
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
              실시간 데이터로 확인하는 재활용 통계
            </p>
          </motion.div>
          <InteractiveStats />
        </div>
      </section>

      {/* 주요 내용 카드 섹션 */}
      <section id="recycle" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              재활용 방법
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
              커피박을 활용한 다양한 재활용 아이디어
            </p>
          </motion.div>
          <FloatingCards searchTerm={searchTerm} />
        </div>
      </section>

      {/* 파트너십 섹션 */}
      <section id="partnership" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
              <Handshake className="w-8 h-8 sm:w-10 sm:h-10 text-coffee-600 dark:text-coffee-400" />
              {searchTerm ? highlightText("파트너십", searchTerm) : "파트너십"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              {searchTerm ? highlightText("마스티체와 함께하는 커피박 페인트 연구 개발 및 판매", searchTerm) : "마스티체와 함께하는 커피박 페인트 연구 개발 및 판매"}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-coffee-50 via-orange-50 to-amber-50 dark:from-coffee-900/20 dark:via-orange-900/20 dark:to-amber-900/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 border-coffee-200 dark:border-coffee-800"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-white dark:bg-gray-800 px-6 py-3 rounded-full mb-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-coffee-600 dark:text-coffee-400">마스티체</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mastice Paint & Interior</p>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  친환경 커피박 페인트 연구 개발 파트너
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  마스티체와 협약하여 커피찌꺼기를 활용한 친환경 페인트를 연구 개발하고 있습니다. 
                  전문 페인트 제조 기술과 커피박 재활용 기술의 결합으로 혁신적인 제품을 만들어갑니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#654321] rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">페인트 제조 기술 및 생산</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#654321] rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">커피박 페인트 연구 개발</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#654321] rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">제품 품질 관리 및 인증</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/products" prefetch={true}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#654321] hover:bg-[#473417] dark:bg-[#654A21] dark:hover:bg-[#654321] text-white rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-colors min-h-[44px]"
                    >
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      제품 보기
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">협약 내용</h5>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#654321] pl-4">
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">연구 개발</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      커피박 페인트 제품 개발 및 기술 연구
                    </p>
                  </div>
                  <div className="border-l-4 border-coffee-400 pl-4">
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">생산 제조</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      마스티체의 전문 시설에서 제품 생산
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-400 pl-4">
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">홍보 및 판매</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      우리가 담당하는 마케팅 및 판매 활동
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📍 경기도 안산시 상록구 송호1길 59<br />
                    📞 010-7356-2482<br />
                    ✉️ mastice@naver.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 연구 개발 과정 섹션 */}
      <section id="rd" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-coffee-600 dark:text-coffee-400" />
              {searchTerm ? highlightText("연구 개발 과정", searchTerm) : "연구 개발 과정"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              {searchTerm ? highlightText("마스티체와 함께하는 커피박 페인트 연구 개발의 단계별 과정", searchTerm) : "마스티체와 함께하는 커피박 페인트 연구 개발의 단계별 과정"}
            </p>
          </motion.div>

          <div className="relative">
            {/* 타임라인 */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-coffee-200 via-coffee-300 to-amber-200 dark:from-coffee-800 dark:via-coffee-700 dark:to-amber-800"></div>

            {[
              {
                step: "1단계",
                title: "소재 연구",
                period: "3-6개월",
                description: "커피박의 화학적 특성 분석, 색소 추출 방법 연구, 페인트와의 상호작용 분석",
                icon: "🔬",
                color: "blue"
              },
              {
                step: "2단계",
                title: "배합 연구",
                period: "6-9개월",
                description: "최적 배합 비율 도출, 안정성 테스트, 점도 및 건조 시간 조절",
                icon: "⚗️",
                color: "green"
              },
              {
                step: "3단계",
                title: "성능 검증",
                period: "6-12개월",
                description: "내구성 테스트, 색상 안정성 검증, 접착력 평가, VOC 배출량 측정",
                icon: "✅",
                color: "purple"
              },
              {
                step: "4단계",
                title: "생산 공정 개발",
                period: "3-6개월",
                description: "대량 생산 공정 설계, 품질 관리 시스템 구축, 마스티체 생산 시설 준비",
                icon: "🏭",
                color: "orange"
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-12 md:mb-20 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border-l-4 ${
                    stage.color === 'blue' ? 'border-blue-400' :
                    stage.color === 'green' ? 'border-green-400' :
                    stage.color === 'purple' ? 'border-purple-400' :
                    'border-coffee-400'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{stage.icon}</span>
                      <div>
                        <span className="text-sm font-semibold text-coffee-600 dark:text-coffee-400">
                          {stage.step}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          기간: {stage.period}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {stage.description}
                    </p>
                  </div>
                </div>
                {/* 타임라인 포인트 */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#654321] rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
              </motion.div>
            ))}
          </div>

          {/* 현재 진행 상황 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-coffee-50 to-coffee-100 dark:from-coffee-900/20 dark:to-coffee-800/20 rounded-3xl shadow-xl p-8 sm:p-12 border-2 border-coffee-200 dark:border-coffee-800"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                현재 진행 상황
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                마스티체와 함께 연구 개발을 진행 중입니다
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-coffee-600 dark:text-coffee-400 mb-2">2단계</div>
                <p className="text-gray-700 dark:text-gray-300">배합 연구 진행 중</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-coffee-600 dark:text-coffee-400 mb-2">60%</div>
                <p className="text-gray-700 dark:text-gray-300">전체 진행률</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">2026</div>
                <p className="text-gray-700 dark:text-gray-300">예상 출시 시기</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              커피박 재활용의 가치
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              환경 보호와 자원 순환을 통한 지속 가능한 미래를 만들어갑니다
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-green-200 dark:border-green-800 text-center"
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">환경 보호</h3>
              <p className="text-gray-700 dark:text-gray-300">
                폐기물 감량과 자원 순환을 통한 지구 환경 보호에 기여합니다
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8 rounded-3xl border-2 border-blue-200 dark:border-blue-800 text-center"
            >
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">경제적 가치</h3>
              <p className="text-gray-700 dark:text-gray-300">
                새로운 산업 창출과 일자리 확대로 지역경제 활성화에 기여합니다
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-3xl border-2 border-purple-200 dark:border-purple-800 text-center"
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">사회적 기여</h3>
              <p className="text-gray-700 dark:text-gray-300">
                지역 커뮤니티와의 협력을 통한 지속 가능한 사회 구현
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 시공/서비스 안내 섹션 */}
      <section id="service" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Wrench className="w-10 h-10 text-coffee-600 dark:text-coffee-400" />
              시공 및 서비스
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              마스티체의 전문 시공 서비스와 함께하는 커피박 페인트 적용
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "시공 문의",
                description: "전문 시공팀이 직접 방문하여 페인트를 시공해드립니다",
                icon: "🎨",
                features: ["전문 시공팀", "방문 시공", "품질 보증", "A/S 지원"]
              },
              {
                title: "컨설팅",
                description: "공간에 맞는 색상 및 디자인 컨설팅을 제공합니다",
                icon: "💡",
                features: ["색상 추천", "디자인 컨설팅", "견적 상담", "맞춤 제안"]
              },
              {
                title: "원데이 클래스",
                description: "커피박 페인트를 직접 체험할 수 있는 원데이 클래스를 운영합니다",
                icon: "📚",
                features: ["직접 체험", "제작 방법 학습", "소규모 클래스", "예약제 운영"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-[#654321] hover:bg-[#213265] dark:bg-[#654A21] dark:hover:bg-[#172347] text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg transition-colors min-h-[44px]"
                  >
                    문의하기
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 서비스 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl shadow-xl p-8 sm:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  시공 프로세스
                </h3>
                <ol className="space-y-3">
                  {[
                    "1. 문의 및 상담 (전화 또는 온라인)",
                    "2. 현장 방문 및 견적 산출",
                    "3. 색상 및 디자인 결정",
                    "4. 시공 일정 조율",
                    "5. 전문 시공팀 방문 시공",
                    "6. 완료 후 점검 및 A/S"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-coffee-600 dark:text-coffee-400">{index + 1}.</span>
                      <span>{step.split('. ')[1]}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  서비스 지역
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  경기도 안산시를 중심으로 수도권 전역 서비스 가능
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">주요 서비스 지역</p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• 경기도 안산시 (본사 인근 우선)</li>
                    <li>• 경기도 전역</li>
                    <li>• 서울 및 인천 지역</li>
                    <li>• 기타 지역은 문의 바랍니다</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">연락처</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📞 010-7356-2482<br />
                    ✉️ mastice@naver.com<br />
                    📍 경기도 안산시 상록구 송호1길 59
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#654321] dark:bg-[#654A21] rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4"
              >
                커피박 재활용에 함께하세요
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
              >
                더 자세한 정보와 연구 결과를 확인하고, 지속 가능한 미래를 만들어갑니다
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link href="/products" scroll={true} prefetch={true}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-coffee-600 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }, 0);
                    }}
                  >
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-600" />
                    <span className="text-center">제품 보기</span>
                  </motion.button>
                </Link>
                <Link href="/detail" scroll={true} prefetch={true}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-coffee-700/90 dark:bg-white/20 backdrop-blur-md text-white dark:text-white border-2 border-coffee-600 dark:border-white/30 rounded-xl font-semibold text-lg hover:bg-coffee-800 dark:hover:bg-white/30 transition-all shadow-lg"
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }, 0);
                    }}
                  >
                    상세 정보 보기
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-coffee-700/90 dark:bg-white/20 backdrop-blur-md text-white dark:text-white border-2 border-coffee-600 dark:border-white/30 rounded-xl font-semibold text-lg hover:bg-coffee-800 dark:hover:bg-white/30 transition-all shadow-lg"
                  >
                    문의하기
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6" />
                커피박
              </h3>
              <p className="text-gray-400 text-sm">
                커피찌꺼기를 활용한 다양한 정보와 아이디어를 공유하는 혁신적인 공간입니다
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">빠른 링크</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    홈
                  </Link>
                </li>
                <li>
                  <Link href="/products" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    제품 보기
                  </Link>
                </li>
                <li>
                  <Link href="/detail" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    상세 정보
                  </Link>
                </li>
                <li>
                  <a href="/#recycle" className="text-gray-400 hover:text-white transition-colors text-sm">
                    재활용 방법
                  </a>
                </li>
                <li>
                  <a href="/#stats" className="text-gray-400 hover:text-white transition-colors text-sm">
                    통계 현황
                  </a>
                </li>
                <li>
                  <Link href="/products" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    제품 보기
                  </Link>
                </li>
                <li>
                  <Link href="/orders" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    주문 내역
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">정보</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/detail#ordinance" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    조례안
                  </Link>
                </li>
                <li>
                  <Link href="/detail#research" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    연구 결과
                  </Link>
                </li>
                <li>
                  <Link href="/contact" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">연락처</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>이메일: info@coffeegrounds.kr</li>
                <li>전화: 02-1234-5678</li>
                <li className="flex gap-4 mt-4">
                  <a href="#" className="hover:text-white transition-colors">📘</a>
                  <a href="#" className="hover:text-white transition-colors">📷</a>
                  <a href="#" className="hover:text-white transition-colors">🐦</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 커피박 재활용 프로젝트. 모든 권리 보유.
            </p>
            <p className="text-gray-500 text-xs">
              웹 페이지 관리자: <span className="text-gray-400">김재현</span> | 
              <a href="mailto:max30105@gmail.com" className="text-gray-400 hover:text-white transition-colors ml-1">
                max30105@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* 맨 위로 가기 버튼 */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-3 rounded-full bg-[#654321] text-white shadow-2xl hover:bg-[#473417] hover:shadow-3xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="맨 위로"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}

