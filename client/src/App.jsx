import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./utils/MessagePortal.json";
import "./App.css";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { checkIfWalletIsConnected, getAllMessages } from "./components";

const App = () => {
  // register Swiper custom elements
  register();
  // react hooks for dynamic events
  const [currentAccount, setCurrentAccount] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  // const [isConnected, setIsConnected] = useState[null];

  // the contract location on the blockchain
  const contractAddress = "0xD092AAfA50F66eB719443eB104043764b5487fb4";
  // variable for referencing contract ABI content
  const contractABI = abi.abi;

  //prompt metamask connection on page load
  useEffect(() => {
    checkIfWalletIsConnected().then((account) => {
      setCurrentAccount(account);
    });
  }, []);

  // useEffect(() => {
  //   getAllMessages(contractAddress, contractABI).then((allMessages) => {
  //     setAllMessages(allMessages);
  //   });
  // });

  // function handleConnection(isConnected) {
  //   setIsConnected();
  // }

  // function to connect wallet manually
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have metamask installed!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Connected", accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // this function connects frontend to contract through ethers.js
  const message = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const messagePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const messageTxn = await messagePortalContract.sendMessage(
          "A test message for the live site"
        );
        console.log("Mining...", messageTxn.hash);
        await messageTxn.wait();
        console.log("Mined -- ", messageTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="isolate bg-white dark:bg-gray-900 h-screen flex justify-center items-center">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] sm:blur-la">
        <svg
          className="w-full left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".7"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* ================ MAIN PAGE CONTENT ====================*/}
      <div className="mainContainer flex mx-auto max-w-[80%]">
        <div className="dataContainer flex flex-col gap-4 justify-center items-center">
          <h1 className="text-slate-600 dark:text-slate-200 text-center text-2xl sm:text-4xl sm:mb-6 font-bold">
            👋 Hey there!
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-center sm:text-2xl">
            I am Etornam and I write smart contracts. That's pretty cool, right?
            Connect your wallet and send me a message to summon me!
          </p>
          {/*
           * If there is no currentAccount render this button
           */}
          {!currentAccount && (
            <button
              className="btn shadow-md transition-all duration-300 ease-in bg-200 bg-btngrad flex justify-center text-white min-w-[60%] text-xl p-4 rounded mt-4 hover:bg-center hover:shadow-2xl hover:bg-right"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
          {currentAccount && (
            <button
              className="btn shadow-md transition-all duration-300 ease-in bg-200 bg-btngrad flex justify-center text-white min-w-[60%] text-xl p-4 rounded mt-4 hover:bg-center hover:shadow-2xl hover:bg-right"
              onClick={message}
            >
              Summon Me
            </button>
          )}

          {/* RENDER TRANSACTIONS */}
          {allMessages.map((message, index) => {
            return (
              <div
                key={index}
                className="w-full p-2 mt-1 text-center text-slate-600 dark:text-white rounded shadow-md"
              >
                <div className="break-all w-full ">
                  <label className="block font-bold">Address:</label>
                  <span>{message.address}</span>
                </div>
                <div className="w-full">
                  <label className="block font-bold">Message:</label>
                  <span>{message.message}</span>
                </div>
                <div className="w-full">
                  <label className="block font-bold">Date:</label>
                  <span>{message.date.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* =========================END OF MAIN CONTENT====================== */}
      <div className="absolute -z-10 bottom-0 inset-x-0 transform-gpu overflow-hidden blur-3xl sm:blur-la">
        <svg
          className="w-full"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".7"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default App;
