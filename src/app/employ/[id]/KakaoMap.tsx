"use client";

import { useEffect, useRef, useState } from "react";

type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

type KakaoMapInstance = {
  setCenter: (latlng: KakaoLatLng) => void;
};

type KakaoMapOptions = {
  center: KakaoLatLng;
  level?: number;
  [key: string]: unknown;
};

type KakaoStatic = {
  maps: {
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMapInstance;
    load: (cb: () => void) => void;
    Marker: new (opts: { position: KakaoLatLng; map?: KakaoMapInstance }) => unknown;
    services: {
      Geocoder: new () => {
        addressSearch: (
          query: string,
          callback: (result: { x: string; y: string }[], status: string) => void
        ) => void;
      };
      Status: {
        OK: string;
      };
    };
  };
};

declare global {
  interface Window {
    kakao?: KakaoStatic;
  }
}

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const existing = document.querySelector(`script[data-kakao="true"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-kakao", "true");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`;

    const onLoad = () => {
      const kakao = window.kakao;
      if (!kakao) {
        setErrorMessage("Kakao SDK 로드 실패");
        return;
      }

      kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) {
          setErrorMessage("지도 컨테이너를 찾을 수 없습니다.");
          return;
        }
        const center = new kakao.maps.LatLng(37.5665, 126.978);
        const options: KakaoMapOptions = { center, level: 3 };
        const mapInstance = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const { x, y } = result[0];
            const coords = new kakao.maps.LatLng(parseFloat(y), parseFloat(x));

            new kakao.maps.Marker({
              map: mapInstance,
              position: coords,
            });

            mapInstance.setCenter(coords);
          } else {
          }
        });
      });
    };

    script.addEventListener("load", onLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [address]);

  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          maxWidth: 900,
          height: 400,
          minHeight: 300,
        }}
      />
    </>
  );
}
