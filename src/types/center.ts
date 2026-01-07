export type CenterType = "spine" | "joint" | "pain" | "rehab" | "checkup";

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
