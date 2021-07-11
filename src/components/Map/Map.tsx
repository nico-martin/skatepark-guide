import GoogleMapReact from 'google-map-react';
import React from 'react';
import { Loader } from '@theme';
import { getIPLatLng } from '@common/api/park';
import { useMapParks } from '@common/hooks/useMapParks';
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

  const { updateBounds, showLoader, parks } = useMapParks();

  const loadParks = () => {
    if (map) {
      const bounds = map.getBounds();
      updateBounds([
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
        defaultZoom={defaultZoom}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
        }}
        onChange={(v) => {
          settingsDB.set('center', v.center);
          settingsDB.set('zoom', v.zoom);
          setZoom(v.zoom);
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
      </GoogleMapReact>
    </div>
  );
};

export default Map;
