import React, { useState } from "react";
import { ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { Pool } from "@uniswap/v3-sdk";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { CurrencyAmount } from "@uniswap/sdk-core";

const ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const QUOTER_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const QUOTER_ABI = [
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "quoteExactInput",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const TokenSwapQuote = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example token addresses (replace with your desired tokens)
  const TOKEN_IN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  const TOKEN_OUT = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI

  const getQuote = async () => {
    try {
      setLoading(true);
      setError(null);

      // Connect to provider using ethers v6 syntax
      //@ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Get signer
      const signer = await provider.getSigner();

      // Create contract instance
      const quoterContract = new ethers.Contract(
        QUOTER_ADDRESS,
        QUOTER_ABI,
        signer
      );

      // Encode path using ethers v6 syntax
      const path = ethers.concat([
        TOKEN_IN,
        ethers.toBeHex(3000, 3), // 3000 = 0.3% fee tier, 3 bytes
        TOKEN_OUT,
      ]);

      // Convert input amount to wei
      const amountIn = ethers.parseEther(inputAmount);

      // Get quote
      const quotedAmountOut = await quoterContract.quoteExactInput.staticCall(
        path,
        amountIn
      );

      // Convert output amount from wei
      const formattedQuote = ethers.formatUnits(quotedAmountOut, 18);
      //@ts-ignore
      setQuoteAmount(formattedQuote);
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      console.error("Error getting quote:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Token Swap Quote</h2>

      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Enter amount of input token"
          className="p-2 border rounded"
        />

        <button
          onClick={getQuote}
          disabled={loading || !inputAmount}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Getting Quote..." : "Get Quote"}
        </button>

        {error && <div className="text-red-500">Error: {error}</div>}

        {quoteAmount && (
          <div className="mt-4">
            <h3 className="font-bold">Quote Result:</h3>
            <p>Output Amount: {quoteAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSwapQuote;
