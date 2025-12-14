import Link from "next/link";
import { products, getProductById } from "@/utils/products";
import ProductDetailClient from "./ProductDetailClient";

// 정적 내보내기를 위한 generateStaticParams 함수
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = getProductById(productId);

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

  return <ProductDetailClient product={product} />;
}

