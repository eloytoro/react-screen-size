export const greaterThanMedias = {
  '(min-width: 601px)': '> mobile',
  '(min-width: 961px)': '> small',
  '(min-width: 1281px)': '> medium',
  '(min-width: 1921px)': '> large'
};

export const strictMedias = {
  '(max-width: 600px)': 'mobile',
  '(max-width: 960px) and (min-width: 601px)': 'small',
  '(max-width: 1280px) and (min-width: 961px)': 'medium',
  '(max-width: 1920px) and (min-width: 1281px)': 'large'
};

export default {
  ...greaterThanMedias,
  ...strictMedias
};
