"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Recycle, Leaf, Zap } from "lucide-react";

interface Stat {
  icon: typeof TrendingUp;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: Stat[] = [
  { icon: Recycle, label: "재활용률", value: 85, suffix: "%", color: "green" },
  { icon: TrendingUp, label: "연간 배출량", value: 150, suffix: "천톤", color: "blue" },
  { icon: Leaf, label: "탄소 감소량", value: 45, suffix: "톤 CO₂", color: "emerald" },
  { icon: Zap, label: "참여 사업장", value: 250, suffix: "개소", color: "orange" },
];

export default function InteractiveStats() {
  const [countedValues, setCountedValues] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const timers = stats.map((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCountedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });
      }, stepDuration);

      return timer;
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [isInView]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
              stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
              stat.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
              'bg-orange-100 dark:bg-orange-900/30'
            }`}>
              <Icon className={`w-6 h-6 ${
                stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                stat.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                'text-orange-600 dark:text-orange-400'
              }`} />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {countedValues[index]}
              <span className="text-2xl text-gray-500 dark:text-gray-400">{stat.suffix}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

