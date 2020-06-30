import React, { useState, useEffect } from 'react';
import { maps } from '@app/vendor/settings';
import GoogleMapReact from 'google-map-react';

import { settingsDB } from '@app/store/idb';
import { getIPLatLng } from '@app/vendor/api/spg';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { actions } from '@app/store';

import Marker from './Marker';

import './Map.css';

const Map = ({ className = '' }: { className?: string }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(null);
  const [defaultZoom, setDefaultZoom] = useState<number>(null);
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
    settingsDB
      .get('zoom')
      .then(defaultZoom => setDefaultZoom(Number(defaultZoom) || 9));
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

  if (!center || !defaultZoom) {
    return <div />;
  }

  return (
    <div className={`${className} map`}>
      <div className="map__loader" aria-hidden={!mapParksLoading} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: maps.key }}
        defaultCenter={center}
        defaultZoom={defaultZoom}
        options={{
          disableDefaultUI: true,
          styles: maps.styles,
        }}
        onChange={v => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
          setZoom(v.zoom);
        }}
        onDragEnd={() => loadParks()}
        onZoomAnimationEnd={() => loadParks()}
        onGoogleApiLoaded={maps => setMap(maps.map)}
      >
        {Object.values(mapParks).map(marker => (
          <Marker
            name={marker.title}
            lat={marker.map.lat}
            lng={marker.map.lng}
            small={zoom <= 9}
            slug={marker.slug}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
