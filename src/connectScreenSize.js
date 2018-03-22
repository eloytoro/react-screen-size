import React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import PropTypes from 'prop-types';

const connectScreenSize = (mapScreenToProps) => (ComposedComponent) => {
  class ConnectScreenSize extends React.Component {
    static contextTypes = {
      screenSizeProvider: PropTypes.object.isRequired,
    };

    constructor(props, context) {
      super(props);
      this.state = {
        computedProps: mapScreenToProps(context.screenSizeProvider.getScreenSize(), props)
      };
    }

    componentDidMount() {
      this.unsubscribe = this.context.screenSizeProvider.subscribe(this.updateComputedProps);
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe();
    }

    updateComputedProps = () => {
      const computedProps = mapScreenToProps(this.context.screenSizeProvider.getScreenSize(), this.props);
      if (!shallowEqual(computedProps, this.state.computedProps)) {
        this.setState({
          computedProps
        });
      }
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state.computedProps}
        />
      );
    }
  }

  return ConnectScreenSize;
};

export default connectScreenSize
