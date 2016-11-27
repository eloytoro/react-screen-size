import React from 'react';
import provider from './provider';


const connectScreenSize = (mapScreenToProps) => (ComposedComponent) => {
  class ConnectScreenSize extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { computedProps: this.computeScreenSizeProps(props) };
    }

    componentDidMount() {
      this.unsubscribe = provider.subscribe(this.updateComputedProps);
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe();
    }

    computeScreenSizeProps = (props) => {
      return mapScreenToProps(provider.getScreenSize(), props);
    };

    updateComputedProps = () => {
      this.setState({ computedProps: this.computeScreenSizeProps(this.props) });
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
