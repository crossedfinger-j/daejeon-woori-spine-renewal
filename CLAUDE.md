# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

대전우리병원 웹사이트 리뉴얼 프로젝트 - Silver-Friendly (30~70대 접근성) 고효율 전환 웹사이트 프론트엔드 프로토타입.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, tailwind-merge, clsx
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
2. Doctor matching (auto-recommend based on symptoms)
3. Schedule selection (calendar + time slots)
4. Confirmation (patient info form)

**Design System**: Tailwind config extends with custom tokens for Silver-Friendly design:
- Min font size: 16px, touch targets: 44px minimum
- Primary color scale: #3DA1E3 (blue medical theme)
- WCAG AA contrast compliance

**Component Composition**: UI components use `cn()` utility (clsx + tailwind-merge) for class merging.

## Design Constraints

- **Accessibility**: Min 48px button height, 44px touch targets, high contrast colors
- **Responsive**: Mobile-first, breakpoints at 640/768/1024/1280px
- **Sticky Action Bar**: Always visible bottom bar with KakaoTalk, Phone, Booking CTAs
