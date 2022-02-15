import React from 'react';
import { useIntl } from 'react-intl';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FullLoader, Menu, Message } from '@theme';
import { getPage } from '@common/api/page';
import { usePage, PAGE_API_STATES } from '@common/hooks/usePage';
import { ApiPageI } from '@common/types/page';
import cn from '@common/utils/classnames';
import { PAGES } from '@common/utils/constants';
import { isNextRouterRequest } from '@common/utils/helpers';
import contentStyles from './content.module.css';
import styles from './page.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (isNextRouterRequest(context)) {
    return { props: {} };
  }
  const slug = String(context?.params?.page);
  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    // todo: https://app.clickup.com/t/25qyvda
    const pageObject = await getPage(slug, 'en');
    return {
      props: { pageObject },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const Page: NextPage<{ className?: string; pageObject: ApiPageI }> = ({
  className = '',
  pageObject = null,
}) => {
  const {
    query: { page },
  } = useRouter();

  const { state, data, error } = usePage(String(page), pageObject);
  const { formatMessage } = useIntl();

  return (
    <div className={cn(styles.root, contentStyles.root, className)}>
      <Head>
        {data?.post_title && (
          <title>
            {formatMessage(
              { id: 'meta.title.sub' },
              { title: data.post_title }
            )}
          </title>
        )}
      </Head>
      <Menu
        className={styles.navigation}
        menu={PAGES.reduce(
          (acc, menuSlug) => ({
            ...acc,
            [menuSlug]: {
              title: formatMessage({ id: `about.${menuSlug}` }),
              active: String(page) === menuSlug,
            },
          }),
          {}
        )}
      />
      {state === PAGE_API_STATES.LOADING && (
        <FullLoader className={cn(styles.loader)} large spacingTop />
      )}
      {state === PAGE_API_STATES.ERROR && (
        <Message type="error">{error}</Message>
      )}
      {state === PAGE_API_STATES.SUCCESS && (
        <React.Fragment>
          <h1 className={styles.title}>{data?.post_title}</h1>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data?.post_content_rendered }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Page;
