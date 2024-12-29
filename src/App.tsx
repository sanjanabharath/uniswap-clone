import { WagmiProvider } from "wagmi";
import "./App.css";
import Navbar from "./Navbar";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainCard from "./MainCard";
import TokenSwapQuote from "./TokenSwapQuote";

function App() {
  const client = new QueryClient();
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <Navbar />
          {/* <MainCard /> */}
          <TokenSwapQuote />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
