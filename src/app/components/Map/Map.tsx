import React, { useState, useEffect } from 'react';
import { maps } from '@app/vendor/settings';
import GoogleMapReact from 'google-map-react';

import { settingsDB } from '@app/store/idb';
import { getIPLatLng } from '@app/vendor/api/spg';

const Map = ({ className = '' }: { className?: string }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(null);
  const [zoom, setZoom] = useState<number>(null);

  useEffect(() => {
    settingsDB.get('zoom').then(zoom => setZoom(Number(zoom) || 9));
    settingsDB.get('center').then(center => {
      if (center) {
        setCenter(center);
      } else {
        getIPLatLng().then(({ data }) =>
          setCenter({
            lat: data.lat,
            lng: data.lon,
          })
        );
      }
    });
  }, []);

  if (!center || !zoom) {
    return <div />;
  }

  return (
    <div className={className} style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: maps.key }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{ disableDefaultUI: true, styles: maps.styles }}
        onChange={v => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
        }}
      />
    </div>
  );
};

export default Map;
