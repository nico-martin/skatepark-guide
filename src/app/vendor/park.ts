import { ApiPark, Park } from '@app/vendor/types';
import { string } from 'prop-types';

export const mapApiToPark = (api: ApiPark): Park => {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title.rendered,
    map: api.map,
    headImage: api['head-image'],
    facilities: api['parks-facilities'],
    status: api.status,
    video: api['parks-video'],
    content: api.content.rendered,
    contact: {
      homepage: api['parks-homepage'],
      email: api['parks-email'],
      phone: api['parks-phone'],
      facebook: api['parks-facebook'],
      address: api['parks-address'],
    },
  };
};
