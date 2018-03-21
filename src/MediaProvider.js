import React from 'react';
import PropTypes from 'prop-types';
import Provider from './provider';


class MediaProvider extends React.Component {
  static childContextTypes = {
    screenSizeProvider: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      screenSizeProvider: this.provider,
    };
  }

  componentWillMount() {
    this.provider = new Provider(this.props.medias, this.props.screenSize, this.props.matchMedia);
  }

  render() {
    return this.props.children;
  }
}

export default MediaProvider;
