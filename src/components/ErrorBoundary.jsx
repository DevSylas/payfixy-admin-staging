import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center !h-[85vh]">
          <div className="h-16 w-16 md:w-24 md:h-24">
            {/* Display Image or SVG */}
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Oops! Something went wrong.
          </h1>
          <button
            onClick={this.handleReload}
            className="block my-2 px-4 text-lg py-2 underline cursor-pointer rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
