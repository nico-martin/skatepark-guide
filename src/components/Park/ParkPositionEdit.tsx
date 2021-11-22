import React from 'react';
import { useIntl } from 'react-intl';
import { FormElement, Icon, InputMap } from '@theme';
import { GeoDataI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import styles from './ParkPositionEdit.css';

const ParkPositionEdit = ({
  className = '',
  position,
  onUpdatePosition,
}: {
  className?: string;
  position: GeoDataI;
  onUpdatePosition: (position: GeoDataI) => void;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={cn(className, styles.root)}>
      <FormElement
        name="park-position"
        label={formatMessage({ id: 'park.edit.map' })}
        Input={InputMap}
        value={position}
        onChange={(position) => onUpdatePosition(position)}
      />
    </div>
  );
};

export default ParkPositionEdit;
