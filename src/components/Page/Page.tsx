import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { FullLoader, Message } from '@theme';
import { usePage, PAGE_API_STATES } from '@common/hooks/usePage';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import { PAGES } from '@common/utils/constants';
import styles from './Page.css';

const Page = ({ className = '' }: { className?: string }) => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || slug === 'park') {
    return null;
  }
  const { state, data, error } = usePage(slug);
  const { formatMessage } = useIntl();

  return (
    <div className={cn(styles.root, className)}>
      <nav className={styles.navigation}>
        {PAGES.map((menuSlug) => (
          <IntlLink
            href={menuSlug}
            className={cn(styles.navigationElement, {
              [styles.navigationElementActive]: menuSlug === slug,
            })}
          >
            {formatMessage({ id: `about.${menuSlug}` })}
          </IntlLink>
        ))}
      </nav>
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
