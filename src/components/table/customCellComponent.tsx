import React from "react";
import ReactDOMServer from "react-dom/server";
import { HoverActionComponent } from "./hoverActionComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface CustomCellRendererProps {
  api: any;
  node: any;
  column: any;
  data: any;
  value: any;
}

class CustomCellRenderer extends React.Component<CustomCellRendererProps> {
  private eGui: HTMLDivElement | null = null;

  componentDidMount() {
    this.init(this.props);
  }

  init(params: CustomCellRendererProps) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
    this.eGui = document.createElement("div");
    this.eGui.classList.add("renderer-container");

    this.eGui.innerHTML = ReactDOMServer.renderToString(
      <QueryClientProvider client={queryClient}>
        <HoverActionComponent params={params} />
      </QueryClientProvider>
    );
  }

  componentWillUnmount() {
    // Clean up any event listeners or other resources here
  }

  getGui() {
    return this.eGui;
  }

  render() {
    return <>{this.eGui}</>;
  }
}

export default CustomCellRenderer;
