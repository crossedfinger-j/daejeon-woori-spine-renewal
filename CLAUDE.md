# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

대전우리병원 웹사이트 리뉴얼 프로젝트 - Silver-Friendly (30~70대 접근성) 고효율 전환 웹사이트 프론트엔드 프로토타입.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based config in globals.css), tailwind-merge, clsx
- **UI**: Lucide React (icons), Framer Motion (animations), Radix UI (headless components)
- **State**: Zustand (global state), React Hook Form + Zod (forms)

## Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Build & Production
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Folder Structure (src/)
```
app/                 # Next.js App Router pages
├── booking/         # 4-step booking flow (symptom → doctor → schedule → confirm)
├── centers/[slug]/  # 5 specialty centers (spine, joint, pain, rehab, checkup)
├── doctors/[id]/    # Doctor profiles
├── location/        # Hospital location & directions
├── certificate/     # Document issuance guide
└── contact/         # Contact page

components/
├── ui/              # Base components (Button, Card, Input, Modal, etc.)
├── layout/          # Header, Footer, Navigation, StickyActionBar
├── booking/         # Booking flow components
├── home/            # Main page sections
├── centers/         # Center-related components
└── common/          # Shared components (Map, LoadingSpinner)

stores/              # Zustand stores (bookingStore.ts)
data/                # Mock data (doctors, centers, symptoms, timeSlots)
types/               # TypeScript interfaces
hooks/               # Custom React hooks
lib/                 # Utilities (cn function, validation)
```

### Key Patterns

**Booking Flow State**: Uses Zustand store (`bookingStore.ts`) to persist user selections across 4 booking steps:
1. Symptom selection (body part → symptoms)
2. Doctor matching (auto-recommend based on symptoms via `getDoctorsBySymptoms()`)
3. Schedule selection (calendar + time slots generated deterministically to avoid SSR hydration issues)
4. Confirmation (patient info form with Zod validation)

**Design System**: Defined in `globals.css` using CSS custom properties and Tailwind v4's `@theme inline` directive:
- Primary colors: Deep Navy palette (#1E3A5F base)
- Center-specific theme colors for 5 specialty centers
- Generous spacing system (section padding 8-10rem, card padding 2rem+)
- Typography: Pretendard font, min 16px base, text-lg default for body

**Component Composition**: UI components use `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge) for class merging.

**Data Layer**: Mock data in `src/data/` with helper functions (e.g., `getDoctorById`, `getDoctorsByCenter`, `getDoctorsBySymptoms`).

**SSR Hydration**: Time slots use deterministic hash-based availability patterns instead of `Math.random()` to prevent server/client mismatch. See `generateTimeSlots()` in [doctors.ts](src/data/doctors.ts).

**Form Validation**: Uses Zod schemas in `lib/validation.ts` with React Hook Form for patient info forms.

**Imports**: Types are re-exported from `@/types` index barrel. Components use barrel exports from their respective index files.

## Design Constraints

- **Accessibility**: Min 48px button height, 56px touch targets (`.touch-target` class), high contrast colors, 3px focus outlines
- **Responsive**: Mobile-first, breakpoints at 640/768/1024/1280px
- **Sticky Action Bar**: Always visible bottom bar with KakaoTalk, Phone, Booking CTAs
- **Safe Area**: Bottom padding for iOS notch (`env(safe-area-inset-bottom)`)

## Center Slugs

The 5 specialty centers use these slugs for routing (`/centers/[slug]`):
- `spine` - 척추센터
- `joint` - 관절센터
- `pain` - 통증센터
- `rehab` - 재활센터
- `checkup` - 건강검진센터
