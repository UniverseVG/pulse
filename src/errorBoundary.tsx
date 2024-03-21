import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

const myErrorHandler = (error: Error) => {
  alert("Something went wrong: " + error.toString());
};

const CustomFallback = () => (
  <div className="flex flex-col items-stretch justify-center content-center px-4" />
);

interface ErrorHandlerProps {
  children: ReactNode;
}

const ErrorHandler = ({ children }: ErrorHandlerProps) => (
  <ErrorBoundary
    FallbackComponent={CustomFallback}
    onError={myErrorHandler}
    onReset={() => {}}
    resetKeys={["test"]}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorHandler;
