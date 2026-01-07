import { Doctor } from "./doctor";
import { Symptom } from "./symptom";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface PatientInfo {
  name: string;
  phone: string;
  birthdate: string;
  memo?: string;
  privacyAgreed: boolean;
}

export interface Booking {
  id: string;
  patientInfo: PatientInfo;
  selectedSymptoms: Symptom[];
  selectedDoctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  status: BookingStatus;
  createdAt: Date;
}

export interface BookingState {
  currentStep: number;
  selectedBodyParts: string[];
  selectedSymptoms: Symptom[];
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTime: string | null;
  patientInfo: PatientInfo | null;
}
