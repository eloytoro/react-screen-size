import defaultMedias, { greaterThanMedias } from './medias';

const gtKeys = Object.keys(greaterThanMedias);
const defaultScreenSize = {
  xs:   false,
  gtXs: true,
  sm:   false,
  gtSm: true,
  md:   true,
  gtMd: true,
  lg:   false,
  gtLg: false
};

class Provider {
  constructor(medias = {}, screenSize = {}, matchMedia = window.matchMedia) {
    this.listeners = []
    this.medias = Object.assign({}, defaultMedias, medias);
    this.screenSize = Object.assign({}, defaultScreenSize, screenSize);
    this.mediaQueryLists = {};

    Object.keys(this.medias).forEach((key) => {
      this.mediaQueryLists[key] = matchMedia(this.medias[key]);
    });

    gtKeys.forEach(key => {
      this.mediaQueryLists[key].addListener(() => this.update());
    });
  }

  getScreenSize() {
    return this.screenSize;
  }

  update() {
    this.screenSize = Object.assign({}, this.screenSize);
    Object.keys(this.screenSize).forEach((key) => {
      this.screenSize[key] = this.mediaQueryLists[key].matches;
    });
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
  }
}

export default Provider;
