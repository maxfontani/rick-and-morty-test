import React from 'react';

export type Props = {
  placeholder: string;
  invalid?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
