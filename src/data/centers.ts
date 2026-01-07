import { Center } from "@/types";

// 실제 대전우리병원 센터 데이터
// 출처: https://www.woorispine.com/
export const centers: Center[] = [
  {
    id: "center-spine",
    name: "척추센터",
    slug: "spine",
    shortName: "척추",
    description: "허리질환, 목질환 전문 진료 - 척추내시경수술 세계적 권위",
    fullDescription:
      "대전우리병원 척추센터는 세계양방향척추내시경수술학회(WUBES) 회장 박철웅 병원장을 필두로 국내 최고 수준의 척추 전문 의료진이 허리디스크, 목디스크, 척추관협착증 등 다양한 척추 질환을 최소침습 수술과 비수술 치료로 정확하게 진단하고 치료합니다. 27년간 2만 7천례 이상의 수술 경험을 바탕으로 환자 맞춤형 치료를 제공합니다.",
    treatments: [
      { id: "t1", name: "허리디스크", description: "요추 추간판탈출증 비수술/수술 치료" },
      { id: "t2", name: "목디스크", description: "경추 추간판탈출증 전문 치료" },
      { id: "t3", name: "척추관협착증", description: "척추관 좁아짐 내시경 치료" },
      { id: "t4", name: "척추전방전위증", description: "척추뼈 어긋남 교정 치료" },
      { id: "t5", name: "척추내시경수술", description: "최소침습 양방향 내시경 수술" },
      { id: "t6", name: "척추측만증", description: "척추 휘어짐 교정 치료" },
    ],
    heroImage: "/images/centers/spine.jpg",
    themeColor: "var(--center-spine)",
    icon: "Spine",
  },
  {
    id: "center-joint",
    name: "관절센터",
    slug: "joint",
    shortName: "관절",
    description: "어깨, 무릎, 엉치, 발, 손 관절 질환 전문 치료",
    fullDescription:
      "대전우리병원 관절센터는 어깨관절, 무릎관절, 고관절, 족부관절, 수부관절 등 모든 관절 질환을 전문적으로 진료합니다. 스포츠의학 전문의와 FIFA 팀의사 경력의 전문 의료진이 관절경 수술, 인대 재건술, 연골 재생 치료 등 최신 치료 기술로 환자분들의 활동적인 삶을 되찾아드립니다.",
    treatments: [
      { id: "t7", name: "어깨질환", description: "회전근개파열, 오십견, 어깨충돌증후군" },
      { id: "t8", name: "무릎질환", description: "퇴행성관절염, 십자인대손상, 반월상연골손상" },
      { id: "t9", name: "엉치질환", description: "고관절 질환, 대퇴골두무혈성괴사" },
      { id: "t10", name: "발질환", description: "족저근막염, 무지외반증, 발목인대손상" },
      { id: "t11", name: "손질환", description: "손목터널증후군, 방아쇠손가락, 손목건초염" },
      { id: "t12", name: "스포츠손상", description: "스포츠 외상 및 재활 치료" },
    ],
    heroImage: "/images/centers/joint.jpg",
    themeColor: "var(--center-joint)",
    icon: "Bone",
  },
  {
    id: "center-pain",
    name: "비수술치료센터",
    slug: "pain",
    shortName: "비수술",
    description: "FIMS, 신경성형술, 프롤로치료, 신경차단술",
    fullDescription:
      "대전우리병원 비수술치료센터는 수술 없이 척추·관절 통증을 효과적으로 치료합니다. FIMS(기능적 근육내자극치료), IMS, 신경성형술, 프롤로치료, 신경차단술 등 다양한 비수술적 치료법을 통해 통증의 근본 원인을 치료하고, 환자분들이 일상생활로 빠르게 복귀할 수 있도록 돕습니다.",
    treatments: [
      { id: "t13", name: "FIMS", description: "기능적 근육내자극치료" },
      { id: "t14", name: "IMS", description: "근육내자극치료" },
      { id: "t15", name: "신경성형술", description: "신경 유착 박리 및 치료" },
      { id: "t16", name: "프롤로치료", description: "인대·힘줄 재생 주사 치료" },
      { id: "t17", name: "신경차단술", description: "통증 신경 차단 시술" },
      { id: "t18", name: "경막외시술", description: "척추 통증 완화 시술" },
    ],
    heroImage: "/images/centers/pain.jpg",
    themeColor: "var(--center-pain)",
    icon: "Activity",
  },
  {
    id: "center-rehab",
    name: "물리치료센터",
    slug: "rehab",
    shortName: "물리치료",
    description: "척추관절물리치료, 도수교정치료, 체외충격파",
    fullDescription:
      "대전우리병원 물리치료센터는 전문 물리치료사의 1:1 맞춤 치료를 통해 척추·관절 환자분들의 빠른 회복을 돕습니다. 척추관절물리치료, 도수교정치료, 체외충격파, 만성통증치료 등 다양한 재활 프로그램을 운영하며, 수술 전후 재활부터 만성 통증 관리까지 체계적인 치료를 제공합니다.",
    treatments: [
      { id: "t19", name: "척추관절물리치료", description: "척추·관절 기능 회복 치료" },
      { id: "t20", name: "도수교정치료", description: "전문 치료사 1:1 도수 치료" },
      { id: "t21", name: "체외충격파", description: "힘줄·인대 재생 촉진 치료" },
      { id: "t22", name: "만성통증치료", description: "만성 근골격계 통증 관리" },
      { id: "t23", name: "수술 후 재활", description: "수술 후 기능 회복 프로그램" },
      { id: "t24", name: "운동치료", description: "맞춤형 운동 재활 프로그램" },
    ],
    heroImage: "/images/centers/rehab.jpg",
    themeColor: "var(--center-rehab)",
    icon: "Dumbbell",
  },
  {
    id: "center-checkup",
    name: "검진센터",
    slug: "checkup",
    shortName: "검진",
    description: "근골격 검진, 보행분석, 족저압 검사",
    fullDescription:
      "대전우리병원 검진센터는 최신 검사 장비를 통해 척추·관절 질환의 조기 발견 및 예방을 위한 정밀 검진 서비스를 제공합니다. 보행분석/족저압 검사, 발변형검사, 근골격계 기능 평가 등 전문 검진 프로그램을 통해 환자분들의 건강 상태를 정확하게 진단합니다.",
    treatments: [
      { id: "t25", name: "보행분석검사", description: "걸음걸이 패턴 정밀 분석" },
      { id: "t26", name: "족저압검사", description: "발바닥 압력 분포 검사" },
      { id: "t27", name: "발변형검사", description: "평발, 요족 등 발 구조 검사" },
      { id: "t28", name: "척추 정밀검진", description: "척추 MRI/CT 검사" },
      { id: "t29", name: "관절 정밀검진", description: "관절 MRI/초음파 검사" },
      { id: "t30", name: "골밀도검사", description: "골다공증 정밀 검진" },
    ],
    heroImage: "/images/centers/checkup.jpg",
    themeColor: "var(--center-checkup)",
    icon: "Stethoscope",
  },
];

export function getCenterBySlug(slug: string): Center | undefined {
  return centers.find((center) => center.slug === slug);
}
