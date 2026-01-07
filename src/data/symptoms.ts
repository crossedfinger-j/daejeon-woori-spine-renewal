import { BodyPartInfo, Symptom } from "@/types";

export const bodyParts: BodyPartInfo[] = [
  { id: "neck", name: "neck", nameKo: "목/경추", icon: "🦒" },
  { id: "back", name: "back", nameKo: "허리/요추", icon: "🔙" },
  { id: "shoulder", name: "shoulder", nameKo: "어깨", icon: "💪" },
  { id: "knee", name: "knee", nameKo: "무릎", icon: "🦵" },
  { id: "hand", name: "hand", nameKo: "손/손목", icon: "🤚" },
  { id: "foot", name: "foot", nameKo: "발/발목", icon: "🦶" },
  { id: "hip", name: "hip", nameKo: "고관절", icon: "🦴" },
];

export const symptoms: Symptom[] = [
  // 목/경추 증상
  {
    id: "sym-1",
    bodyPart: "neck",
    name: "목 통증",
    description: "목 부위의 지속적인 통증이나 뻣뻣함",
    relatedCenters: ["spine", "pain"],
  },
  {
    id: "sym-2",
    bodyPart: "neck",
    name: "목 디스크 의심",
    description: "팔로 뻗어나가는 저림이나 방사통",
    relatedCenters: ["spine"],
  },
  {
    id: "sym-3",
    bodyPart: "neck",
    name: "거북목/일자목",
    description: "자세 이상으로 인한 목 불편감",
    relatedCenters: ["spine", "rehab"],
  },

  // 허리/요추 증상
  {
    id: "sym-4",
    bodyPart: "back",
    name: "허리 통증",
    description: "허리 부위의 지속적인 통증",
    relatedCenters: ["spine", "pain"],
  },
  {
    id: "sym-5",
    bodyPart: "back",
    name: "허리 디스크 의심",
    description: "다리로 뻗어나가는 저림이나 방사통",
    relatedCenters: ["spine"],
  },
  {
    id: "sym-6",
    bodyPart: "back",
    name: "척추관협착증 의심",
    description: "오래 걷기 힘들고 쉬면 나아지는 증상",
    relatedCenters: ["spine"],
  },
  {
    id: "sym-7",
    bodyPart: "back",
    name: "급성 요통",
    description: "갑자기 발생한 심한 허리 통증",
    relatedCenters: ["spine", "pain"],
  },

  // 어깨 증상
  {
    id: "sym-8",
    bodyPart: "shoulder",
    name: "어깨 통증",
    description: "어깨 부위의 지속적인 통증",
    relatedCenters: ["joint", "pain"],
  },
  {
    id: "sym-9",
    bodyPart: "shoulder",
    name: "오십견 의심",
    description: "팔을 들어올리기 어렵고 야간 통증",
    relatedCenters: ["joint"],
  },
  {
    id: "sym-10",
    bodyPart: "shoulder",
    name: "회전근개 손상 의심",
    description: "팔을 돌릴 때 통증, 힘 빠짐",
    relatedCenters: ["joint"],
  },

  // 무릎 증상
  {
    id: "sym-11",
    bodyPart: "knee",
    name: "무릎 통증",
    description: "무릎 부위의 지속적인 통증",
    relatedCenters: ["joint", "pain"],
  },
  {
    id: "sym-12",
    bodyPart: "knee",
    name: "퇴행성 관절염 의심",
    description: "무릎이 붓고 계단 오르내리기 힘듦",
    relatedCenters: ["joint"],
  },
  {
    id: "sym-13",
    bodyPart: "knee",
    name: "반월상연골 손상 의심",
    description: "무릎이 잠기거나 삐걱거림",
    relatedCenters: ["joint"],
  },
  {
    id: "sym-14",
    bodyPart: "knee",
    name: "인대 손상 의심",
    description: "무릎 불안정감, 스포츠 부상",
    relatedCenters: ["joint"],
  },

  // 손/손목 증상
  {
    id: "sym-15",
    bodyPart: "hand",
    name: "손목 통증",
    description: "손목 부위의 통증이나 불편감",
    relatedCenters: ["joint", "pain"],
  },
  {
    id: "sym-16",
    bodyPart: "hand",
    name: "손목터널증후군 의심",
    description: "손이 저리고 밤에 증상 악화",
    relatedCenters: ["pain", "joint"],
  },
  {
    id: "sym-17",
    bodyPart: "hand",
    name: "손가락 관절염",
    description: "손가락 마디 통증이나 변형",
    relatedCenters: ["joint"],
  },

  // 발/발목 증상
  {
    id: "sym-18",
    bodyPart: "foot",
    name: "발목 통증",
    description: "발목 부위의 통증이나 불편감",
    relatedCenters: ["joint", "pain"],
  },
  {
    id: "sym-19",
    bodyPart: "foot",
    name: "발목 염좌/삠",
    description: "발목을 삐어서 붓고 아픔",
    relatedCenters: ["joint"],
  },
  {
    id: "sym-20",
    bodyPart: "foot",
    name: "족저근막염",
    description: "아침에 첫 발 디딜 때 발바닥 통증",
    relatedCenters: ["pain", "rehab"],
  },

  // 고관절 증상
  {
    id: "sym-21",
    bodyPart: "hip",
    name: "고관절 통증",
    description: "사타구니나 엉덩이 부위 통증",
    relatedCenters: ["joint", "pain"],
  },
  {
    id: "sym-22",
    bodyPart: "hip",
    name: "고관절 관절염 의심",
    description: "다리를 벌리거나 돌리기 어려움",
    relatedCenters: ["joint"],
  },
  {
    id: "sym-23",
    bodyPart: "hip",
    name: "대퇴골두 무혈성괴사 의심",
    description: "젊은 나이에 갑작스런 고관절 통증",
    relatedCenters: ["joint"],
  },
];

export function getSymptomsByBodyPart(bodyPart: string): Symptom[] {
  return symptoms.filter((symptom) => symptom.bodyPart === bodyPart);
}

export function getBodyPartInfo(bodyPartId: string): BodyPartInfo | undefined {
  return bodyParts.find((bp) => bp.id === bodyPartId);
}
