import { create } from "zustand";
import { Doctor, Symptom, PatientInfo } from "@/types";

interface BookingStore {
  // State
  currentStep: number;
  selectedBodyParts: string[];
  selectedSymptoms: Symptom[];
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTime: string | null;
  patientInfo: PatientInfo | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  toggleBodyPart: (bodyPart: string) => void;
  setSelectedBodyParts: (bodyParts: string[]) => void;

  addSymptom: (symptom: Symptom) => void;
  removeSymptom: (symptomId: string) => void;
  setSelectedSymptoms: (symptoms: Symptom[]) => void;

  setDoctor: (doctor: Doctor | null) => void;

  setDate: (date: string | null) => void;
  setTime: (time: string | null) => void;

  setPatientInfo: (info: PatientInfo | null) => void;

  resetBooking: () => void;
}

const initialState = {
  currentStep: 1,
  selectedBodyParts: [],
  selectedSymptoms: [],
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  patientInfo: null,
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  toggleBodyPart: (bodyPart) =>
    set((state) => ({
      selectedBodyParts: state.selectedBodyParts.includes(bodyPart)
        ? state.selectedBodyParts.filter((bp) => bp !== bodyPart)
        : [...state.selectedBodyParts, bodyPart],
    })),

  setSelectedBodyParts: (bodyParts) => set({ selectedBodyParts: bodyParts }),

  addSymptom: (symptom) =>
    set((state) => ({
      selectedSymptoms: state.selectedSymptoms.some((s) => s.id === symptom.id)
        ? state.selectedSymptoms
        : [...state.selectedSymptoms, symptom],
    })),

  removeSymptom: (symptomId) =>
    set((state) => ({
      selectedSymptoms: state.selectedSymptoms.filter((s) => s.id !== symptomId),
    })),

  setSelectedSymptoms: (symptoms) => set({ selectedSymptoms: symptoms }),

  setDoctor: (doctor) => set({ selectedDoctor: doctor }),

  setDate: (date) => set({ selectedDate: date, selectedTime: null }),
  setTime: (time) => set({ selectedTime: time }),

  setPatientInfo: (info) => set({ patientInfo: info }),

  resetBooking: () => set(initialState),
}));
