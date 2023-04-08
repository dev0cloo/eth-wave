import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./utils/MessagePortal.json";
import "./App.css";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { checkIfWalletIsConnected, getAllMessages } from "./components";
import { SvgBackground2 as Background2 } from "./components/svgs/Background2.jsx";
import { SvgBackg as Background } from "./components/svgs/Background.jsx";

const App = () => {
  // register Swiper custom elements
  register();
  // react hooks for dynamic events
  const [currentAccount, setCurrentAccount] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  // const [isConnected, setIsConnected] = useState[null];

  // the contract location on the blockchain
  const contractAddress = "0xEb2f5a39783801A4eCb719d798cd3218b8Be7a0d";
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
        <Background />
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
          {/* {allMessages.map((message, index) => {
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
          })} */}
        </div>
      </div>
      {/* =========================END OF MAIN CONTENT====================== */}
      <div className="absolute -z-10 bottom-0 inset-x-0 transform-gpu overflow-hidden blur-3xl sm:blur-la"></div>
    </div>
  );
};

export default App;
