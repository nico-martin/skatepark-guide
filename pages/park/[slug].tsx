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

const ParkView = ({
  className = '',
  park = null,
}: {
  className?: string;
  park?: ParkI;
}) => {
  const {
    query: { slug = '' },
  } = useRouter();

  return <Park className={className} slug={String(slug)} parkObject={park} />;
};

ParkView.getInitialProps = async (context) => {
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

export default ParkView;
