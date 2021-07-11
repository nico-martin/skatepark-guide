import React from 'react';
import { useIntl } from 'react-intl';
import { getMapParks, MapBounds } from '@common/api/park';
import { TOAST_BUTTON_TYPES, useToast } from '@common/toast/toastContext';
import { MapParkI } from '@common/types/parks';

export const useMapParks = () => {
  const [parks, setParks] = React.useState<Record<string, MapParkI>>({});
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const { addToast } = useToast();
  const { formatMessage } = useIntl();

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

  return {
    updateBounds,
    showLoader,
    parks,
  };
};
