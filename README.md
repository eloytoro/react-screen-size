[![Build Status](https://travis-ci.org/eloytoro/react-screen-size.svg?branch=master)](https://travis-ci.org/eloytoro/react-screen-size)
[![npm version](https://badge.fury.io/js/react-screen-size.svg)](https://badge.fury.io/js/react-screen-size)

## react-screen-size

A HoC to connect your components to screen size changes

### Older versions

* [v1.x](https://github.com/eloytoro/react-screen-size/tree/v1.x)

### Why would you need this

If your component logic depends on screen size then you need this.


### Quick Example

```jsx
const Container = ({ isTablet, isMobile, isDesktop }) => (
  ...
)

const mapScreenSizeToProps = ({ sm, xs, gtXs }) => {
  return {
    isTablet: sm,
    isMobile: xs,
    isDesktop: gtSm
  }
}

export default connectScreenSize(mapScreenSizeToProps)(Container);
```

## API

### <MediaProvider [medias] [screenSize]>

Components declared inside of a `MediaProvider` will be listening to screen changes.

#### Props

* `medias` (_Object?_): Extend definitions for screen size criterias. Default values are:

```javascript
{
  xs:   '(max-width: 600px)',
  sm:   '(max-width: 960px) and (min-width: 601px)',
  md:   '(max-width: 1280px) and (min-width: 961px)',
  lg:   '(max-width: 1920px) and (min-width: 1281px)',
  gtXs: '(min-width: 601px)',
  gtSm: '(min-width: 961px)',
  gtMd: '(min-width: 1281px)',
  gtLg: '(min-width: 1921px)',
}
```

* `screenSize` (_Object?_): Set initial value of the screenSize passed to connected components,
useful this for server side rendering. Default values are:

```javascript
{
  xs:   false,
  gtXs: true,
  sm:   false,
  gtSm: true,
  md:   true,
  gtMd: true,
  lg:   false,
  gtLg: false
}
```

### `connectScreenSize(mapScreenSizeToProps)`

Subscribes a React component to screen size changes.

#### Arguments

* `mapScreenSizeToProps(screenSize): screenSizeProps` (_Function_): Any time the screen size updates
`mapScreenSizeToProps` will be called with the active media queries as an object structure, these
are the possible values
  * `screenSize.xs`
  * `screenSize.sm`
  * `screenSize.md`
  * `screenSize.lg`
  * `screenSize.gtXs`
  * `screenSize.gtSm`
  * `screenSize.gtMd`
  * `screenSize.gtLg`

#### Returns

A react component that will inject the resulting object of calls to `mapScreenSizeToProps` as props
into your component
