import { Map as KMap, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

const ReserveMap = ({ lat, lng }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      setReady(true);
    });
  }, []);

  if (!ready || !lat || !lng) return null;

  return (
    <KMap
      center={{ lat, lng }}
      level={4}
      style={{ width: "100%", height: "100%" }}
    >
      <MapMarker position={{ lat, lng }} />
    </KMap>
  );
};

export default ReserveMap;
