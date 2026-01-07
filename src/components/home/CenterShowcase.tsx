"use client";

import Link from "next/link";
import { ArrowRight, Activity, Bone, Dumbbell, Stethoscope, Heart } from "lucide-react";
import { centers } from "@/data";
import { Badge } from "@/components/ui";

const iconMap: Record<string, React.ReactNode> = {
  Spine: <Bone className="w-6 h-6" />,
  Bone: <Bone className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Dumbbell: <Dumbbell className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
};

// 차분한 딥톤 컬러
const colorMap: Record<string, { bg: string; icon: string }> = {
  spine: { bg: "bg-[var(--center-spine)]", icon: "bg-white/20" },
  joint: { bg: "bg-[var(--center-joint)]", icon: "bg-white/20" },
  pain: { bg: "bg-[var(--center-pain)]", icon: "bg-white/20" },
  rehab: { bg: "bg-[var(--center-rehab)]", icon: "bg-white/20" },
  checkup: { bg: "bg-[var(--center-checkup)]", icon: "bg-white/20" },
};

export function CenterShowcase() {
  return (
    // 섹션 간격 py-32 (128px) 적용
    <section className="py-28 lg:py-36 bg-[var(--slate-50)]">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="px-8 lg:px-12">
        {/* 헤더 영역 간격 - mb-16 (64px) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-6">
            전문 센터 안내
          </h2>
          <p className="text-xl text-[var(--gray-600)] max-w-2xl mx-auto leading-relaxed">
            각 분야 최고의 전문의가 환자분께 최적의 치료를 제공합니다
          </p>
        </div>

        {/* 카드 그리드 - gap-8 (32px) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {centers.map((center) => {
            const colors = colorMap[center.slug] || colorMap.spine;
            return (
              <Link key={center.id} href={`/centers/${center.slug}`}>
                {/* 흰색 배경 + border-slate-100 + shadow-lg */}
                <div className="group h-full bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:border-[var(--slate-200)] transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  {/* Header - p-8 최소 패딩 */}
                  <div className={`${colors.bg} p-7 lg:p-8 text-white`}>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center`}>
                        {iconMap[center.icon]}
                      </div>
                      <ArrowRight className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{center.name}</h3>
                    <p className="text-white/80 text-lg leading-relaxed line-clamp-2">{center.description}</p>
                  </div>

                  {/* Content - p-8 최소 패딩 */}
                  <div className="p-7 lg:p-8">
                    <p className="text-sm font-semibold text-[var(--gray-500)] uppercase tracking-wider mb-5">주요 치료</p>
                    <div className="flex flex-wrap gap-2.5">
                      {center.treatments.slice(0, 3).map((treatment) => (
                        <Badge key={treatment.id} variant="outline" size="md">
                          {treatment.name}
                        </Badge>
                      ))}
                      {center.treatments.length > 3 && (
                        <Badge variant="default" size="md">
                          +{center.treatments.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 하단 링크 - mt-16 (64px) */}
        <div className="mt-16 lg:mt-20 text-center">
          <Link
            href="/centers"
            className="inline-flex items-center gap-3 text-[var(--primary-500)] font-semibold text-xl hover:text-[var(--primary-600)] transition-colors group"
          >
            <span>모든 센터 보기</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
