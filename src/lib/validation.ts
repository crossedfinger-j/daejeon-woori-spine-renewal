import { z } from "zod";

export const patientFormSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요")
    .max(10, "이름은 10자 이하로 입력해주세요")
    .regex(/^[가-힣]+$/, "한글 이름만 입력 가능합니다"),
  phone: z
    .string()
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      "올바른 휴대폰 번호를 입력해주세요"
    ),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "올바른 생년월일을 입력해주세요"),
  memo: z.string().max(500, "메모는 500자 이하로 입력해주세요").optional(),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집에 동의해주세요",
  }),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
