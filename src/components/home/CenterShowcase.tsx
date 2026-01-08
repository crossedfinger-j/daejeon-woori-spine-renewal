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
    <section className="section-container" style={{ backgroundColor: 'var(--slate-50)' }}>
      <div className="content-container">
        {/* 헤더 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
            전문 센터 안내
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--gray-600)', maxWidth: '500px', margin: '0 auto' }}>
            각 분야 최고의 전문의가 환자분께 최적의 치료를 제공합니다
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="card-grid-3">
          {centers.map((center) => {
            const colors = colorMap[center.slug] || colorMap.spine;
            return (
              <Link key={center.id} href={`/centers/${center.slug}`}>
                <div className="group h-full bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:border-[var(--slate-200)] transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  {/* Header - 컴팩트하게 */}
                  <div className={`${colors.bg} text-white`} style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div className={`${colors.icon} rounded-xl flex items-center justify-center`} style={{ width: '44px', height: '44px' }}>
                        {iconMap[center.icon]}
                      </div>
                      <ArrowRight style={{ width: '20px', height: '20px', opacity: 0.6 }} className="group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{center.name}</h3>
                    <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{center.description}</p>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px 20px 20px 20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>주요 치료</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {center.treatments.slice(0, 3).map((treatment) => (
                        <Badge key={treatment.id} variant="outline" size="sm">
                          {treatment.name}
                        </Badge>
                      ))}
                      {center.treatments.length > 3 && (
                        <Badge variant="default" size="sm">
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

        {/* 하단 버튼 */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link
            href="/centers"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--primary-500)', transition: 'color 0.2s' }}
            className="hover:text-[var(--primary-600)] group"
          >
            <span>모든 센터 보기</span>
            <ArrowRight style={{ width: '16px', height: '16px' }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
