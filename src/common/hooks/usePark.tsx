import React from 'react';
import { getPark } from '@common/api/park';
import { ParkI } from '@common/types/parks';

export const PARK_API_STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const usePark = (
  slug: string
): {
  state: string;
  data: ParkI;
  error: string;
} => {
  const [state, setState] = React.useState<string>(PARK_API_STATES.LOADING);
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ParkI>();

  React.useEffect(() => {
    setState(PARK_API_STATES.LOADING);
    getPark(slug)
      .then(([data]) => {
        setData({
          title: data.title.rendered,
          content: data.content.rendered,
          slug: data.slug,
          logo: data.parksLogo,
          headImage: data.headImage,
          gallery: data.parksGallery,
          video: data.parksVideo,
          anlage: data.parksAnlage,
          facilities: data.parksFacilities,
          contact: {
            homepage: data.parksHomepage,
            email: data.parksEmail,
            phone: data.parksPhone,
            facebook: data.parksFacebook,
            address: data.parksAddress,
          },
          map: data.map,
        });
        setState(PARK_API_STATES.SUCCESS);
      })
      .catch((e) => {
        setError(e.toString());
        setState(PARK_API_STATES.ERROR);
      });
  }, [slug]);

  return {
    state,
    data,
    error,
  };
};
