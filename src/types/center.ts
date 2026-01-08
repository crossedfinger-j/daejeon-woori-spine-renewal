export type CenterType = "spine" | "joint" | "pain" | "rehab" | "checkup";

// 진료과 타입 (의료진 소개 페이지용)
export type DepartmentType =
  | "spine-center"      // 척추센터
  | "joint-center"      // 관절센터
  | "nonsurgical"       // 비수술치료센터
  | "pain"              // 마취통증의학과
  | "internal"          // 내과
  | "radiology"         // 영상의학과
  | "rehab";            // 재활의학과

export interface Treatment {
  id: string;
  name: string;
  description: string;
}

export interface Center {
  id: string;
  name: string;
  slug: CenterType;
  shortName: string;
  description: string;
  fullDescription: string;
  treatments: Treatment[];
  heroImage: string;
  themeColor: string;
  icon: string;
}
