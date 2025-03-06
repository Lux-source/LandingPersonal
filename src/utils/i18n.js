// src/utils/i18n.js
import es from '../../local/es.json';
import en from '../../local/en.json';

const translations = { es, en };

export const getLang = () => {
    // Si localStorage no está disponible (SSR), se retorna por defecto "es"
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('lang') || 'es';
    }
    return 'es';
  };
  
  export const t = (key) => {
    const lang = getLang();
    const keys = key.split('.');
    let value = translations[lang];
    keys.forEach((k) => {
      if (value) value = value[k];
    });
    return value || key;
  };