import { FaAngleDown } from "react-icons/fa";

const MainCard = () => {
  return (
    <div>
      <div className="flex">
        <input />
        <button className="text-white flex items-center border-2">
          ETH <FaAngleDown />
        </button>
      </div>
      <div className="flex mt-8">
        <input />
        <button className="text-white flex items-center border-2">
          USDT <FaAngleDown />
        </button>
      </div>
      <button className="bg-white text-black">Swap</button>
    </div>
  );
};

export default MainCard;
