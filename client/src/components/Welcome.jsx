import React from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { Loader } from "./";

const Welcome = () => {
  const connectWallet = () => {};
  const currentAccount = () => {};
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-center items-center  flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1  text-center">
            Send Messages
            <br />
            on the Blockchain
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-center text-gradient ">
            Connect your wallet, win some eth, message us.
          </p>
          {/* change to render this when wallet is connected */}
          {!currentAccount && (
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              You're in! Let's start winning some testnet eth.
            </p>
          )}
          <button
            type="button"
            onClick={connectWallet}
            className="flex border border-solid border-transparent flex-row justify-center items-center my-5 bg-[rgb(103, 29, 153)] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <AiFillPlayCircle className="text-white mr-2" />
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism "></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
