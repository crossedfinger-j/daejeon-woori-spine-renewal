import { CenterType } from "./center";

export type BodyPart =
  | "neck"
  | "back"
  | "shoulder"
  | "knee"
  | "hand"
  | "foot"
  | "hip";

export interface BodyPartInfo {
  id: BodyPart;
  name: string;
  nameKo: string;
  icon: string;
}

export interface Symptom {
  id: string;
  bodyPart: BodyPart;
  name: string;
  description: string;
  relatedCenters: CenterType[];
  severity?: "mild" | "moderate" | "severe";
}
