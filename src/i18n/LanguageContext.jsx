import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { cloneElement, isValidElement } from 'react';
import { translate } from './translations.js';

const LanguageContext = createContext(null);
const storageKey = 'shilo-production-language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === 'am' ? 'am' : 'en';
    } catch {
      return 'en';
    }
  });
  const setLanguage = useCallback((nextLanguage) => {
    if (nextLanguage === 'en' || nextLanguage === 'am')
      setLanguageState(nextLanguage);
  }, []);
  const t = useCallback((text) => translate(text, language), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'am'
        ? 'SHILO Production — አፍታዎችን መያዝ፣ ታሪኮችን መፍጠር'
        : 'SHILO Production — Capturing Moments, Creating Stories';
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

const untouchedProps = new Set([
  'children',
  'className',
  'id',
  'key',
  'ref',
  'href',
  'src',
  'target',
  'rel',
  'name',
  'type',
  'role',
  'value',
  'style',
  'viewBox',
  'd',
  'fill',
  'stroke',
  'strokeWidth',
  'xmlns',
  'width',
  'height',
  'loading',
  'required',
  'disabled',
  'method',
  'action',
  'rows',
  'size',
  'tabIndex',
  'autoComplete',
  'htmlFor',
  'colSpan',
  'rowSpan',
]);

function translateTree(node, t) {
  if (typeof node === 'string') return t(node);
  if (Array.isArray(node))
    return node.map((child, index) => {
      const translated = translateTree(child, t);
      return isValidElement(translated) && translated.key == null
        ? cloneElement(translated, {
            key: `localized-${index}`,
          })
        : translated;
    });
  if (!isValidElement(node)) return node;

  // prettier-ignore
  const props = {
  };
  for (const [key, value] of Object.entries(node.props)) {
    if (key === 'children') props.children = translateTree(value, t);
    else if (typeof value === 'string' && !untouchedProps.has(key))
      props[key] = t(value);
    else if (isValidElement(value) || Array.isArray(value))
      props[key] = translateTree(value, t);
  }
  return cloneElement(node, props);
}

export function Localized({ children }) {
  const { t } = useLanguage();
  return translateTree(children, t);
}
