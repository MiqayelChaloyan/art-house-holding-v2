'use client'

import React, { useTransition } from 'react';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import NextImage from '@/src/components/components/image';

import { ImagePaths } from '@/src/constants';
import { ArianAMU } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const localeStrings: {
  [key: string]: string;
} = {
  am: 'Հայ',
  ru: 'Рус',
  en: 'Eng',
};

const localeImages: {
  [key: string]: string;
} = {
  am: ImagePaths.DESIGN.amURL,
  ru: ImagePaths.DESIGN.ruURL,
  en: ImagePaths.DESIGN.enURL
};

const keySwithcer = '/design';

export default function LocalSwitcher({ activeColor = colors.darkRed, color = colors.black }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (locale: string) => {
    let pathParts = '';

    if (pathname) {
      pathParts = pathname.slice(3);
    }


    startTransition(() => {
      router.replace(`/${locale}${pathParts}`, { scroll: false });
    });
  };


  if (pathname.includes(keySwithcer)) {
    return pathname.includes(keySwithcer) && (
      <div className={styles.switcher}>
        {Object.keys(localeImages).map((key, index) => (
          <div
            key={key}
            className={cn(
              styles.language,
              { [styles.active]: localActive === key },
              ArianAMU.className
            )}
            onClick={() => onSelectChange(key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = activeColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = localActive === key ? activeColor : color
            }}
          >
            <NextImage
              src={localeImages[key]}
              alt={key}
              className={styles['option-image']}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.switcher}>
      {Object.keys(localeStrings).map((key, index) => (
        <div
          key={key}
          className={cn(
            styles.language,
            { [styles.active]: localActive === key },
            ArianAMU.className
          )}
          style={{
            color: localActive === key ? activeColor : color,
            borderRight: index !== Object.keys(localeStrings).length - 1 ? `2px solid ${color}` : 'none'
          }}
          onClick={() => onSelectChange(key)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = activeColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = localActive === key ? activeColor : color
          }}
        >
          <span className={styles.option}>
            {localeStrings[key]}
          </span>
        </div>
      ))}
    </div>
  );
};
