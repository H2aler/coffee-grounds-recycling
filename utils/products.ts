export interface ProductColor {
  name: string;
  code: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  pricePerL: string;
  features: string[];
  colors: ProductColor[];
  image: string;
  sizes: string[];
  coverage: string;
  dryTime: string;
  masticeUrl?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Table / stool [set]",
    category: "가구",
    description: "Handcrafted Finish Furniture / Customizable. 천연 라임 기반 플라스터로 제작된 완전 수작업 텍스처 마감의 테이블과 스툴 세트.",
    fullDescription: "마스티체의 Table / stool [set]은 Handcrafted Finish Furniture로 Customizable(맞춤 제작)이 가능한 가구입니다. 천연 라임 기반 플라스터(Natural lime-based plaster) 소재로 제작되었으며, 완전 수작업으로 적용된 텍스처(Fully hand-applied texture)가 독특한 질감을 만들어냅니다. 벽면 고정형 또는 독립형 디스플레이(Wall-mounted or standalone display)로 활용 가능합니다. 제품 사양: 테이블 H: 760mm × W: 600mm / 스툴 H: 400mm × W: 400mm, 무게 약 15kg 이상. 배송은 택배 또는 화물 착불 배송(Courier / Cargo freight collect only)으로 진행됩니다.",
    price: 0,
    pricePerL: "문의",
    features: [
      "Handcrafted Finish Furniture",
      "Natural lime-based plaster 소재",
      "Fully hand-applied texture 마감",
      "Wall-mounted or standalone display",
      "Customizable 맞춤 제작 가능",
      "무게 약 15kg 이상"
    ],
    colors: [
      { name: "베이지 화이트", code: "#F5F5DC" },
      { name: "모래 브라운", code: "#D2B48C" },
      { name: "네추럴 베이지", code: "#E6D5B8" },
      { name: "라이트 그레이", code: "#D3D3D3" }
    ],
    image: "/masicie_pic/table_stool_set.jpg",
    sizes: ["테이블 + 스툴 세트", "테이블 단품", "스툴 단품"],
    coverage: "테이블: H 760mm × W 600mm / 스툴: H 400mm × W 400mm",
    dryTime: "맞춤 제작: 주문 후 2주 이내 발송",
    masticeUrl: "https://mastice.co.kr/product/table-stool-set/324/category/42/display/1/"
  },
  {
    id: 2,
    name: "Mastice Portfolio#141",
    category: "포트폴리오",
    description: "Mastice wave stone / working with 4t-6t trowell / rubber / pigment coloring / wave stone texture",
    fullDescription: "Mastice Portfolio#141은 웨이브 스톤 텍스처를 가진 마스티체의 대표 포트폴리오 작품입니다. 4t-6t 트로웰(working with 4t-6t trowell)을 사용하여 제작되었으며, 고무(rubber)와 안료 착색(pigment coloring) 기법을 통해 독특한 웨이브 스톤 텍스처(wave stone texture)를 구현했습니다. 자연스러운 파도 모양의 질감이 인테리어에 독특한 포인트를 줍니다. 맞춤 제작이 가능하며, 벽면 장식, 가구, 인테리어 요소로 활용할 수 있습니다.",
    price: 2000000,
    pricePerL: "",
    features: [
      "Mastice wave stone 텍스처",
      "4t-6t trowell 작업 기법",
      "Rubber 및 pigment coloring",
      "Wave stone texture 마감",
      "맞춤 제작 가능",
      "인테리어 포인트 제품"
    ],
    colors: [
      { name: "다크 그레이", code: "#4A4A4A" },
      { name: "차콜 그레이", code: "#2C2C2C" },
      { name: "스톤 그레이", code: "#6B6B6B" },
      { name: "네추럴 그레이", code: "#808080" }
    ],
    image: "/masicie_pic/Mastice_Portfolio#141.jpg",
    sizes: ["맞춤 제작", "표준 사이즈", "대형 사이즈"],
    coverage: "맞춤 제작 가능 (사이즈 문의)",
    dryTime: "맞춤 제작: 주문 후 2-3주 이내 발송",
    masticeUrl: "https://mastice.co.kr/portfolio-detail.html?product_no=309&cate_no=43&display_group=1"
  },
  {
    id: 3,
    name: "Mastice Portfolio#129",
    category: "포트폴리오",
    description: "Mastice art plaster / Working with 4t-6t trowell / roller / pigment coloring / art texture",
    fullDescription: "Mastice Portfolio#129은 아트 플라스터 텍스처를 가진 마스티체의 프리미엄 포트폴리오 작품입니다. 4t-6t 트로웰(Working with 4t-6t trowell)을 사용하여 제작되었으며, 롤러(roller)와 안료 착색(pigment coloring) 기법을 통해 독특한 아트 텍스처(art texture)를 구현했습니다. 예술적인 질감과 색상이 인테리어에 고급스러운 포인트를 줍니다. 맞춤 제작이 가능하며, 벽면 장식, 가구, 인테리어 요소로 활용할 수 있습니다.",
    price: 9900000,
    pricePerL: "",
    features: [
      "Mastice art plaster 텍스처",
      "4t-6t trowell 작업 기법",
      "Roller 및 pigment coloring",
      "Art texture 마감",
      "맞춤 제작 가능",
      "프리미엄 인테리어 제품"
    ],
    colors: [
      { name: "아트 베이지", code: "#E8DCC6" },
      { name: "아트 그레이", code: "#9B9B9B" },
      { name: "아트 브라운", code: "#8B7355" },
      { name: "아트 화이트", code: "#F5F5F0" }
    ],
    image: "/masicie_pic/Mastice_Portfolio#129.jpg",
    sizes: ["맞춤 제작", "표준 사이즈", "대형 사이즈"],
    coverage: "맞춤 제작 가능 (사이즈 문의)",
    dryTime: "맞춤 제작: 주문 후 2-3주 이내 발송",
    masticeUrl: "https://mastice.co.kr/portfolio-detail.html?product_no=278&cate_no=43&display_group=1"
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

