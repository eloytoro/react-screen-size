[![Build Status](https://travis-ci.org/eloytoro/react-screen-size.svg?branch=master)](https://travis-ci.org/eloytoro/react-screen-size)
[![npm version](https://badge.fury.io/js/react-screen-size.svg)](https://badge.fury.io/js/react-screen-size)

## react-screen-size

A HoC to connect your components to screen size changes

### Why would you need this

If your component logic depends on screen size then you need this.


### Quick Example

```jsx
const Container = ({ isTablet, isMobile, isDesktop }) => (
  ...
)

const mapScreenSizeToProps = (screenSize) => {
  return {
    isTablet: screenSize['small'],
    isMobile: screenSize['mobile'],
    isDesktop: screenSize['> small']
  }
}

export default connectScreenSize(mapScreenSizeToProps)(Container);
```

## API

### `connectScreenSize(mapScreenSizeToProps)`

Subscribes a React component to screen size changes.

#### Arguments

* `mapScreenSizeToProps(screenSize): screenSizeProps` (_Function_): Any time the screen size updates
`mapScreenSizeToProps` will be called with the active media queries as an object structure, these
are the possible values
  * `screenSize['mobile']` - equals to `(max-width: 600px)`
  * `screenSize['mobile']` - equals to `(max-width: 960px) and (min-width: 601px)`
  * `screenSize['medium']` - equals to `(max-width: 1280px) and (min-width: 961px)`
  * `screenSize['large']` - equals to `(max-width: 1920px) and (min-width: 1281px)`
  * `screenSize['> mobile']` - equals to `(min-width: 601px)`
  * `screenSize['> mobile']` - equals to `(min-width: 961px)`
  * `screenSize['> medium']` - equals to `(min-width: 1281px)`
  * `screenSize['> large']` - equals to `(min-width: 1921px)`

#### Returns

A react component that will inject the resulting object of calls to `mapScreenSizeToProps` as props
into your component
