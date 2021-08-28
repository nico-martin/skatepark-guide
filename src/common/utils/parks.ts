import { nl2br } from '@common/utils/helpers';

export const formatContact = (
  key: string,
  value: string
): { url: string; formattedValue: string } => {
  let url = '';
  let formattedValue = value;
  switch (key) {
    case 'email':
      url = 'mailto:' + value;
      break;
    case 'phone':
      url = 'tel:' + value;
      break;
    case 'address':
      url = `https://www.google.com/maps?q=${formattedValue}`;
      formattedValue = nl2br(formattedValue);
      break;
    default:
      const regex =
        /(https?:\/\/(?:www\.|(?!www))([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))/gm;
      const match = regex.exec(value);
      if (match) {
        url = match[0];
        formattedValue = match[2];
      }
  }

  return {
    url,
    formattedValue,
  };
};
