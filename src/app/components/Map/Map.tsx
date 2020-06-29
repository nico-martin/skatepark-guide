import React, { useState, useEffect } from 'react';
import { maps } from '@app/vendor/settings';
import GoogleMapReact from 'google-map-react';

import { settingsDB } from '@app/store/idb';
import { getIPLatLng } from '@app/vendor/api/spg';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@app/store';

import './Map.css';

const Map = ({ className = '' }: { className?: string }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(null);
  const [zoom, setZoom] = useState<number>(null);
  const [map, setMap] = useState(null);
  const { mapParks, mapParksLoading }: State = useStoreState([
    'mapParks',
    'mapParksLoading',
  ]);
  const { loadMapParks } = useActions(actions);

  const loadParks = () => {
    if (map) {
      const bounds = map.getBounds();
      loadMapParks([
        bounds.getSouthWest().lat(),
        bounds.getNorthEast().lat(),
        bounds.getSouthWest().lng(),
        bounds.getNorthEast().lng(),
      ]);
    }
  };

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

  useEffect(() => loadParks(), [map]);

  if (!center || !zoom) {
    return <div />;
  }

  console.log('loading', mapParksLoading);
  console.log('markers', Object.keys(mapParks).length, mapParks);

  return (
    <div className={`${className} map`}>
      <div className="map__loader" aria-hidden={!mapParksLoading} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: maps.key }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          disableDefaultUI: true,
          styles: maps.styles,
        }}
        onChange={v => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
        }}
        onDragEnd={() => loadParks()}
        onZoomAnimationEnd={() => loadParks()}
        onGoogleApiLoaded={maps => setMap(maps.map)}
      />
    </div>
  );
};

export default Map;
