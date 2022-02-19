import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import PasswordResetForm from '@common/auth/components/PasswordResetForm';
import cn from '@common/utils/classnames';
import contentStyles from '../../content.module.css';

const Page: NextPage<{ className?: string }> = ({ className = '' }) => {
  const {
    query: { key },
  } = useRouter();

  return (
    <div className={cn(contentStyles.root, contentStyles.rootMt, className)}>
      <PasswordResetForm pwKey={String(key)} />
    </div>
  );
};

export default Page;
