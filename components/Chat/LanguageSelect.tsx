import { FC, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

interface Props {
  selectedLanguage: string;
  onChangelanguge: (langCode: string) => void;
}
export const LanguageSelect = ({
  selectedLanguage,
  onChangelanguge,
}: Props) => {
  const { t } = useTranslation('chat');
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-1 w-full rounded border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          ref={selectRef}
          className="w-full cursor-pointer bg-transparent p-2"
          placeholder={t('Select a language') || ''}
          value={selectedLanguage}
          onChange={(e) => onChangelanguge(e.target.value)}
        >
          <option
            key="ti"
            value="ti"
            className="dark:bg-[#343541] dark:text-white"
          >
            {t(`Tigrinya`)}
          </option>
          <option
            key="am"
            value="am"
            className="dark:bg-[#343541] dark:text-white"
          >
            {t(`Amharic`)}
          </option>
        </select>
      </div>
    </div>
  );
};
