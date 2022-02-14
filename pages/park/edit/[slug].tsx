import React from 'react';
import { useRouter } from 'next/router';
import Park from '@components/Park/Park';
import { usePark } from '@common/hooks/usePark';

const ParkEdit = ({ className = '' }: { className?: string }) => {
  const {
    query: { slug = '' },
  } = useRouter();
  const park = usePark(String(slug));

  return <Park className={className} park={park} edit />;
};

export default ParkEdit;
