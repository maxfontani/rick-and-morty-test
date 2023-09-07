import { Component, ErrorInfo, ReactElement, cloneElement } from 'react';

interface Props {
  errorScreen: ReactElement;
  children: ReactElement;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('crash error: ', error);
    console.log('crash error-info: ', errorInfo);
  }

  render() {
    const { children, errorScreen } = this.props;

    return this.state.hasError
      ? cloneElement(errorScreen, {
          click: (route: string) => {
            window.location.href = route;
          },
        })
      : children;
  }
}
