import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetamaskAccounts = async () => {
  try {
    const ethereum = getEthereumObject();

    // check if metamask is installed
    if (!ethereum) {
      console.error("Make sure you have metamask installed!");
      return null;
    }

    console.log("We have the ethereum object", ethereum);

    // get accounts
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // use the first account if it exists
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();

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

  //
  useEffect(() => {
    async () => {
      const account = await findMetamaskAccounts();
      if (account !== null) {
        setCurrentAccount(account);
      }
    };
  }, []);

  return (
    <div className="isolate bg-white dark:bg-gray-900 h-screen flex">
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
          <h1 className="header text-slate-600 dark:text-slate-200 text-center text-2xl font-bold">
            👋 Hey there!
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-center">
            I am Etornam and I write smart contracts. That's pretty cool, right?
            Connect your Ethereum wallet and send me a message!
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
          <button className="btn shadow-md transition-all duration-300 ease-in bg-200 bg-btngrad flex justify-center text-white min-w-[60%] text-xl p-4 rounded mt-4 hover:bg-center hover:shadow-2xl hover:bg-right">
            Contact Me
          </button>
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
