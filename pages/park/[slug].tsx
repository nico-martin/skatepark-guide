import React from 'react';
import { useRouter } from 'next/router';
import Park from '@components/Park/Park';
import { getPark, getParkShort } from '@common/api/park';
import { ParkI } from '@common/types/parks';
import { API } from '@common/utils/constants';

const enum STATE {
  LOADING = 'loading',
  NOT_FOUND = 'not_found',
  SUCCESS = 'success',
}

export const getServerSideProps = async (context) => {
  if (!context?.params?.slug) {
    return {
      notFound: true,
    };
  }

  try {
    const park = await getPark(context.params.slug);
    return {
      props: { park },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const ParkView = ({
  className = '',
  park,
}: {
  className?: string;
  park: ParkI;
}) => <Park className={className} parkObject={park} />;

export default ParkView;
