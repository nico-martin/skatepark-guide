import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button } from '@theme';
import { deletePark } from '@common/api/park';
import { PARK_API_STATES } from '@common/hooks/usePark';
import { useLocale } from '@common/intl/intlContext';
import { TOAST_BUTTON_TYPES, useToast } from '@common/toast/toastContext';
import { ParkI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import styles from './ParkEditControls.css';

const ParkEditControls = ({
  className = '',
  hasUnsavedChanges,
  parkState,
  updatePark,
  data,
}: {
  className?: string;
  hasUnsavedChanges: boolean;
  parkState: string;
  updatePark: () => void;
  data: ParkI;
}) => {
  const { formatMessage } = useIntl();
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const { addToast } = useToast();
  const history = useHistory();
  const { activeLocale } = useLocale();

  return (
    <div className={cn(className, styles.root)}>
      <Button
        disabled={parkState === PARK_API_STATES.UPDATING || !hasUnsavedChanges}
        isLoading={parkState === PARK_API_STATES.UPDATING}
        onClick={updatePark}
      >
        {formatMessage({
          id:
            data.status === 'private'
              ? 'park.edit.publish'
              : 'park.edit.saveChanges',
        })}
      </Button>
      <Button
        type="text"
        color="danger"
        className={styles.deleteButton}
        onClick={() => {
          setDeleting(true);
          confirm(formatMessage({ id: 'park.edit.delete.confirm' }))
            ? deletePark(data.slug)
                .then(() => {
                  addToast({
                    message: formatMessage({ id: 'park.edit.delete.success' }),
                    controls: [
                      {
                        onClick: ({ remove }) => remove(),
                        type: TOAST_BUTTON_TYPES.SUCCESS,
                      },
                    ],
                  });
                  history.push(`/${activeLocale}/`);
                })
                .catch((e) =>
                  addToast({
                    message: e,
                    controls: [
                      {
                        onClick: ({ remove }) => remove(),
                        type: TOAST_BUTTON_TYPES.DANGER,
                      },
                    ],
                  })
                )
                .finally(() => setDeleting(false))
            : setDeleting(false);
        }}
        isLoading={deleting}
      >
        {formatMessage({ id: 'park.edit.delete' })}
      </Button>
    </div>
  );
};

export default ParkEditControls;
