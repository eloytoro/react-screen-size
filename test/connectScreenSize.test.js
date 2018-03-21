import React from 'react';
import MediaProvider from '../src/MediaProvider';
import connectScreenSize from '../src/connectScreenSize';
import { mount } from 'enzyme';
import { setupMatchMedia } from './utils';


const { matchMedia, medias } = setupMatchMedia();
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
  const wrapped = mount(
    <MediaProvider screenSize={defaultScreenSize} matchMedia={matchMedia}>
      <ConnectedStub />
    </MediaProvider>
  );
  const component = wrapped.find(Stub);

  it('passes props to children', () => {
    expect(component.props()).toEqual(defaultScreenSize);
  });

  it('stays the same when a strict query applies', () => {
    medias['(max-width: 960px) and (min-width: 601px)'].enable();
    expect(component.props()).toEqual(defaultScreenSize);
  });

  it('updates the component when a `greater than` query applies', () => {
    medias['(min-width: 961px)'].enable();
    expect(component.props()).toEqual({
      ...defaultScreenSize,
      gtSm: true,
      sm: true
    });
  });
});
