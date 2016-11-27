import mediaQueries from '../src/medias';


export const setupMatchMedia = () => {
  const medias = Object.keys(mediaQueries).reduce((result, query) => {
    let matches = false;
    const listeners = [];

    const media = {
      addListener: fn => listeners.push(fn),
      trigger: () => {
        listeners.forEach(listener => listener())
      },
      enable: () => {
        matches = true;
        media.trigger();
      },
      disable: () => {
        matches = false;
        media.trigger();
      },
      get matches() {
        return matches;
      }
    };

    return {
      ...result,
      [query]: media
    };
  }, {});

  return {
    matchMedia: (query) => medias[query],
    medias
  }
};
