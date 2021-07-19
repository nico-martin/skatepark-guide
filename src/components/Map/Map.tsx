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
import cn from '@common/utils/classnames';
import { gmapsKey, styles as mapStyles } from '@common/utils/maps';
import styles from './Map.css';
import Marker from './Marker';

const Map = ({ className = '' }: { className?: string }) => {
  const [center, setCenter] =
    React.useState<{ lat: number; lng: number }>(null);
  const [defaultZoom, setDefaultZoom] = React.useState<number>(null);
  const [zoom, setZoom] = React.useState<number>(null);
  const [map, setMap] = React.useState(null);

  const { showLoader, parks } = useMapParks();
  const { updateMapBounds } = useMapBounds();
  const { userPosition } = useUserPosition();
  const prevUserPosition = React.useRef();

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
    settingsDB
      .get('zoom')
      .then((defaultZoom) => setDefaultZoom(Number(defaultZoom) || 9));
    settingsDB.get('center').then((center) => {
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

  React.useEffect(() => {
    if (!Boolean(prevUserPosition?.current) && userPosition) {
      setCenter({ lat: userPosition.lat, lng: userPosition.lng });
      setZoom(14);
    }
    prevUserPosition.current = userPosition;
  }, [userPosition]);

  React.useEffect(() => loadParks(), [map]);

  if (!center || !defaultZoom) {
    return <div />;
  }

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.loaderContainer} aria-hidden={!showLoader}>
        <Loader className={styles.loader} />
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: gmapsKey }}
        defaultCenter={center}
        center={center}
        defaultZoom={defaultZoom}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
        }}
        onChange={(v) => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
          setZoom(v.zoom);
          setCenter(v.center);
        }}
        onDragEnd={() => loadParks()}
        onZoomAnimationEnd={() => loadParks()}
        onGoogleApiLoaded={(maps) => setMap(maps.map)}
      >
        {Object.values(parks).map((marker) => (
          <Marker
            name={marker.title}
            lat={marker.map.lat}
            lng={marker.map.lng}
            small={zoom <= 9}
            slug={marker.slug}
          />
        ))}
        {userPosition && (
          <Marker
            name="User"
            lat={userPosition.lat}
            lng={userPosition.lng}
            small={zoom <= 9}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
