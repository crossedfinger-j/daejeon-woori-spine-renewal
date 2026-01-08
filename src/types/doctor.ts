import { CenterType, DepartmentType } from "./center";

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  available: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  center: CenterType;
  department: DepartmentType; // 의료진 소개 페이지용 진료과
  profileImage: string;
  education: string[];
  career: string[];
  certifications: string[];
  introduction: string;
  availableSlots: TimeSlot[];
}
