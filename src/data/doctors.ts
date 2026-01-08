import { Doctor } from "@/types";
import { DepartmentType } from "@/types/center";

// 실제 대전우리병원 진료시간 기반 시간 슬롯 생성
// 평일: 09:00-18:00 (점심 12:30-13:30)
// 토요일: 09:00-17:00
// 일요일: 휴무
//
// 주의: SSR hydration 불일치 방지를 위해 결정적 가용성 패턴 사용
// 로컬 시간대 기준 날짜 문자열 생성 (YYYY-MM-DD)
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateTimeSlots(doctorId: string): Doctor["availableSlots"] {
  const slots: Doctor["availableSlots"] = [];

  // 현재 날짜 기준으로 시작 (오늘부터 30일간)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 결정적 해시 함수 (Math.random 대신 사용)
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  for (let day = 0; day <= 30; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);

    // 일요일 제외 (휴무)
    if (date.getDay() === 0) continue;

    const dateStr = formatLocalDate(date);
    const isSaturday = date.getDay() === 6;

    // 토요일: 09:00-17:00, 평일: 09:00-18:00 (점심시간 12:30-13:30 제외)
    const times = isSaturday
      ? ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"]
      : ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

    times.forEach((time) => {
      // 결정적 가용성 패턴: doctorId + 날짜 + 시간을 기반으로 계산
      const seed = hashCode(`${doctorId}-${dateStr}-${time}`);
      const available = seed % 10 > 2; // 약 70% 가용성

      slots.push({
        date: dateStr,
        time,
        available,
      });
    });
  }

  return slots;
}

// 실제 대전우리병원 의료진 데이터
// 출처: https://www.woorispine.com/base/2019/sub2/01.php
export const doctors: Doctor[] = [
  // === 척추센터 ===
  {
    id: "doc-park-cw",
    name: "박철웅",
    title: "병원장",
    specialty: ["척추내시경수술", "최소침습척추수술", "목디스크", "허리디스크", "척추관협착증"],
    center: "spine",
    department: "spine-center",
    profileImage: "/images/doctors/park-cheolwoong.jpg",
    education: [
      "연세대학교 의과대학 졸업",
      "연세대학교 대학원 의학박사",
    ],
    career: [
      "現 대전우리병원 병원장",
      "現 세계양방향척추내시경수술학회(WUBES) 회장",
      "現 대한척추내시경수술연구회 회장",
      "前 서울우리들병원 레이저내시경센터 소장/수련부장",
      "제17대 대한최소침습척추학회장",
      "27년간 2만7000례 이상 척추수술 집도",
      "22개국 182명 해외 의료진 연수 교육",
    ],
    certifications: [
      "신경외과 전문의",
      "미국 최소침습 척추수술(FABMISS) 전문의",
      "영국 왕립 내외과학회(RCPS) 정회원",
      "국제 최소침습 척추수술학회(ISMISS) 정회원",
      "미국척추신경외과학회 정회원",
      "대한신경외과학회 정회원",
    ],
    introduction:
      "국내 최초 척추 후궁간 접근 레이저내시경 디스크 제거술(2001년), 세계 최초 척추 후궁간 접근 레이저내시경 척추협착 확장술(2003년)을 시술한 척추내시경 분야의 세계적 권위자입니다.",
    availableSlots: generateTimeSlots("doc-park-cw"),
  },
  {
    id: "doc-park-wm",
    name: "박우민",
    title: "척추신경외과 과장",
    specialty: ["척추내시경수술", "목디스크", "허리디스크", "척추관협착증"],
    center: "spine",
    department: "spine-center",
    profileImage: "/images/doctors/park-woomin.jpg",
    education: [
      "의과대학 졸업",
      "의학 석사",
    ],
    career: [
      "現 대전우리병원 척추신경외과 과장",
      "척추 질환 풍부한 임상 경험",
      "척추내시경수술 전문",
    ],
    certifications: ["신경외과 전문의"],
    introduction:
      "풍부한 임상 경험을 바탕으로 환자 개개인에게 최적화된 척추 치료를 제공합니다.",
    availableSlots: generateTimeSlots("doc-park-wm"),
  },
  {
    id: "doc-park-jh",
    name: "박정훈",
    title: "신경외과 전문의",
    specialty: ["뇌종양수술", "내시경척추수술", "후두와병변"],
    center: "spine",
    department: "spine-center",
    profileImage: "/images/doctors/park-junghoon.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 신경외과 전문의",
      "뇌종양 및 후두와 병변 연구",
      "내시경 척추수술 학술활동",
    ],
    certifications: ["신경외과 전문의"],
    introduction:
      "뇌종양 수술과 내시경 척추수술 분야에서 활발한 학술 활동을 이어가고 있습니다.",
    availableSlots: generateTimeSlots("doc-park-jh"),
  },
  {
    id: "doc-lee-sm",
    name: "이상민",
    title: "신경외과 전문의",
    specialty: ["최소침습척추수술", "내시경척추수술", "경추질환", "요추질환"],
    center: "spine",
    department: "spine-center",
    profileImage: "/images/doctors/lee-sangmin.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 신경외과 전문의",
      "최소침습 척추수술 전문",
      "내시경 척추수술 교과서 공동저술",
      "국제학회 활발한 활동",
    ],
    certifications: ["신경외과 전문의"],
    introduction:
      "최소침습 척추수술과 내시경 척추수술 전문의로서 환자의 빠른 회복을 위해 최선을 다합니다.",
    availableSlots: generateTimeSlots("doc-lee-sm"),
  },
  {
    id: "doc-an-ty",
    name: "안태용",
    title: "신경외과 전문의",
    specialty: ["경추외상", "척추외상", "혈관질환"],
    center: "spine",
    department: "spine-center",
    profileImage: "/images/doctors/an-taeyong.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 신경외과 전문의",
      "경추 외상 및 척추 혈관 손상 연구",
      "척추체절제술 후 침하 연구",
    ],
    certifications: ["신경외과 전문의"],
    introduction:
      "척추 외상과 혈관 질환 분야에서 전문성을 갖추고 있으며, 환자 안전을 최우선으로 합니다.",
    availableSlots: generateTimeSlots("doc-an-ty"),
  },

  // === 관절센터 ===
  {
    id: "doc-lee-gw",
    name: "이근욱",
    title: "정형외과 과장",
    specialty: ["어깨관절", "무릎관절", "회전근개파열", "스포츠손상", "골절"],
    center: "joint",
    department: "joint-center",
    profileImage: "/images/doctors/lee-geunwook.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 정형외과 과장",
      "관절, 골절, 회전근개 손상 치료 전문",
      "스포츠의학 전문",
      "무릎 관절 질환 전문",
    ],
    certifications: ["정형외과 전문의", "스포츠의학 전문의"],
    introduction:
      "어깨와 무릎 관절 질환, 스포츠 손상 치료의 전문가로서 활동적인 삶을 되찾아드립니다.",
    availableSlots: generateTimeSlots("doc-lee-gw"),
  },
  {
    id: "doc-ma-th",
    name: "마태훈",
    title: "정형외과 전문의",
    specialty: ["족부질환", "발목질환", "발목관절", "스포츠손상"],
    center: "joint",
    department: "joint-center",
    profileImage: "/images/doctors/ma-taehoon.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 정형외과 전문의",
      "족부 및 발목 질환 전문",
      "FIFA 팀의사 활동",
      "스포츠의학 전문",
    ],
    certifications: ["정형외과 전문의", "FIFA 팀의사"],
    introduction:
      "FIFA 팀의사 경험을 바탕으로 족부 및 발목 질환, 스포츠 손상 치료에 전문성을 갖추고 있습니다.",
    availableSlots: generateTimeSlots("doc-ma-th"),
  },

  // === 비수술치료센터 ===
  {
    id: "doc-kim-hy",
    name: "김현영",
    title: "비수술치료센터 과장",
    specialty: ["FIMS", "신경성형술", "프롤로치료", "신경차단술"],
    center: "pain",
    department: "nonsurgical",
    profileImage: "/images/doctors/kim-hyunyoung.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 비수술치료센터 과장",
      "FIMS(기능적 근육내자극치료) 전문",
      "신경성형술 전문",
      "대한통증학회 정회원",
    ],
    certifications: ["마취통증의학과 전문의"],
    introduction:
      "수술 없이 통증의 근본 원인을 치료하는 비수술적 치료 전문의입니다.",
    availableSlots: generateTimeSlots("doc-kim-hy"),
  },

  // === 마취통증의학과 ===
  {
    id: "doc-lee-js",
    name: "이준석",
    title: "마취통증의학과 과장",
    specialty: ["경막외시술", "척추통증", "만성통증", "신경차단술"],
    center: "pain",
    department: "pain",
    profileImage: "/images/doctors/lee-junseok.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 마취통증의학과 과장",
      "경막외 시술 전문",
      "척추 통증 관리 전문",
      "대한통증학회 정회원",
    ],
    certifications: ["마취통증의학과 전문의"],
    introduction:
      "비수술적 통증 치료의 전문가로서 환자분들의 통증 없는 일상을 위해 최선을 다합니다.",
    availableSlots: generateTimeSlots("doc-lee-js"),
  },
  {
    id: "doc-hong-jc",
    name: "홍장춘",
    title: "마취통증의학과 전문의",
    specialty: ["만성통증", "신경통", "신경차단술", "통증관리"],
    center: "pain",
    department: "pain",
    profileImage: "/images/doctors/hong-jangchun.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 마취통증의학과 전문의",
      "만성 통증 관리 전문",
      "신경차단술 전문",
    ],
    certifications: ["마취통증의학과 전문의"],
    introduction:
      "만성 통증으로 고통받는 환자분들께 최적의 치료 방법을 제시해드립니다.",
    availableSlots: generateTimeSlots("doc-hong-jc"),
  },
  {
    id: "doc-lee-jg",
    name: "이지구",
    title: "마취통증의학과 전문의",
    specialty: ["통증치료", "신경차단술", "마취"],
    center: "pain",
    department: "pain",
    profileImage: "/images/doctors/lee-jigu.jpg",
    education: [
      "의과대학 졸업",
    ],
    career: [
      "現 대전우리병원 마취통증의학과 전문의",
      "통증 치료 전문",
    ],
    certifications: ["마취통증의학과 전문의"],
    introduction:
      "안전한 마취와 효과적인 통증 치료로 환자분들의 편안한 치료를 돕습니다.",
    availableSlots: generateTimeSlots("doc-lee-jg"),
  },

  // === 내과 ===
  {
    id: "doc-choi-ms",
    name: "최민수",
    title: "내과 과장",
    specialty: ["당뇨병", "고혈압", "고지혈증", "건강검진", "내과질환"],
    center: "checkup",
    department: "internal",
    profileImage: "/images/doctors/choi-minsu.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 내과 과장",
      "만성질환 관리 전문",
      "건강검진 전문",
      "대한내과학회 정회원",
    ],
    certifications: ["내과 전문의"],
    introduction:
      "척추·관절 수술 전후 내과적 관리와 만성질환 관리를 전문으로 합니다.",
    availableSlots: generateTimeSlots("doc-choi-ms"),
  },

  // === 영상의학과 ===
  {
    id: "doc-jung-sw",
    name: "정성우",
    title: "영상의학과 과장",
    specialty: ["MRI판독", "CT판독", "척추영상", "관절영상", "초음파"],
    center: "checkup",
    department: "radiology",
    profileImage: "/images/doctors/jung-sungwoo.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 영상의학과 과장",
      "척추·관절 영상 판독 전문",
      "근골격계 초음파 전문",
      "대한영상의학회 정회원",
    ],
    certifications: ["영상의학과 전문의"],
    introduction:
      "정확한 영상 판독으로 척추·관절 질환의 진단에 기여합니다.",
    availableSlots: generateTimeSlots("doc-jung-sw"),
  },

  // === 재활의학과 ===
  {
    id: "doc-kim-jh",
    name: "김진호",
    title: "재활의학과 과장",
    specialty: ["척추재활", "관절재활", "수술후재활", "운동치료", "통증재활"],
    center: "rehab",
    department: "rehab",
    profileImage: "/images/doctors/kim-jinho.jpg",
    education: [
      "의과대학 졸업",
      "의학박사",
    ],
    career: [
      "現 대전우리병원 재활의학과 과장",
      "척추·관절 재활 전문",
      "수술 후 재활 프로그램 운영",
      "대한재활의학회 정회원",
    ],
    certifications: ["재활의학과 전문의"],
    introduction:
      "체계적인 재활 프로그램으로 환자분들의 빠른 일상 복귀를 돕습니다.",
    availableSlots: generateTimeSlots("doc-kim-jh"),
  },
  {
    id: "doc-yoon-sh",
    name: "윤서희",
    title: "재활의학과 전문의",
    specialty: ["도수치료", "운동재활", "근골격재활", "스포츠재활"],
    center: "rehab",
    department: "rehab",
    profileImage: "/images/doctors/yoon-seohee.jpg",
    education: [
      "의과대학 졸업",
      "의학석사",
    ],
    career: [
      "現 대전우리병원 재활의학과 전문의",
      "도수치료 전문",
      "스포츠 재활 전문",
    ],
    certifications: ["재활의학과 전문의"],
    introduction:
      "맞춤형 재활 치료로 환자분들의 건강한 삶을 되찾아드립니다.",
    availableSlots: generateTimeSlots("doc-yoon-sh"),
  },
];

// 진료과 정보
export const departmentInfo: Record<DepartmentType, { name: string; description: string }> = {
  "spine-center": {
    name: "척추센터",
    description: "척추내시경수술의 세계적 권위, 최소침습 척추 치료"
  },
  "joint-center": {
    name: "관절센터",
    description: "어깨·무릎·발목 관절 질환 전문 치료"
  },
  "nonsurgical": {
    name: "비수술치료센터",
    description: "FIMS, 신경성형술, 프롤로치료 등 비수술 치료"
  },
  "pain": {
    name: "마취통증의학과",
    description: "신경차단술, 경막외시술 등 통증 전문 치료"
  },
  "internal": {
    name: "내과",
    description: "수술 전후 내과적 관리 및 만성질환 관리"
  },
  "radiology": {
    name: "영상의학과",
    description: "MRI·CT·초음파 정밀 영상 판독"
  },
  "rehab": {
    name: "재활의학과",
    description: "척추·관절 재활 및 수술 후 회복 프로그램"
  }
};

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}

export function getDoctorsByCenter(center: string): Doctor[] {
  return doctors.filter((doctor) => doctor.center === center);
}

export function getDoctorsByDepartment(department: DepartmentType): Doctor[] {
  return doctors.filter((doctor) => doctor.department === department);
}

export function getDoctorsBySymptoms(symptoms: string[]): Doctor[] {
  return doctors.filter((doctor) =>
    doctor.specialty.some((spec) =>
      symptoms.some(
        (symptom) =>
          spec.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(spec.toLowerCase())
      )
    )
  );
}
