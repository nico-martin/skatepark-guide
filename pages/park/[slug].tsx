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
import { createImage } from '@common/utils/imageProxy';

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

  // todo: add description and image
  return (
    <React.Fragment>
      <Head>
        {park.data?.title && (
          <React.Fragment>
            <title key="title">
              {formatMessage(
                { id: 'meta.title.sub' },
                { title: park.data.title }
              )}
            </title>
            <meta
              name="description"
              content={formatMessage(
                { id: 'meta.description.sub' },
                { title: park.data.title }
              )}
            />
          </React.Fragment>
        )}
        {park.data?.headImage && (
          <React.Fragment>
            <meta
              property="og:image"
              content={createImage({
                imageUrl: park.data.headImage.url,
                width: 1200,
                height: 630,
              })}
            />
            <meta
              property="twitter:image"
              content={createImage({
                imageUrl: park.data.headImage.url,
                width: 1024,
                height: 512,
              })}
            />
          </React.Fragment>
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Park className={className} park={park} />
    </React.Fragment>
  );
};

export default ParkView;
