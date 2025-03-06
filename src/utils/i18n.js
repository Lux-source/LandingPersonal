import es from '../../local/es.json';
import en from '../../local/en.json';

const translations = { es, en };

export const t = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];
  keys.forEach((k) => {
    if (value) value = value[k];
  });
  return value || key;
};
