"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Coffee, Leaf, Recycle, Sparkles, Search, ArrowLeft, BookOpen, X, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import CoffeeParticleScene from "@/components/CoffeeParticleScene";
import { useTheme } from "@/contexts/ThemeContext";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  section: string;
  elementId?: string;
  keywords: string[];
  fullText?: string;
}

const searchResults: SearchResult[] = [
  {
    id: 'ordinance',
    title: '경기도 조례안',
    description: '경기도 커피찌꺼기 재활용 지원 조례안 검토보고서',
    section: 'ordinance',
    keywords: ['조례', '경기도', '지원', '정책', '법안', '제안', '검토', '보고서'],
    fullText: '경기도 커피찌꺼기 재활용 지원 조례안 검토보고서 2025년 11월 21일 도시환경위원회 회의실 수석전문위원 신성해'
  },
  {
    id: 'ordinance-reason',
    title: '제안이유',
    description: '우리나라 커피산업이 대형화, 프랜차이즈화, 고급화 등으로 인해 커피소비가 급증함에 따라 커피찌꺼기 발생량이 증가하고 있으며 이에 따른 폐기물 처리비용 또한 증가하고 있어 커피찌꺼기의 처리 및 재활용 등을 위한 사회적 비용을 저감하기 위한 근본적인 대안 마련이 필요함',
    section: 'ordinance',
    keywords: ['제안이유', '커피산업', '대형화', '프랜차이즈', '커피소비', '급증', '커피찌꺼기', '발생량', '폐기물', '처리비용', '재활용', '사회적', '비용', '저감', '대안'],
    fullText: '우리나라 커피산업이 대형화, 프랜차이즈화, 고급화 등으로 인해 커피소비가 급증함에 따라 커피찌꺼기 발생량이 증가하고 있으며 이에 따른 폐기물 처리비용 또한 증가하고 있어 커피찌꺼기의 처리 및 재활용 등을 위한 사회적 비용을 저감하기 위한 근본적인 대안 마련이 필요함'
  },
  {
    id: 'ordinance-content-1',
    title: '재활용 활성화 시책 수립',
    description: '커피찌꺼기의 재활용을 활성화하기 위한 시책을 수립하여 추진',
    section: 'ordinance',
    keywords: ['재활용', '활성화', '시책', '수립', '추진'],
    fullText: '재활용 활성화 시책 수립 안 제4조 커피찌꺼기의 재활용을 활성화하기 위한 시책을 수립하여 추진'
  },
  {
    id: 'ordinance-content-2',
    title: '재활용 추진계획 수립',
    description: '재활용 목표 및 추진방향, 폐기물 발생량 및 재활용 실태조사, 재활용 활성화 사업 지원방안 등을 포함한 재활용계획 수립',
    section: 'ordinance',
    keywords: ['재활용', '추진계획', '목표', '추진방향', '폐기물', '발생량', '실태조사', '활성화', '사업', '지원방안'],
    fullText: '재활용 추진계획 수립 안 제5조 재활용 목표 및 추진방향 폐기물 발생량 및 재활용 실태조사 재활용 활성화 사업 지원방안 등을 포함한 재활용계획 수립'
  },
  {
    id: 'ordinance-content-3',
    title: '재활용 활성화 사업 지원',
    description: '커피찌꺼기 수거용기 보급, 분리배출 촉진, 재활용 홍보, 재활용 제품 이용 활성화 사업 등을 지원',
    section: 'ordinance',
    keywords: ['재활용', '활성화', '사업', '지원', '수거용기', '보급', '분리배출', '촉진', '홍보', '제품', '이용'],
    fullText: '재활용 활성화 사업 지원 안 제6조 커피찌꺼기 수거용기 보급 분리배출 촉진 재활용 홍보 재활용 제품 이용 활성화 사업 등을 지원'
  },
  {
    id: 'ordinance-content-4',
    title: '협력체계 구축',
    description: '시·군, 환경활동가·단체·전문가 등과 협력체계를 구축',
    section: 'ordinance',
    keywords: ['협력체계', '구축', '시', '군', '환경활동가', '단체', '전문가'],
    fullText: '협력체계 구축 안 제7조 시·군, 환경활동가·단체·전문가 등과 협력체계를 구축'
  },
  {
    id: 'ordinance-review-1',
    title: '법적 근거 및 타당성',
    description: '순환경제사회 전환촉진법 제21조 및 제23조에 따른 순환자원 지정 등에 관한 고시가 개정·시행되면서 순환자원 지정대상에 커피찌꺼기가 포함됨',
    section: 'ordinance',
    keywords: ['법적', '근거', '타당성', '순환경제사회', '전환촉진법', '순환자원', '지정', '고시', '개정', '시행'],
    fullText: '법적 근거 및 타당성 순환경제사회 전환촉진법 제21조 및 제23조에 따른 순환자원 지정 등에 관한 고시가 개정·시행 2025. 8. 26. 되면서 순환자원 지정대상에 커피찌꺼기가 포함됨 상위법령과의 정합성을 확보하였으며, 조례 제정의 필요성 및 타당성은 확보한 것으로 판단됨'
  },
  {
    id: 'ordinance-review-2',
    title: '적용범위',
    description: '다른 폐기물과 혼합되지 않은 커피찌꺼기에만 조례를 적용하여 재활용 가능한 상태를 규정',
    section: 'ordinance',
    keywords: ['적용범위', '폐기물', '혼합', '커피찌꺼기', '조례', '재활용', '가능', '상태', '규정'],
    fullText: '적용범위 안 제3조 다른 폐기물과 혼합되지 않은 커피찌꺼기에만 조례를 적용하여 재활용 가능한 상태를 규정'
  },
  {
    id: 'ordinance-review-3',
    title: '도지사 등의 책무',
    description: '도지사, 시장·군수, 커피찌꺼기 배출자 각각의 책무를 명확히 규정하여 참여주체별 역할 분담',
    section: 'ordinance',
    keywords: ['도지사', '책무', '시장', '군수', '배출자', '규정', '참여주체', '역할', '분담'],
    fullText: '도지사 등의 책무 안 제4조 도지사, 시장·군수, 커피찌꺼기 배출자 각각의 책무를 명확히 규정하여 참여주체별 역할 분담'
  },
  {
    id: 'ordinance-review-4',
    title: '재활용 계획 수립',
    description: '재활용 목표, 실태조사, 지원방안, 성과평가 등을 포함한 통합적 관리체계 구축',
    section: 'ordinance',
    keywords: ['재활용', '계획', '수립', '목표', '실태조사', '지원방안', '성과평가', '통합적', '관리체계', '구축'],
    fullText: '재활용 계획 수립 안 제5조 재활용 목표, 실태조사, 지원방안, 성과평가 등을 포함한 통합적 관리체계 구축'
  },
  {
    id: 'ordinance-review-5',
    title: '종합 검토의견',
    description: '이번 제정안은 상위법령 개정으로 순환자원 지정대상에 포함된 커피찌꺼기의 재활용을 촉진하기 위한 지원사업의 제도적 근거를 마련하려는 것으로',
    section: 'ordinance',
    keywords: ['종합', '검토의견', '제정안', '상위법령', '개정', '순환자원', '지정대상', '재활용', '촉진', '지원사업', '제도적', '근거'],
    fullText: '종합 검토의견 이번 제정안은 상위법령 개정으로 순환자원 지정대상에 포함된 커피찌꺼기의 재활용을 촉진하기 위한 지원사업의 제도적 근거를 마련하려는 것으로 환경적 효과 폐기물 발생 감량 자원순환 촉진 온실가스 배출 저감 경제적 효과 재활용 산업 육성 지역경제 활성화 일자리 창출 시의적절한 조치로 판단됨'
  },
  {
    id: 'research',
    title: 'AI 정보 수집 및 연구 결과',
    description: '웹 검색을 통해 수집한 커피찌꺼기 재활용 관련 최신 정보',
    section: 'research',
    keywords: ['AI', '정보', '연구', '결과', '수집', '웹', '검색', '법령', '정책', '분석']
  },
  {
    id: 'paint',
    title: '페인트 회사 활용',
    description: '페인트 회사의 커피박 재활용 활용 사례',
    section: 'paint',
    keywords: ['페인트', '회사', '활용', '사례', '제품', '개발', '마스티체']
  }
];

export default function DetailPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 페이지 로드 시 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 검색 결과 필터링
  const filteredResults = searchTerm.trim()
    ? searchResults.filter(result => {
        const searchLower = searchTerm.toLowerCase();
        return (
          result.title.toLowerCase().includes(searchLower) ||
          result.description.toLowerCase().includes(searchLower) ||
          result.fullText?.toLowerCase().includes(searchLower) ||
          result.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      })
    : [];

  // 검색 결과 클릭 핸들러
  const handleResultClick = (result: SearchResult) => {
    setSearchTerm("");
    setShowResults(false);
    
    // 특정 요소 ID가 있으면 해당 요소로, 없으면 섹션으로 스크롤
    const targetId = result.elementId || result.section;
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      // 섹션으로 스크롤
      const sectionElement = document.getElementById(result.section);
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 relative overflow-hidden">
      {/* 배경 파티클 효과 */}
      <div className="fixed inset-0 z-0">
        <CoffeeParticleScene />
      </div>

      {/* 다크모드 토글 */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-xl" suppressHydrationWarning>{mounted ? (isDark ? "☀️" : "🌙") : "🌙"}</span>
      </motion.button>

      {/* 네비게이션 바 */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" prefetch={true}>
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 min-w-[44px] min-h-[44px] touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200">홈으로</span>
          </motion.button>
        </Link>
      </div>

      {/* 검색 바 및 목차 */}
      <div className="relative z-20 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* 목차 사이드바 */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block lg:col-span-1"
            >
              <div className="sticky top-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 z-10">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">목차</h3>
                </div>
                <nav className="space-y-2">
                  <a href="#ordinance" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                    경기도 조례안
                  </a>
                  <a href="#research" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                    AI 정보 수집 및 연구 결과
                  </a>
                  <a href="#paint" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                    페인트 회사 활용
                  </a>
                </nav>
              </div>
            </motion.aside>

            {/* 검색 바 */}
            <div className="lg:col-span-3 relative z-30">
              <div className="relative mb-6" ref={searchInputRef}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-6 h-6 z-10" />
                <input
                  type="text"
                  placeholder="상세 내용 검색..."
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
                    }
                  }}
                  className="w-full px-10 sm:px-12 py-4 pr-12 sm:pr-14 text-base sm:text-lg rounded-2xl border-2 border-coffee-200 dark:border-coffee-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:outline-none focus:border-coffee-400 dark:focus:border-coffee-600 transition-all shadow-xl touch-manipulation"
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-coffee-200 dark:border-coffee-800 overflow-hidden z-[100] max-h-96 overflow-y-auto"
                  >
                    {filteredResults.map((result, index) => (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)' }}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-4 hover:bg-coffee-50 dark:hover:bg-coffee-900/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <FileText className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
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
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-coffee-200 dark:border-coffee-800 p-6 text-center z-[100]"
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

              {/* 한컴 문서 다운로드 섹션 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-2 border-emerald-200 dark:border-emerald-700/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      조례안 검토보고서
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      경기도 커피찌꺼기 재활용 지원 조례안 검토보고서
                    </p>
                  </div>
                </div>
                <motion.a
                  href="/news/14.%20경기도%20커피찌꺼기%20재활용%20지원%20조례안%20검토보고서.hwpx"
                  download="경기도 커피찌꺼기 재활용 지원 조례안 검토보고서.hwpx"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span>한컴 문서 다운로드</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* 경기도 조례안 섹션 */}
        <section id="ordinance" className="mb-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12"
          >
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3"
              >
                <Sparkles className="w-8 h-8 text-coffee-600 dark:text-coffee-400" />
                경기도 커피찌꺼기 재활용 지원 조례안 검토보고서
              </motion.h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  📅 2025년 11월 21일 (금) 10:30
                </span>
                <span className="flex items-center gap-2">
                  📍 도시환경위원회 회의실
                </span>
                <span className="flex items-center gap-2">
                  👤 수석전문위원 신성해
                </span>
              </div>
            </div>

            {/* 제안이유 */}
            <motion.div
              id="ordinance-reason"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-l-4 border-amber-400 scroll-mt-24"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                1. 제안이유
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  {highlightText("우리나라 커피산업이 대형화, 프랜차이즈화, 고급화 등으로 인해 커피소비가 급증함에 따라 커피찌꺼기 발생량이 증가하고 있으며 이에 따른 폐기물 처리비용 또한 증가하고 있어 커피찌꺼기의 처리 및 재활용 등을 위한 사회적 비용을 저감하기 위한 근본적인 대안 마련이 필요함", searchTerm)}
                </p>
                <p className="leading-relaxed">
                  {highlightText("커피찌꺼기 재활용 촉진을 위한 배출, 수거 등에 관한 지원체계를 마련하여 커피찌꺼기의 재자원화 촉진하기 위함", searchTerm)}
                </p>
              </div>
            </motion.div>

            {/* 주요내용 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border-l-4 border-green-400"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Recycle className="w-6 h-6 text-green-600" />
                2. 주요내용
              </h3>
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {highlightText("가. 재활용 활성화 시책 수립 (안 제4조)", searchTerm)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlightText("커피찌꺼기의 재활용을 활성화하기 위한 시책을 수립하여 추진", searchTerm)}
                  </p>
                </div>
                <div id="ordinance-content-2" className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400 scroll-mt-24">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {highlightText("나. 재활용 추진계획 수립 (안 제5조)", searchTerm)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlightText("재활용 목표 및 추진방향, 폐기물 발생량 및 재활용 실태조사, 재활용 활성화 사업 지원방안 등을 포함한 재활용계획 수립", searchTerm)}
                  </p>
                </div>
                <div id="ordinance-content-3" className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400 scroll-mt-24">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {highlightText("다. 재활용 활성화 사업 지원 (안 제6조)", searchTerm)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlightText("커피찌꺼기 수거용기 보급, 분리배출 촉진, 재활용 홍보, 재활용 제품 이용 활성화 사업 등을 지원", searchTerm)}
                  </p>
                </div>
                <div id="ordinance-content-4" className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-400 scroll-mt-24">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {highlightText("라. 협력체계 구축 (안 제7조)", searchTerm)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlightText("시·군, 환경활동가·단체·전문가 등과 협력체계를 구축", searchTerm)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 검토의견 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border-l-4 border-blue-400"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                3. 검토의견
              </h3>
              
              {/* 법적 근거 */}
              <div id="ordinance-review-1" className="mb-6 scroll-mt-24">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  가. 법적 근거 및 타당성
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {highlightText("「순환경제사회 전환촉진법」 제21조 및 제23조에 따른 「순환자원 지정 등에 관한 고시」가 개정·시행(2025. 8. 26.)되면서 순환자원 지정대상에 커피찌꺼기가 포함됨", searchTerm)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlightText("상위법령과의 정합성을 확보하였으며, 조례 제정의 필요성 및 타당성은 확보한 것으로 판단됨", searchTerm)}
                  </p>
                </div>
              </div>

              {/* 주요 내용별 검토 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  나. 주요 내용별 검토
                </h4>
                <div className="space-y-4">
                  <div id="ordinance-review-2" className="border-l-4 border-blue-400 pl-4 scroll-mt-24">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {highlightText("적용범위 (안 제3조)", searchTerm)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {highlightText("다른 폐기물과 혼합되지 않은 커피찌꺼기에만 조례를 적용하여 재활용 가능한 상태를 규정", searchTerm)}
                    </p>
                  </div>
                  <div id="ordinance-review-3" className="border-l-4 border-green-400 pl-4 scroll-mt-24">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {highlightText("도지사 등의 책무 (안 제4조)", searchTerm)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {highlightText("도지사, 시장·군수, 커피찌꺼기 배출자 각각의 책무를 명확히 규정하여 참여주체별 역할 분담", searchTerm)}
                    </p>
                  </div>
                  <div id="ordinance-review-4" className="border-l-4 border-purple-400 pl-4 scroll-mt-24">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {highlightText("재활용 계획 수립 (안 제5조)", searchTerm)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {highlightText("재활용 목표, 실태조사, 지원방안, 성과평가 등을 포함한 통합적 관리체계 구축", searchTerm)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 종합 검토의견 */}
              <div id="ordinance-review-5" className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg border-2 border-amber-200 dark:border-amber-800 scroll-mt-24">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  다. 종합 검토의견
                </h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed">
                    {highlightText("이번 제정안은 상위법령 개정으로 순환자원 지정대상에 포함된 커피찌꺼기의 재활용을 촉진하기 위한 지원사업의 제도적 근거를 마련하려는 것으로,", searchTerm)}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-2">🌱 환경적 효과</p>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• {highlightText("폐기물 발생 감량", searchTerm)}</li>
                        <li>• {highlightText("자원순환 촉진", searchTerm)}</li>
                        <li>• {highlightText("온실가스 배출 저감", searchTerm)}</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">💼 {highlightText("경제적 효과", searchTerm)}</p>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• {highlightText("재활용 산업 육성", searchTerm)}</li>
                        <li>• {highlightText("지역경제 활성화", searchTerm)}</li>
                        <li>• {highlightText("일자리 창출", searchTerm)}</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 font-semibold text-amber-600 dark:text-amber-400">
                    {highlightText("시의적절한 조치로 판단됨", searchTerm)}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* AI 정보 수집 및 연구 결과 */}
        <section id="research" className="mb-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12"
          >
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3"
              >
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                AI 정보 수집 및 연구 결과
              </motion.h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                웹 검색을 통해 수집한 커피찌꺼기 재활용 관련 최신 정보
              </p>
            </div>

            {/* 관련 법령 및 정책 분석 */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span>📋</span>
                관련 법령 및 정책 분석
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-lg border-l-4 border-blue-400">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      순환경제사회 전환촉진법
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      2025년 8월 26일 개정·시행된 「순환자원 지정 등에 관한 고시」에 따라 커피찌꺼기가 순환자원 지정대상에 포함되었습니다. 이는 커피찌꺼기의 재활용을 법적으로 지원하는 중요한 근거가 되었습니다.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      경기도 커피찌꺼기 재활용 지원 조례안
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      경기도에서는 커피찌꺼기의 수집, 운송, 재활용에 대한 지원 방안을 포함한 조례안을 검토 중입니다. 이를 통해 환경 보호와 자원 순환을 촉진하고자 합니다.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      폐기물관리법 및 자원순환기본법
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      폐기물의 적절한 처리와 재활용을 촉진하기 위한 기본 규정과 자원의 효율적인 이용과 순환을 촉진하는 법령이 커피찌꺼기 재활용의 법적 기반을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 최신 기술 동향 파악 및 시장 분석 */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span>🔬📈</span>
                최신 기술 동향 및 시장 분석
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-lg border-l-4 border-blue-400 mb-4">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  작은 사업장 중심의 실용적 재활용 방법과 시장 전망
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  최근 커피 소비량 증가로 커피찌꺼기 발생량이 늘어나고 있으며, 작은 사업장(카페, 소규모 사업장)에서도 쉽게 실천할 수 있는 재활용 방법들이 주목받고 있습니다. 친환경 제품에 대한 소비자 선호도가 높아지면서 관련 시장도 성장하고 있습니다.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    탈취제 제작 및 판매
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    커피찌꺼기를 건조하여 소포장 탈취제로 제작하거나, 냉장고, 신발장 등에 활용할 수 있는 제품으로 판매하는 사업장이 증가하고 있습니다.
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                    📊 시장 전망: 친환경 생활용품 시장에서 탈취제 분야가 지속적으로 성장하며, 소규모 제작·판매 모델이 확산되고 있습니다.
                  </p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-l-4 border-pink-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    천연 스크럽 제품 제작
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    커피찌꺼기를 활용한 천연 스크럽 제품을 직접 제작하여 판매하거나, 고객에게 제공하는 소규모 사업장이 늘어나고 있습니다.
                  </p>
                  <p className="text-xs text-pink-700 dark:text-pink-300 font-medium">
                    📊 시장 전망: 천연 화장품 및 스킨케어 제품 시장이 급성장하며, 커피찌꺼기 활용 제품에 대한 소비자 관심이 높아지고 있습니다.
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    DIY 키트 및 체험 프로그램
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    고객이 직접 커피찌꺼기를 활용한 제품을 만들 수 있는 DIY 키트를 판매하거나, 체험 프로그램을 운영하는 사업장이 증가하고 있습니다.
                  </p>
                  <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                    📊 시장 전망: 체험형 소비 트렌드와 맞물려 DIY 키트 및 체험 프로그램 시장이 확대되고 있으며, 고객 참여형 비즈니스 모델이 주목받고 있습니다.
                  </p>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border-l-4 border-cyan-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    인테리어 소품 및 건축 자재 제작
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    커피찌꺼기를 활용한 인테리어 소품(화분, 벽 장식, 테이블 장식, 코스터 등)과 건축 자재를 제작하여 판매하는 사업장이 등장하고 있습니다.
                  </p>
                  <p className="text-xs text-cyan-700 dark:text-cyan-300 font-medium">
                    📊 시장 전망: 친환경 인테리어 소품 시장이 빠르게 성장하며, 업사이클링 제품에 대한 수요가 증가하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 페인트 회사 커피박 활용 */}
            <div id="paint" className="mt-8 scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span>🎨</span>
                페인트 회사의 커피박 활용
              </h3>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-400 mb-4">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  페인트 회사에서 커피박 활용
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  페인트 회사에서 커피찌꺼기를 미세하게 분쇄하여 페인트 첨가제로 활용하면, 친환경 페인트, 텍스처 페인트, 자연스러운 갈색 톤의 페인트를 개발할 수 있습니다. 커피박의 흡착 특성을 활용한 공기 정화 기능성 페인트 개발도 가능합니다.
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                  📊 시장 전망: 친환경 페인트 시장이 지속적으로 성장하며, 기능성 페인트에 대한 관심이 높아지고 있습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6" />
                커피박
              </h3>
              <p className="text-gray-400 text-sm">
                커피찌꺼기 재활용에 대한 상세 정보와 연구 결과를 제공합니다
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">관련 링크</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" prefetch={true} className="text-gray-400 hover:text-white transition-colors text-sm">
                    홈으로 돌아가기
                  </Link>
                </li>
                <li>
                  <a href="#ordinance" className="text-gray-400 hover:text-white transition-colors text-sm">
                    조례안 보기
                  </a>
                </li>
                <li>
                  <a href="#research" className="text-gray-400 hover:text-white transition-colors text-sm">
                    연구 결과
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 커피박 재활용 프로젝트. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

