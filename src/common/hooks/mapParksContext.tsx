import React from 'react';
import { useIntl } from 'react-intl';
import { getMapParks, MapBounds } from '@common/api/park';
import { TOAST_BUTTON_TYPES, useToast } from '@common/toast/toastContext';
import { GeoDataI, MapParkI, ParkFacilitiesT } from '@common/types/parks';
import { PARK_FACILITIES } from '@common/utils/constants';
import { getActiveFacilities } from '@common/utils/helpers';

const initialFilterState: ParkFacilitiesT = PARK_FACILITIES.reduce(
  (acc, item) => ({ ...acc, [item]: true }),
  {}
);

const MapParksContext = React.createContext<{
  parks: Record<string, MapParkI>;
  showLoader: boolean;
  updateBounds: (bounds: MapBounds) => void;
  updateFilter: (filter: Partial<ParkFacilitiesT>) => void;
  filter: ParkFacilitiesT;
  userPosition: GeoDataI;
  setUserPosition: (data: GeoDataI) => void;
}>({
  parks: {},
  showLoader: false,
  updateBounds: () => {},
  updateFilter: () => {},
  filter: initialFilterState,
  userPosition: null,
  setUserPosition: () => {},
});

export const MapParksContextProvider = ({ children }: { children: any }) => {
  const [parks, setParks] = React.useState<Record<string, MapParkI>>({});
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [filter, setFilter] =
    React.useState<ParkFacilitiesT>(initialFilterState);
  const [userPosition, setUserPosition] = React.useState<GeoDataI>();

  const { formatMessage } = useIntl();
  const { addToast } = useToast();

  const updateBounds = (bounds: MapBounds) => {
    setShowLoader(true);
    getMapParks(bounds)
      .then((data) => setParks({ ...parks, ...data.parks }))
      .catch((e) =>
        addToast({
          message: formatMessage({ id: 'map.loading.error' }),
          controls: [
            {
              type: TOAST_BUTTON_TYPES.DANGER,
            },
          ],
        })
      )
      .finally(() => setShowLoader(false));
  };

  const parksFiltered = React.useMemo<Record<string, MapParkI>>(
    () =>
      Object.values(filter).filter((e) => !Boolean(e)).length === 0
        ? parks
        : Object.values(parks)
            .filter(
              (park) =>
                getActiveFacilities(park.parksFacilities).filter((value) =>
                  getActiveFacilities(filter).includes(value)
                ).length !== 0
            )
            .reduce((acc, park) => ({ ...acc, [park.slug]: park }), {}),
    [parks, filter]
  );

  return (
    <MapParksContext.Provider
      value={{
        parks: parksFiltered,
        showLoader,
        updateBounds,
        updateFilter: (newFilter) => setFilter({ ...filter, ...newFilter }),
        filter,
        userPosition,
        setUserPosition,
      }}
    >
      {children}
    </MapParksContext.Provider>
  );
};

export const useMapParks = (): {
  parks: Record<string, MapParkI>;
  showLoader: boolean;
} => {
  const { parks, showLoader } = React.useContext(MapParksContext);
  return { parks, showLoader };
};

export const useMapBounds = (): {
  updateMapBounds: (bounds: MapBounds) => void;
} => {
  const { updateBounds } = React.useContext(MapParksContext);
  return { updateMapBounds: updateBounds };
};

export const useMapFilter = (): {
  filter: ParkFacilitiesT;
  updateFilter: (filter: Partial<ParkFacilitiesT>) => void;
} => {
  const { updateFilter, filter } = React.useContext(MapParksContext);
  return { filter, updateFilter };
};

export const useUserPosition = (): {
  watchPosition: () => void;
  clearPosition: () => void;
  userPosition: GeoDataI;
} => {
  const [watchId, setWatchId] = React.useState<number>(null);
  const { userPosition, setUserPosition } = React.useContext(MapParksContext);
  const { formatMessage } = useIntl();

  const watchPosition = () => {
    watchId && navigator.geolocation.clearWatch(watchId);
    setWatchId(
      navigator.geolocation.watchPosition(
        (position) =>
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        () => {
          alert(formatMessage({ id: 'settings.location.error' }));
          setUserPosition(null);
        }
      )
    );
  };

  const clearPosition = () => {
    watchId && navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
    setUserPosition(null);
  };
  return {
    watchPosition,
    clearPosition,
    userPosition,
  };
};
