"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// 카카오맵 주소 검색 결과
interface KakaoAddress {
  x: string;
  y: string;
  [key: string]: string;
}

interface KakaoMapProps {
  address: string;
}

// 최소 타입 정의
declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (
          container: HTMLElement,
          options: { center: KakaoLatLng; level: number }
        ) => KakaoMapInstance;
        Marker: new (options: {
          map: KakaoMapInstance;
          position: KakaoLatLng;
        }) => KakaoMarkerInstance;
        services: {
          Geocoder: new () => {
            addressSearch: (
              addr: string,
              callback: (result: KakaoAddress[], status: string) => void
            ) => void;
          };
          Status: { OK: string };
        };
      };
    };
  }
}

// 구체적 타입 정의
interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMapInstance {
  setCenter(latlng: KakaoLatLng): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface KakaoMarkerInstance {}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallbackMap, setShowFallbackMap] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // 주소를 좌표로 변환하는 함수 (간단한 매핑)
  const getCoordinatesFromAddress = (addr: string) => {
    // 주요 지역별 대략적인 좌표 매핑
    const locationMap: { [key: string]: { lat: number; lng: number } } = {
      성북구: { lat: 37.5894, lng: 127.0167 },
      종로구: { lat: 37.5735, lng: 126.9788 },
      마포구: { lat: 37.5663, lng: 126.9019 },
      강남구: { lat: 37.5172, lng: 127.0473 },
      서초구: { lat: 37.4837, lng: 127.0324 },
      송파구: { lat: 37.5145, lng: 127.1058 },
      강동구: { lat: 37.5301, lng: 127.1238 },
      영등포구: { lat: 37.5264, lng: 126.8962 },
      동작구: { lat: 37.5124, lng: 126.9395 },
      관악구: { lat: 37.4747, lng: 126.951 },
      서대문구: { lat: 37.5791, lng: 126.9368 },
      은평구: { lat: 37.6028, lng: 126.9292 },
      노원구: { lat: 37.6542, lng: 127.0568 },
      도봉구: { lat: 37.6688, lng: 127.0472 },
      중랑구: { lat: 37.6064, lng: 127.0926 },
      성동구: { lat: 37.5633, lng: 127.0366 },
      광진구: { lat: 37.5385, lng: 127.0823 },
      중구: { lat: 37.5636, lng: 126.997 },
      용산구: { lat: 37.5384, lng: 126.9654 },
      강서구: { lat: 37.5509, lng: 126.8495 },
      양천구: { lat: 37.517, lng: 126.8665 },
      구로구: { lat: 37.4954, lng: 126.8874 },
      금천구: { lat: 37.4563, lng: 126.8953 },
      강북구: { lat: 37.6396, lng: 127.0257 },
    };

    // 주소에서 구 이름 추출
    for (const [district, coords] of Object.entries(locationMap)) {
      if (addr.includes(district)) {
        return coords;
      }
    }

    // 기본값 (서울시청)
    return { lat: 37.5665, lng: 126.978 };
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // 카카오맵 API 키가 있는지 확인
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_KEY;
    if (!apiKey || apiKey === "YOUR_KAKAO_API_KEY" || apiKey === "YOUR_ACTUAL_KAKAO_API_KEY_HERE") {
      // API 키가 없으면 대체 지도 표시
      const coords = getCoordinatesFromAddress(address);
      setCoordinates(coords);
      setShowFallbackMap(true);
      setIsLoading(false);
      return;
    }

    // 카카오맵 스크립트 로드 확인
    const checkKakaoLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        setTimeout(checkKakaoLoaded, 100);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.kakao) return;

      const { kakao } = window;

      try {
        kakao.maps.load(() => {
          const map = new kakao.maps.Map(mapRef.current!, {
            center: new kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
          });

          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: KakaoAddress[], status: string) => {
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
              const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

              new kakao.maps.Marker({
                map,
                position: coords,
              });

              map.setCenter(coords);
              setIsLoading(false);
            } else {
              setMapError("주소를 찾을 수 없습니다.");
              setIsLoading(false);
            }
          });
        });
      } catch (error) {
        setMapError("지도를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
        console.error("KakaoMap error:", error);
      }
    };

    // 스크립트 로드 후 지도 초기화
    checkKakaoLoaded();
  }, [address]);

  return (
    <>
      {/* 카카오맵 SDK 로드 */}
      {process.env.NEXT_PUBLIC_KAKAO_KEY &&
        process.env.NEXT_PUBLIC_KAKAO_KEY !== "YOUR_KAKAO_API_KEY" && (
          <Script
            strategy="afterInteractive"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`}
          />
        )}
      <div ref={mapRef} className="h-[300px] w-full rounded-[10px]">
        {isLoading && !mapError && !showFallbackMap && (
          <div className="flex h-full items-center justify-center rounded-[10px] bg-gray-50 text-center">
            <div className="text-gray-600">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
              <p className="text-sm">지도를 불러오는 중...</p>
            </div>
          </div>
        )}

        {showFallbackMap && coordinates && (
          <div className="relative h-full w-full overflow-hidden rounded-[10px]">
            {/* OpenStreetMap 대체 지도 */}
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01}%2C${coordinates.lat - 0.01}%2C${coordinates.lng + 0.01}%2C${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              className="rounded-[10px]"
            />
            <div className="absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-xs text-gray-600 shadow-sm">
              OpenStreetMap
            </div>
            <div className="absolute top-2 left-2 max-w-[200px] rounded bg-white px-2 py-1 text-xs text-gray-600 shadow-sm">
              📍 {address}
            </div>
            <div className="absolute top-2 right-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
              >
                Google Maps에서 보기
              </a>
            </div>
          </div>
        )}

        {mapError && !showFallbackMap && (
          <div className="flex h-full items-center justify-center rounded-[10px] bg-gray-100 text-center">
            <div className="text-gray-600">
              <p className="mb-2 font-medium">{mapError}</p>
              <p className="text-sm">
                카카오맵 API 키가 필요합니다.
                <br />
                .env.local 파일에 NEXT_PUBLIC_KAKAO_KEY를 설정해주세요.
              </p>
              <div className="mt-4">
                <a
                  href="https://developers.kakao.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  카카오 개발자 콘솔에서 API 키 발급받기
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
