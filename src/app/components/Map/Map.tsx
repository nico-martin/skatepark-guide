import React, { useState, useEffect } from 'react';
import { maps } from '@app/vendor/settings';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { settingsDB } from '@app/store/idb';
import { getIPLatLng } from '@app/vendor/api/spg';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028,
};

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
    return <p>loading..</p>;
  }

  return (
    <Gmaps
      params={{ v: '3.exp', key: maps.key }}
      lat={center.lat}
      lng={center.lng}
      zoom={zoom}
      loadingMessage={'Be happy'}
      className={className}
      styles={maps.styles}
      onMapCreated={map => {
        map.addListener('center_changed', () => {
          settingsDB.set('center', {
            lat: map.getCenter().lat(),
            lng: map.getCenter().lng(),
          });
        });
        map.addListener('zoom_changed', () => {
          settingsDB.set('zoom', map.getZoom());
        });
      }}
    />
  );
};

export default Map;
