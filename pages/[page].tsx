import React from 'react';
import { useIntl } from 'react-intl';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button, FullLoader, Menu, Message } from '@theme';
import { usePage, PAGE_API_STATES } from '@common/hooks/usePage';
import cn from '@common/utils/classnames';
import { PAGES } from '@common/utils/constants';
import contentStyles from './content.module.css';
import styles from './page.module.css';

const Page: NextPage<{ className?: string }> = ({ className = '' }) => {
  const {
    query: { page },
  } = useRouter();

  const { state, data, error } = usePage(String(page));
  const { formatMessage } = useIntl();

  return (
    <div className={cn(styles.root, contentStyles.root, className)}>
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
          <h1 className={styles.title}>{data.post_title}</h1>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data.post_content_rendered }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Page;
