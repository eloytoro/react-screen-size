import React from 'react';
import MediaProvider from '../src/MediaProvider';
import connectScreenSize from '../src/connectScreenSize';
import medias from '../src/medias';
import { mount } from 'enzyme';
import { setupMatchMedia } from './utils';


const matchMedia = setupMatchMedia(medias);
const defaultScreenSize = {
  gtLg: false,
  gtMd: false,
  gtSm: false,
  gtXs: false,
  lg: false,
  md: false,
  sm: false,
  xs: false
};

const Stub = jest.fn(() => (<div />));
const mapScreenSizeToProps = props => ({
  isMobile: props.xs,
  isTablet: props.sm,
  isDesktop: props.gtSm
});

const ConnectedStub = connectScreenSize(mapScreenSizeToProps)(Stub);

describe('connectScreenSize', () => {
  const Wrapper = ({ foo }) => (
    <MediaProvider screenSize={defaultScreenSize} matchMedia={matchMedia}>
      <ConnectedStub foo={foo} />
    </MediaProvider>
  );

  const wrapped = mount(<Wrapper foo="bar" />);

  const component = wrapped.find(Stub);
  let expectedProps = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    foo: 'bar'
  };

  it('passes props to children', () => {
    expect(component.props()).toEqual(expectedProps);
  });

  it('stays the same when a strict query applies', () => {
    Stub.mockClear();
    matchMedia(medias.gtLg).enable();
    expect(Stub.mock.calls.length).toBe(0);
    expect(component.props()).toEqual(expectedProps);
  });

  it('updates the component when a `greater than` query applies', () => {
    matchMedia(medias.gtSm).enable();
    expectedProps = {
      ...expectedProps,
      isDesktop: true
    };
    expect(component.props()).toEqual(expectedProps);
  });

  it('updates the component when new props are passed', () => {
    expectedProps = {
      ...expectedProps,
      foo: 'baz'
    };
    wrapped.setProps({ foo: 'baz' });
    expect(component.props()).toEqual(expectedProps);
  });
});
