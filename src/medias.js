export const greaterThanMedias = {
  gtXs: '(min-width: 601px)',
  gtSm: '(min-width: 961px)',
  gtMd: '(min-width: 1281px)',
  gtLg: '(min-width: 1921px)',
};

export const lessThanMedias = {
  ltXs: '(min-width: 601px)',
  ltSm: '(min-width: 961px)',
  ltMd: '(min-width: 1281px)',
  ltLg: '(min-width: 1921px)',
};

export const strictMedias = {
  xs: '(max-width: 600px)',
  sm: '(max-width: 960px) and (min-width: 601px)',
  md: '(max-width: 1280px) and (min-width: 961px)',
  lg: '(max-width: 1920px) and (min-width: 1281px)',
};

export default {
  ...greaterThanMedias,
  ...lessThanMedias,
  ...strictMedias
};
