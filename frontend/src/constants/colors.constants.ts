export const BASE_COLORS = [
  {
    name: 'neutral',
    color: 'oklch(0.205 0 0)',
  },
  {
    name: 'red',
    color: 'oklch(0.637 0.237 25.331)',
  },
  {
    name: 'rose',
    color: 'oklch(0.645 0.246 16.439)',
  },
  {
    name: 'orange',
    color: 'oklch(0.705 0.213 47.604)',
  },
  {
    name: 'green',
    color: 'oklch(0.723 0.219 149.579)',
  },
  {
    name: 'blue',
    color: 'oklch(0.623 0.214 259.815)',
  },
  {
    name: 'yellow',
    color: 'oklch(0.795 0.184 86.047)',
  },
  {
    name: 'violet',
    color: 'oklch(0.606 0.25 292.717)',
  },
] as const;

export type TypeBaseColor = (typeof BASE_COLORS)[number]['name'];
