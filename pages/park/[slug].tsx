import React from 'react';
import { useIntl } from 'react-intl';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Park from '@components/Park/Park';
import { getPark, getParkShort } from '@common/api/park';
import { usePark } from '@common/hooks/usePark';
import { ParkI } from '@common/types/parks';
import { API } from '@common/utils/constants';

const enum STATE {
  LOADING = 'loading',
  NOT_FOUND = 'not_found',
  SUCCESS = 'success',
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isRouterRequest = context.req.url.startsWith('/_next/data');
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
    const parkObject = await getPark(slug);
    return {
      props: { parkObject },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const ParkView = ({
  className = '',
  parkObject = null,
}: {
  className?: string;
  parkObject?: ParkI;
}) => {
  const {
    query: { slug = '' },
  } = useRouter();
  const { formatMessage } = useIntl();

  const park = usePark(String(slug), parkObject);

  return (
    <React.Fragment>
      <Head>
        <title>
          {park.data?.title
            ? formatMessage(
                { id: 'meta.title.sub' },
                { title: park.data.title }
              )
            : 'test' + formatMessage({ id: 'meta.title' })}
        </title>
      </Head>
      <Park className={className} park={park} />
    </React.Fragment>
  );
};

export default ParkView;
