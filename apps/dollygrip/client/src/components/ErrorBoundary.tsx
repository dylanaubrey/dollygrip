import React, { ErrorInfo, ReactChild } from 'react';

export type Props = {
  children: ReactChild;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  renderError: (error: Error) => JSX.Element;
};

export type State = {
  error?: Error;
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return {
      error,
      hasError: true,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    const { children, renderError } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return renderError(error as Error);
    }

    return children;
  }
}
