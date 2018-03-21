export const setupMatchMedia = (mediaQueries) => {
  const medias = Object.keys(mediaQueries).reduce((result, key) => {
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
      [mediaQueries[key]]: media
    };
  }, {});

  return (query) => medias[query];
};
