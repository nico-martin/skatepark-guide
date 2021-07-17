import React from 'react';
import { useIntl } from 'react-intl';
import { getMapParks, MapBounds } from '@common/api/park';
import { TOAST_BUTTON_TYPES, useToast } from '@common/toast/toastContext';
import { MapParkI, ParkFacilitiesT } from '@common/types/parks';
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
}>({
  parks: {},
  showLoader: false,
  updateBounds: () => {},
  updateFilter: () => {},
  filter: initialFilterState,
});

export const MapParksContextProvider = ({ children }: { children: any }) => {
  const [parks, setParks] = React.useState<Record<string, MapParkI>>({});
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [filter, setFilter] =
    React.useState<ParkFacilitiesT>(initialFilterState);

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
      Object.values(parks)
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
