"use client";

import { motion } from "framer-motion";
import { Paintbrush, Heart, Home, Lightbulb } from "lucide-react";

interface Card {
  icon: typeof Paintbrush;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const cards: Card[] = [
  {
    icon: Paintbrush,
    title: "페인트 제작",
    description: "커피박을 활용한 친환경 페인트 제작으로 실내 공기 질 개선",
    color: "indigo",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Heart,
    title: "탈취제 제작",
    description: "천연 탈취제로 냉장고, 신발장 등에 활용 가능",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Home,
    title: "인테리어 소품",
    description: "화분, 벽 장식, 코스터 등 독특한 질감의 인테리어 소품 제작",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Lightbulb,
    title: "DIY 키트",
    description: "고객이 직접 만들 수 있는 체험형 DIY 키트 및 프로그램",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
  },
];

interface FloatingCardsProps {
  searchTerm: string;
}

export default function FloatingCards({ searchTerm }: FloatingCardsProps) {
  const filteredCards = cards.filter(
    (card) =>
      !searchTerm ||
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {filteredCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -10 }}
            className="relative group"
          >
            <div className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 shadow-2xl overflow-hidden relative`}>
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
              </div>

              {/* 콘텐츠 */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-white/90 leading-relaxed">{card.description}</p>
              </div>

              {/* 호버 효과 */}
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

