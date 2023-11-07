import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      // return this.props.fallback;
      return (
        <div>
          {/* eslint-disable-next-line */}
          <h1>What have you done? Now it like all busted up and stuff, yo.</h1>
          <p>{error && error.toString()}</p>
          <p>{errorInfo && errorInfo.componentStack}</p>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
