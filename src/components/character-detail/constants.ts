import { Character } from '../../models/character';

// Fields to display on the character page under the image
export const INFO_KEYS: Partial<Array<keyof Character>> = [
  'name',
  'gender',
  'species',
  'status',
];
