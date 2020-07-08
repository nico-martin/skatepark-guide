import { ApiPark, Park } from '@app/vendor/types';

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
  };
};
