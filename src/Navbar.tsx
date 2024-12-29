import { useAccount, useConnect } from "wagmi";
import DisconnectButton from "./DisconnectButton";

const Navbar = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  if (address) {
    return (
      <div className="m-6  flex items-center justify-between">
        <p className="text-white font-extrabold text-xl">Uniswap Clone</p>
        <div className="flex items-center ">
          <p className="text-white mx-4">{address}</p> <DisconnectButton />
        </div>
      </div>
    );
  }
  return (
    <div>
      {connectors.map((connector) => (
        <button id={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
