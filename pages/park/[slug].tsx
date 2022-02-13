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
  console.log(context);
  if (!context?.query?.slug) {
    context.res.statusCode = 404;
    context.res.end('Not found');
    return;
    return {
      notFound: true,
    };
  }

  try {
    const park = await getPark(context.query.slug);
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
