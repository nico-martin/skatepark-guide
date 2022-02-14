import React from 'react';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isRouterRequest = !context.req.url.startsWith('/_next/data');
  if (isRouterRequest) {
    return { props: {} };
  }
  const slug = String(context?.params?.slug);
  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const park = await getPark(slug);
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

export default ParkView;
