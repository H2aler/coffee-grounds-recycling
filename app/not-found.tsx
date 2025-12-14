import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#654321] hover:bg-[#473417] dark:bg-[#654A21] dark:hover:bg-[#654321] text-white rounded-xl font-semibold flex items-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            홈으로
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 bg-white dark:bg-gray-700 text-[#654321] dark:text-[#654A21] border-2 border-[#654321] dark:border-[#654A21] rounded-xl font-semibold flex items-center gap-2 hover:bg-[#654321]/10 dark:hover:bg-[#654A21]/10 transition-colors"
          >
            <Search className="w-5 h-5" />
            제품 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

