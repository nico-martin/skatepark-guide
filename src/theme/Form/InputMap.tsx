import GoogleMapReact from 'google-map-react';
import React from 'react';
import { getIPLatLng } from '@common/api/park';
import { settingsDB } from '@common/idb';
import { GeoDataI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import { gmapsKey, styles as mapStyles } from '@common/utils/maps';
import { Icon } from '../index';
import styles from './InputMap.css';

const InputMap = ({
  name,
  value = null,
  className = '',
  classNameInput = '',
  onChange = () => '',
}: {
  name: string;
  value?: GeoDataI;
  className?: string;
  classNameInput?: string;
  onChange?: (value: GeoDataI) => void;
}) => {
  const [initCenter, setInitCenter] = React.useState<GeoDataI>(value);
  const [center, setCenter] = React.useState<GeoDataI>(value);

  React.useEffect(() => {
    if (!initCenter) {
      getIPLatLng().then((data) =>
        setInitCenter({
          lat: data.lat,
          lng: data.lon,
        })
      );
    }
  }, []);

  if (!initCenter) {
    return null;
  }

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={cn(className, styles.root)}>
      <div
        className={cn(classNameInput, styles.mapContainer)}
        onTouchStart={stopPropagation}
        onMouseDown={stopPropagation}
        onTouchEnd={stopPropagation}
        onMouseUp={stopPropagation}
        onTouchMove={stopPropagation}
        onMouseMove={stopPropagation}
      >
        <Icon icon="mdi/crosshair" className={styles.crosshair} />
        <GoogleMapReact
          bootstrapURLKeys={{ key: gmapsKey }}
          options={(map) => ({
            disableDefaultUI: false,
            //styles: mapStyles,
            fullscreenControl: false,
            mapTypeId: map.MapTypeId.HYBRID,
            scrollwheel: false,
          })}
          center={initCenter}
          zoom={17}
          yesIWantToUseGoogleMapApiInternals
          onDrag={(map) =>
            setCenter({ lat: map.center.lat(), lng: map.center.lng() })
          }
          onDragEnd={(map) =>
            onChange({ lat: map.center.lat(), lng: map.center.lng() })
          }
        />
      </div>
      <p className={styles.latlng}>
        lat: {center?.lat} / lng: {center?.lng}
      </p>
    </div>
  );
};

InputMap.displayName = 'InputMap';

export default InputMap;
