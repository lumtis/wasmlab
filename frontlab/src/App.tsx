import "./App.css";
import { Content } from "./Content";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Content />
          </QueryClientProvider>
        </RecoilRoot>
      </header>
    </div>
  );
};
