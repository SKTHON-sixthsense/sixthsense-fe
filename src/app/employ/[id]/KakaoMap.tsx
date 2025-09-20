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

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) {
      setMapError("카카오맵 API가 로드되지 않았습니다. API 키를 확인해주세요.");
      return;
    }

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
          } else {
            setMapError("주소를 찾을 수 없습니다.");
          }
        });
      });
    } catch (error) {
      setMapError("지도를 불러오는 중 오류가 발생했습니다.");
      console.error("KakaoMap error:", error);
    }
  }, [address]);

  return (
    <>
      {/* 카카오맵 SDK 로드 */}
      <Script
        strategy="afterInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY || "YOUR_KAKAO_API_KEY"}&libraries=services`}
      />
      <div ref={mapRef} className="h-[300px] w-full rounded-[10px]">
        {mapError && (
          <div className="flex h-full items-center justify-center rounded-[10px] bg-gray-100 text-center">
            <div className="text-gray-600">
              <p className="mb-2 font-medium">{mapError}</p>
              <p className="text-sm">
                카카오맵 API 키가 필요합니다.
                <br />
                .env.local 파일에 NEXT_PUBLIC_KAKAO_KEY를 설정해주세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
