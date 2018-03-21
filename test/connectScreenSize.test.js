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

const Stub = () => (<div />);
const ConnectedStub = connectScreenSize(props => props)(Stub);

describe('connectScreenSize', () => {
  const Wrapper = ({ foo }) => (
    <MediaProvider screenSize={defaultScreenSize} matchMedia={matchMedia}>
      <ConnectedStub foo={foo} />
    </MediaProvider>
  );

  const wrapped = mount(<Wrapper foo="bar" />);

  const component = wrapped.find(Stub);
  let expectedProps = {
    ...defaultScreenSize,
    foo: 'bar'
  };

  it('passes props to children', () => {
    expect(component.props()).toEqual(expectedProps);
  });

  it('stays the same when a strict query applies', () => {
    matchMedia(medias.sm).enable();
    expect(component.props()).toEqual(expectedProps);
  });

  it('updates the component when a `greater than` query applies', () => {
    matchMedia(medias.gtSm).enable();
    expectedProps = {
      ...expectedProps,
      gtSm: true,
      sm: true
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
  })
});
