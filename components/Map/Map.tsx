import GoogleMapReact from 'google-map-react';
import React from 'react';
import { Loader } from '@theme';
import { getIPLatLng } from '@common/api/park';
import {
  useMapParks,
  useMapBounds,
  useUserPosition,
} from '@common/hooks/mapParksContext';
import { settingsDB } from '@common/idb';
import { GeoDataI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import { gmapsKey, styles as mapStyles } from '@common/utils/maps';
import styles from './Map.module.css';
import Marker from './Marker';

const Map = ({
  className = '',
  mapZoom,
  setMapZoom,
}: {
  className?: string;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
}) => {
  const [center, setCenter] =
    React.useState<{ lat: number; lng: number }>(null);
  const [defaultCenter, setDefaultCenter] =
    React.useState<{ lat: number; lng: number }>(null);
  const [defaultZoom, setDefaultZoom] = React.useState<number>(null);
  const [map, setMap] = React.useState(null);

  const { showLoader, parks } = useMapParks();
  const { updateMapBounds } = useMapBounds();
  const { userPosition } = useUserPosition();
  const prevUserPosition = React.useRef<GeoDataI>();

  const loadParks = () => {
    if (map) {
      const bounds = map.getBounds();
      updateMapBounds([
        bounds.getSouthWest().lat(),
        bounds.getNorthEast().lat(),
        bounds.getSouthWest().lng(),
        bounds.getNorthEast().lng(),
      ]);
    }
  };

  React.useEffect(() => {
    center && !defaultCenter && setDefaultCenter(center);
  }, [center, defaultCenter]);

  React.useEffect(() => {
    settingsDB
      .get('zoom')
      .then((defaultZoom) => setDefaultZoom(Number(defaultZoom) || 9));
    settingsDB.get('center').then((center) => {
      if (center) {
        setCenter(center);
      } else {
        getIPLatLng().then((data) =>
          setCenter({
            lat: data.lat,
            lng: data.lon,
          })
        );
      }
    });
  }, []);

  React.useEffect(() => {
    if (!Boolean(prevUserPosition?.current) && userPosition) {
      setCenter({ lat: userPosition.lat, lng: userPosition.lng });
      setMapZoom(14);
    }
    prevUserPosition.current = userPosition;
  }, [userPosition]);

  React.useEffect(() => loadParks(), [map]);

  if (!defaultCenter || !defaultZoom) {
    return <div />;
  }

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.loaderContainer} aria-hidden={!showLoader}>
        <Loader className={styles.loader} />
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: gmapsKey }}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={defaultZoom}
        zoom={mapZoom}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
        }}
        onChange={(v) => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
          setMapZoom(v.zoom);
          setCenter(v.center);
        }}
        onDragEnd={() => loadParks()}
        onZoomAnimationEnd={() => loadParks()}
        onGoogleApiLoaded={(maps) => setMap(maps.map)}
        yesIWantToUseGoogleMapApiInternals
      >
        {Object.values(parks).map((marker) => (
          <Marker
            key={marker.slug}
            name={marker.title}
            lat={marker.map.lat}
            lng={marker.map.lng}
            small={mapZoom <= 9}
            slug={marker.slug}
          />
        ))}
        {userPosition && (
          <Marker
            name="User"
            lat={userPosition.lat}
            lng={userPosition.lng}
            small={mapZoom <= 9}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
