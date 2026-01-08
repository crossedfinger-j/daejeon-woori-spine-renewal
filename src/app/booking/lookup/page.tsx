"use client";

import { useState } from "react";
import { Search, Phone, Hash, Calendar, Clock, User, AlertCircle, Info, PhoneCall, X, CheckCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { PageHeader } from "@/components/common";

// 랜덤 예약 데이터 생성
const generateRandomBooking = (bookingNumber: string, phone: string) => {
  const doctors = ["박철우", "김민수", "이정희", "최영진", "한상훈"];
  const symptoms = ["허리 통증", "목 통증", "어깨 통증", "무릎 통증", "손목 통증"];
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];

  // 오늘 날짜 기준 1~14일 후 랜덤
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1);

  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[futureDate.getDay()];

  return {
    bookingNumber,
    phone,
    doctor: doctors[Math.floor(Math.random() * doctors.length)],
    symptom: symptoms[Math.floor(Math.random() * symptoms.length)],
    date: `${year}년 ${month}월 ${day}일 (${weekday})`,
    time: times[Math.floor(Math.random() * times.length)],
    patientName: "홍*동"
  };
};

interface BookingResult {
  bookingNumber: string;
  phone: string;
  doctor: string;
  symptom: string;
  date: string;
  time: string;
  patientName: string;
}

export default function BookingLookupPage() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | BookingResult>(null);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 전화번호 포맷팅 (하이픈 자동 추가)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  // 예약번호 형식 검증 (WS + 숫자)
  const isValidBookingNumber = (num: string) => {
    return /^WS\d{6,10}$/i.test(num);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setSearchResult(null);

    // 데모용 - 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 형식이 맞으면 랜덤 예약 데이터 생성
    if (isValidBookingNumber(bookingNumber)) {
      setSearchResult(generateRandomBooking(bookingNumber.toUpperCase(), phoneNumber));
      setShowModal(true);
    } else {
      setNotFound(true);
      setShowModal(true);
    }
    setIsSearching(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchResult(null);
    setNotFound(false);
  };

  const isFormValid = bookingNumber.length >= 8 && phoneNumber.replace(/-/g, "").length >= 10;

  // 공통 카드 스타일
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid var(--gray-200)',
    padding: '28px'
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
      <PageHeader
        title="예약 조회"
        description="예약번호와 휴대폰 번호로 예약 내역을 확인하세요"
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* 2열 그리드 레이아웃 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }} className="lookup-grid">
          {/* 왼쪽: 조회 폼 */}
          <div style={cardStyle}>
            <form onSubmit={handleSearch}>
              {/* 예약번호 입력 */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--gray-700)',
                  marginBottom: '10px'
                }}>
                  <Hash style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                  예약번호
                </label>
                <Input
                  type="text"
                  placeholder="예: WS55317840"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
                  maxLength={12}
                  style={{
                    fontSize: '18px',
                    padding: '16px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}
                />
                <p style={{
                  fontSize: '13px',
                  color: 'var(--gray-500)',
                  marginTop: '8px'
                }}>
                  WS + 숫자 조합 (예: WS55317840)
                </p>
              </div>

              {/* 휴대폰 번호 입력 */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--gray-700)',
                  marginBottom: '10px'
                }}>
                  <Phone style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                  휴대폰 번호
                </label>
                <Input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  style={{
                    fontSize: '18px',
                    padding: '16px',
                    letterSpacing: '1px'
                  }}
                />
                <p style={{
                  fontSize: '13px',
                  color: 'var(--gray-500)',
                  marginTop: '8px'
                }}>
                  예약 시 등록한 휴대폰 번호를 입력하세요
                </p>
              </div>

              {/* 조회 버튼 */}
              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={!isFormValid || isSearching}
                style={{ width: '100%', height: '56px', fontSize: '17px' }}
              >
                {isSearching ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="animate-spin" style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%'
                    }} />
                    조회 중...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search style={{ width: '20px', height: '20px' }} />
                    예약 조회하기
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* 오른쪽: 안내사항 */}
          <div style={cardStyle}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--primary-50)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Info style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
              </div>
              <h4 style={{
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--gray-900)'
              }}>
                안내사항
              </h4>
            </div>

            <ul style={{
              fontSize: '15px',
              color: 'var(--gray-600)',
              lineHeight: 2,
              paddingLeft: '20px',
              margin: 0,
              marginBottom: '20px'
            }}>
              <li>예약번호는 예약 완료 시 문자로 발송됩니다.</li>
              <li>예약번호 형식: <strong style={{ color: 'var(--primary-600)' }}>WS + 숫자 8자리</strong></li>
              <li>예약번호를 분실하셨다면 <strong style={{ color: 'var(--primary-600)' }}>전화로 문의</strong>해 주세요.</li>
            </ul>

            {/* 예약 변경/취소 안내 */}
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '14px',
              border: '1px solid var(--primary-100)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <PhoneCall style={{ width: '20px', height: '20px', color: 'var(--primary-600)' }} />
                <h5 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--primary-700)'
                }}>
                  예약 변경/취소 안내
                </h5>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--gray-600)',
                lineHeight: 1.7,
                marginBottom: '16px'
              }}>
                예약 변경 및 취소는 <strong style={{ color: 'var(--primary-600)' }}>전화로만</strong> 가능합니다.<br />
                예약일 <strong style={{ color: 'var(--primary-600)' }}>1일 전</strong>까지 연락해 주세요.
              </p>
              <a
                href="tel:1577-0052"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px 20px',
                  backgroundColor: 'var(--primary-500)',
                  color: 'white',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '17px',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                <Phone style={{ width: '22px', height: '22px' }} />
                1577-0052 전화하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              <X style={{ width: '24px', height: '24px', color: 'var(--gray-500)' }} />
            </button>

            {/* 찾을 수 없음 */}
            {notFound && (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <AlertCircle style={{ width: '36px', height: '36px', color: 'var(--gray-400)' }} />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--gray-900)',
                  marginBottom: '12px'
                }}>
                  예약 내역을 찾을 수 없습니다
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--gray-500)',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  입력하신 정보와 일치하는 예약이 없습니다.<br />
                  예약번호와 휴대폰 번호를 다시 확인해주세요.
                </p>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--gray-50)',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                    예약 관련 문의는 전화로 연락해 주세요
                  </p>
                  <a href="tel:1577-0052" style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--primary-600)',
                    textDecoration: 'none'
                  }}>
                    1577-0052
                  </a>
                </div>
                <Button
                  onClick={closeModal}
                  variant="secondary"
                  style={{ width: '100%' }}
                >
                  닫기
                </Button>
              </div>
            )}

            {/* 예약 정보 */}
            {searchResult && (
              <>
                {/* 헤더 */}
                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
                  color: 'white',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckCircle style={{ width: '26px', height: '26px' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>
                      예약 확인 완료
                    </h3>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.95)' }}>
                      {searchResult.bookingNumber}
                    </p>
                  </div>
                </div>

                {/* 예약 정보 */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* 환자명 & 담당의 - 2열 그리드 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{
                        padding: '14px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '12px'
                      }}>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>환자명</p>
                        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)' }}>{searchResult.patientName}</p>
                      </div>
                      <div style={{
                        padding: '14px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '12px'
                      }}>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>담당의</p>
                        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)' }}>{searchResult.doctor} 원장</p>
                      </div>
                    </div>

                    {/* 예약일시 */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '12px'
                      }}>
                        <Calendar style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
                        <div>
                          <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '2px' }}>예약일</p>
                          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)' }}>{searchResult.date}</p>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '12px',
                        minWidth: '120px'
                      }}>
                        <Clock style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
                        <div>
                          <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '2px' }}>시간</p>
                          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)' }}>{searchResult.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* 증상 */}
                    <div style={{
                      padding: '14px 16px',
                      backgroundColor: 'var(--primary-50)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{
                        padding: '4px 10px',
                        backgroundColor: 'var(--primary-500)',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        진료 증상
                      </span>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--primary-700)'
                      }}>
                        {searchResult.symptom}
                      </span>
                    </div>
                  </div>

                  {/* 변경/취소 안내 */}
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: 'var(--gray-50)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--gray-600)',
                      marginBottom: '12px'
                    }}>
                      예약 변경/취소는 <strong style={{ color: 'var(--primary-600)' }}>전화로만</strong> 가능합니다
                    </p>
                    <a
                      href="tel:1577-0052"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        backgroundColor: 'var(--primary-500)',
                        color: 'white',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 600
                      }}
                    >
                      <Phone style={{ width: '20px', height: '20px' }} />
                      1577-0052 전화하기
                    </a>
                  </div>

                  {/* 닫기 버튼 */}
                  <Button
                    onClick={closeModal}
                    variant="secondary"
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    닫기
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 반응형 스타일 */}
      <style jsx>{`
        @media (max-width: 768px) {
          .lookup-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
