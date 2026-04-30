import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Button from './Button/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-lg text-center" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%' 
        }}>
          <span className="material-symbols-outlined text-error mb-sm" style={{ fontSize: '48px' }}>report</span>
          <h2 className="text-headline-md mb-sm">Something went wrong.</h2>
          <p className="text-body-md mb-lg">We encountered an issue loading this part of your journey.</p>
          <Button onClick={() => window.location.reload()} icon="refresh">
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
