import { useDisconnect } from "wagmi";

const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  return (
    <div>
      <button
        className="text-black bg-white rounded-xl p-2"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};

export default DisconnectButton;
