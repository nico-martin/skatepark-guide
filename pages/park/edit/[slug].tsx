import React from 'react';
import { useRouter } from 'next/router';
import Park from '@components/Park/Park';

const ParkEdit = ({ className = '' }: { className?: string }) => {
  const {
    query: { slug = '' },
  } = useRouter();

  return <Park className={className} slug={String(slug)} edit />;
};

export default ParkEdit;
