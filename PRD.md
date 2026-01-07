# PRD: 대전우리병원 사용자 중심 리뉴얼

## 1. 프로젝트 개요

### 1.1 프로젝트 정보
| 항목 | 내용 |
|------|------|
| **프로젝트명** | 대전우리병원 사용자 중심 리뉴얼 (Daejeon Woori Spine Renewal) |
| **대상 사이트** | https://www.woorispine.com/ |
| **프로젝트 유형** | 프론트엔드 중심 인터랙티브 프로토타입 |
| **타겟 사용자** | 30대~70대 전 연령층 |

### 1.2 프로젝트 배경
대전 지역 최대 전문병원인 '대전우리병원'의 현재 웹사이트는 비반응형 레이아웃으로 모바일 사용자 경험이 열악하며, 복잡한 정보 구조로 인해 환자들의 예약 전환율이 낮은 상황입니다.

### 1.3 프로젝트 목표
- **Silver-Friendly**: 30~70대 전 연령층이 쉽게 사용할 수 있는 접근성 높은 웹사이트 구현
- **High-Conversion**: 환자가 병원을 선택하고 예약하기까지의 User Journey 최적화
- **Responsive Design**: 모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃

---

## 2. 핵심 설계 원칙

### 2.1 인지적 명확성 (Cognitive Clarity)
| 원칙 | 구현 방안 |
|------|----------|
| 가독성 | 최소 16px 이상의 폰트 사이즈 적용 |
| 시인성 | WCAG AA 기준 충족하는 고대비 컬러(High Contrast) 사용 |
| 직관성 | 의미가 명확한 아이콘과 레이블 병행 사용 |

### 2.2 터치 접근성 (Touch Accessibility)
| 원칙 | 구현 방안 |
|------|----------|
| 터치 타겟 | 최소 44px × 44px 이상의 터치 영역 확보 |
| 여백 | 인터랙티브 요소 간 최소 8px 이상 간격 유지 |
| 오류 방지 | 중요 액션에 확인 단계 추가 |

### 2.3 전환 최적화 (Conversion Optimization)
| 원칙 | 구현 방안 |
|------|----------|
| 단계 간소화 | 증상 기반 3단계 예약 프로세스 |
| 상시 접근성 | 하단 고정 액션 바로 핵심 기능 즉시 접근 |
| 신뢰 구축 | 의료진 정보와 리뷰를 예약 과정에 노출 |

---

## 3. 기능 요구사항

### 3.1 하단 고정 액션 바 (Sticky Quick Menu)

#### 기능 설명
화면 하단에 상시 노출되는 빠른 액션 메뉴로, 핵심 전환 액션에 즉시 접근 가능

#### 구성 요소
| 버튼 | 기능 | 아이콘 | 액션 |
|------|------|--------|------|
| 카톡 상담 | 카카오톡 채널 연결 | MessageCircle | 카카오톡 채널 페이지 이동 |
| 전화 연결 | ARS 전화 연결 | Phone | `tel:` 프로토콜 호출 |
| 온라인 예약 | 예약 시스템 진입 | Calendar | 예약 모달/페이지 오픈 |

#### 디자인 요구사항
- 높이: 60px (모바일), 자동 (데스크톱 - 우측 플로팅)
- 배경: 반투명 블러 효과 (backdrop-blur)
- Safe Area 대응 (iOS 노치 디바이스)

---

### 3.2 지능형 예약 플로우 (Smart Booking System)

#### 예약 프로세스 흐름
```
[Step 1: 부위/증상 선택]
        ↓
[Step 2: 전문 의료진 자동 매칭]
        ↓
[Step 3: 진료 시간 선택]
        ↓
[Step 4: 환자 정보 입력 & 예약 확정]
```

#### Step 1: 부위/증상 선택
| 기능 | 설명 |
|------|------|
| 부위 선택 UI | 인체 일러스트 기반 직관적 부위 선택 |
| 증상 태그 | 선택한 부위에 해당하는 증상 목록 표시 |
| 다중 선택 | 복합 증상 선택 가능 |

**부위 카테고리**
- 목/경추
- 허리/요추
- 어깨
- 무릎
- 손/손목
- 발/발목
- 고관절

#### Step 2: 의료진 자동 매칭
| 기능 | 설명 |
|------|------|
| 매칭 알고리즘 | 선택 증상 기반 전문 의료진 추천 |
| 의료진 카드 | 프로필, 전문분야, 경력 표시 |
| 정렬 옵션 | 추천순, 경력순, 빠른예약순 |

#### Step 3: 진료 시간 선택
| 기능 | 설명 |
|------|------|
| 캘린더 UI | 월간/주간 뷰 토글 |
| 시간 슬롯 | 30분 단위 예약 가능 시간 표시 |
| 실시간 표시 | 예약 가능/마감 상태 시각화 |

#### Step 4: 예약 확정
| 필드 | 필수여부 | 유효성 검사 |
|------|----------|-------------|
| 이름 | 필수 | 한글 2~10자 |
| 연락처 | 필수 | 휴대폰 번호 형식 |
| 생년월일 | 필수 | 유효한 날짜 |
| 증상 메모 | 선택 | 최대 500자 |
| 개인정보 동의 | 필수 | 체크 필수 |

---

### 3.3 시각화된 위치 안내

#### 기능 구성
| 기능 | 설명 |
|------|------|
| 인터랙티브 지도 | Kakao/Naver Map API 연동 |
| 현재 위치 기반 길찾기 | Geolocation API 활용 |
| 대중교통 안내 | 버스/지하철 노선 정보 |
| 주차 안내 | 주차장 위치 및 요금 정보 |

#### 교통 정보 표시
```
[자가용]
- 네비게이션 연동 버튼 (카카오내비, 티맵)
- 예상 소요시간 표시
- 주차장 안내

[대중교통]
- 가까운 버스정류장 및 노선
- 지하철역 정보 (해당시)
- 도보 소요시간
```

---

### 3.4 디지털 증명서 센터

#### 기능 목적
복잡한 보안 프로그램 설치 없이 증명서 발급 과정을 안내하는 직관적인 UI

#### 증명서 종류
| 증명서 | 발급 방법 | 예상 소요시간 |
|--------|----------|--------------|
| 진료확인서 | 온라인/방문 | 즉시~1일 |
| 진단서 | 방문 필수 | 3~5일 |
| 소견서 | 방문 필수 | 3~7일 |
| 입퇴원확인서 | 온라인/방문 | 즉시~1일 |

#### UI 구성
- 단계별 가이드 (Step-by-step Wizard)
- 필요 서류 체크리스트
- 발급 상태 추적 (시뮬레이션)
- FAQ 아코디언

---

### 3.5 센터별 카드 디자인

#### 전문 센터 목록
| 센터명 | 주요 진료 | 대표 컬러 |
|--------|----------|----------|
| 척추센터 | 디스크, 척추관협착증, 척추측만증 | Blue |
| 관절센터 | 무릎관절, 어깨관절, 고관절 | Green |
| 통증센터 | 만성통증, 신경통, 근막통증 | Orange |
| 재활센터 | 물리치료, 도수치료, 운동치료 | Purple |
| 검진센터 | 종합검진, 척추검진 | Teal |

#### 카드 컴포넌트 구성
```
┌─────────────────────────────────┐
│  [고해상도 센터 이미지]           │
├─────────────────────────────────┤
│  센터명                          │
│  한줄 소개                       │
│  ─────────────────────          │
│  주요 진료 항목 (태그)            │
│  [자세히 보기 버튼]              │
└─────────────────────────────────┘
```

---

## 4. 페이지 구조

### 4.1 사이트맵
```
/
├── / (메인 페이지)
│   ├── Hero 섹션
│   ├── 빠른 예약 CTA
│   ├── 전문 센터 소개
│   ├── 의료진 하이라이트
│   └── 오시는 길 미니맵
│
├── /booking (예약 시스템)
│   ├── /booking/symptom (증상 선택)
│   ├── /booking/doctor (의료진 선택)
│   ├── /booking/schedule (시간 선택)
│   └── /booking/confirm (예약 확인)
│
├── /centers (전문 센터)
│   ├── /centers/spine (척추센터)
│   ├── /centers/joint (관절센터)
│   ├── /centers/pain (통증센터)
│   ├── /centers/rehab (재활센터)
│   └── /centers/checkup (검진센터)
│
├── /doctors (의료진 소개)
│   └── /doctors/[id] (의료진 상세)
│
├── /location (오시는 길)
│
├── /certificate (증명서 발급)
│
└── /contact (문의하기)
```

### 4.2 페이지별 우선순위
| 우선순위 | 페이지 | 사유 |
|----------|--------|------|
| P0 | 메인 페이지 | 첫인상 및 전체 네비게이션 허브 |
| P0 | 예약 시스템 | 핵심 전환 기능 |
| P1 | 전문 센터 | 신뢰 구축 및 정보 제공 |
| P1 | 의료진 소개 | 신뢰 구축 |
| P2 | 오시는 길 | 방문 전환 지원 |
| P2 | 증명서 발급 | 기존 환자 서비스 |

---

## 5. 기술 스택

### 5.1 Core Framework
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14.x | React 프레임워크 (App Router) |
| React | 18.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |

### 5.2 Styling
| 기술 | 버전 | 용도 |
|------|------|------|
| Tailwind CSS | 3.x | 유틸리티 기반 스타일링 |
| tailwind-merge | latest | 클래스 병합 유틸리티 |
| clsx | latest | 조건부 클래스 |

### 5.3 UI Components
| 기술 | 용도 |
|------|------|
| Lucide React | 아이콘 시스템 |
| Framer Motion | 애니메이션 및 화면 전환 |
| Radix UI | 접근성 준수 Headless 컴포넌트 |

### 5.4 State Management
| 기술 | 용도 |
|------|------|
| Zustand | 전역 상태 관리 (예약 플로우) |
| React Hook Form | 폼 상태 관리 |
| Zod | 폼 유효성 검사 |

### 5.5 Development Tools
| 기술 | 용도 |
|------|------|
| ESLint | 코드 품질 |
| Prettier | 코드 포맷팅 |
| Husky | Git Hooks |

---

## 6. 디자인 시스템

### 6.1 컬러 시스템

#### Primary Colors
```css
--primary-50: #E8F4FC;
--primary-100: #C5E4F7;
--primary-200: #9ED2F2;
--primary-300: #77BFEC;
--primary-400: #5AB0E8;
--primary-500: #3DA1E3;  /* Main Primary */
--primary-600: #3791D0;
--primary-700: #2F7EB8;
--primary-800: #276BA0;
--primary-900: #1A4B75;
```

#### Semantic Colors
```css
/* Success - 예약 완료, 긍정적 피드백 */
--success-500: #22C55E;

/* Warning - 주의, 대기 상태 */
--warning-500: #F59E0B;

/* Error - 오류, 실패 */
--error-500: #EF4444;

/* Info - 안내, 정보 */
--info-500: #3B82F6;
```

#### Neutral Colors
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### 6.2 Typography

#### Font Family
```css
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### Font Scale (Silver-Friendly)
| Name | Size | Line Height | Weight | 용도 |
|------|------|-------------|--------|------|
| Display | 48px / 3rem | 1.2 | 700 | Hero 타이틀 |
| H1 | 36px / 2.25rem | 1.3 | 700 | 페이지 타이틀 |
| H2 | 28px / 1.75rem | 1.4 | 600 | 섹션 타이틀 |
| H3 | 22px / 1.375rem | 1.4 | 600 | 카드 타이틀 |
| Body Large | 18px / 1.125rem | 1.6 | 400 | 주요 본문 |
| Body | 16px / 1rem | 1.6 | 400 | 기본 본문 |
| Caption | 14px / 0.875rem | 1.5 | 400 | 보조 텍스트 |

### 6.3 Spacing Scale
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### 6.4 Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### 6.5 Component Tokens

#### Buttons
| Variant | Background | Text | Border | Min Height |
|---------|------------|------|--------|------------|
| Primary | primary-500 | white | none | 48px |
| Secondary | white | primary-600 | primary-300 | 48px |
| Ghost | transparent | gray-700 | none | 48px |
| Danger | error-500 | white | none | 48px |

#### Cards
```css
--card-padding: 24px;
--card-radius: 16px;
--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

#### Form Inputs
```css
--input-height: 48px;
--input-padding: 16px;
--input-radius: 8px;
--input-border: 1px solid var(--gray-300);
--input-focus-ring: 2px solid var(--primary-500);
```

---

## 7. Mock Data 구조

### 7.1 의료진 데이터
```typescript
interface Doctor {
  id: string;
  name: string;
  title: string;              // 직책
  specialty: string[];        // 전문 분야
  center: CenterType;         // 소속 센터
  profileImage: string;
  education: string[];        // 학력
  career: string[];           // 경력
  certifications: string[];   // 자격/인증
  availableSlots: TimeSlot[]; // 예약 가능 시간
}
```

### 7.2 예약 데이터
```typescript
interface Booking {
  id: string;
  patientName: string;
  patientPhone: string;
  patientBirthdate: string;
  selectedSymptoms: Symptom[];
  selectedDoctor: Doctor;
  selectedDateTime: Date;
  memo?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
```

### 7.3 센터 데이터
```typescript
interface Center {
  id: string;
  name: string;
  slug: string;
  description: string;
  treatments: Treatment[];
  doctors: Doctor[];
  heroImage: string;
  themeColor: string;
}
```

### 7.4 증상 데이터
```typescript
interface Symptom {
  id: string;
  bodyPart: BodyPart;
  name: string;
  description: string;
  relatedCenters: CenterType[];
  severity?: 'mild' | 'moderate' | 'severe';
}

type BodyPart =
  | 'neck'
  | 'back'
  | 'shoulder'
  | 'knee'
  | 'hand'
  | 'foot'
  | 'hip';
```

---

## 8. 폴더 구조

```
daejeon-woori-spine-renewal/
├── public/
│   ├── images/
│   │   ├── doctors/
│   │   ├── centers/
│   │   ├── icons/
│   │   └── hero/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── booking/
│   │   │   ├── page.tsx
│   │   │   ├── symptom/page.tsx
│   │   │   ├── doctor/page.tsx
│   │   │   ├── schedule/page.tsx
│   │   │   └── confirm/page.tsx
│   │   ├── centers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── doctors/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── location/page.tsx
│   │   ├── certificate/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── StickyActionBar.tsx
│   │   ├── booking/
│   │   │   ├── SymptomSelector.tsx
│   │   │   ├── BodyPartSelector.tsx
│   │   │   ├── DoctorCard.tsx
│   │   │   ├── DoctorList.tsx
│   │   │   ├── TimeSlotPicker.tsx
│   │   │   ├── BookingCalendar.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── BookingSummary.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── QuickBookingCTA.tsx
│   │   │   ├── CenterShowcase.tsx
│   │   │   └── DoctorHighlight.tsx
│   │   ├── centers/
│   │   │   ├── CenterCard.tsx
│   │   │   └── CenterDetail.tsx
│   │   └── common/
│   │       ├── Map.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── hooks/
│   │   ├── useBooking.ts
│   │   ├── useMediaQuery.ts
│   │   └── useScrollLock.ts
│   │
│   ├── stores/
│   │   └── bookingStore.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validation.ts
│   │
│   ├── data/
│   │   ├── doctors.ts
│   │   ├── centers.ts
│   │   ├── symptoms.ts
│   │   └── timeSlots.ts
│   │
│   ├── types/
│   │   ├── doctor.ts
│   │   ├── booking.ts
│   │   ├── center.ts
│   │   └── symptom.ts
│   │
│   └── styles/
│       └── globals.css
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. 구현 우선순위

### Phase 1: Foundation (기반 구축) ✅ 완료
- [x] 프로젝트 초기 설정 (Next.js, Tailwind, TypeScript)
- [x] 디자인 시스템 토큰 정의 (colors, typography, spacing)
- [x] 기본 UI 컴포넌트 구현 (Button, Card, Input, Modal, Badge)
- [x] 레이아웃 컴포넌트 (Header, Footer, StickyActionBar, Navigation)
- [x] Mock Data 구조 정의 및 생성 (doctors, centers, symptoms)

### Phase 2: Core Features (핵심 기능) ✅ 완료
- [x] 메인 페이지 구현 (Hero, QuickBookingCTA, CenterShowcase, DoctorHighlight, LocationPreview)
- [x] 예약 시스템 - 증상 선택 UI (BodyPartSelector, SymptomSelector)
- [x] 예약 시스템 - 의료진 매칭 로직 (DoctorList, DoctorCard)
- [x] 예약 시스템 - 시간 선택 캘린더 (BookingCalendar, TimeSlotPicker)
- [x] 예약 시스템 - 예약 확정 폼 (BookingForm, BookingSummary)
- [x] Zustand 상태 관리 연동 (bookingStore)

### Phase 3: Content Pages (콘텐츠 페이지)
- [ ] 전문 센터 목록 페이지
- [ ] 전문 센터 상세 페이지
- [ ] 의료진 목록 페이지
- [ ] 의료진 상세 페이지

### Phase 4: Support Features (지원 기능)
- [ ] 오시는 길 (지도 연동)
- [ ] 증명서 발급 안내
- [ ] 문의하기 페이지

### Phase 5: Polish (마무리)
- [ ] 애니메이션 및 트랜지션 (Framer Motion)
- [ ] 반응형 최적화 테스트
- [ ] 접근성 검수 (WCAG AA)
- [ ] 성능 최적화

---

## 10. 성공 지표 (KPI)

### 사용성 지표
| 지표 | 목표 |
|------|------|
| 예약 완료율 | 기존 대비 30% 향상 |
| 모바일 이탈률 | 50% 이하 |
| 평균 예약 소요시간 | 3분 이내 |

### 접근성 지표
| 지표 | 목표 |
|------|------|
| WCAG AA 준수 | 100% |
| Lighthouse 접근성 점수 | 90점 이상 |
| 최소 터치 타겟 | 44px 이상 |

### 기술 지표
| 지표 | 목표 |
|------|------|
| Lighthouse 성능 점수 | 90점 이상 |
| First Contentful Paint | 1.5초 이내 |
| Cumulative Layout Shift | 0.1 이하 |

---

## 11. 참고 자료

### 디자인 레퍼런스
- Apple Healthcare 앱 UI/UX
- 삼성서울병원 모바일 웹
- Mayo Clinic 웹사이트

### 기술 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Document Version: 1.1*
*Last Updated: 2025-01-07*
*Progress: Phase 1-2 완료 (핵심 기능 구현 완료)*
