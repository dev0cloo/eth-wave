import { useState } from "react";
import { ethers } from "ethers";

export const getAllMessages = async (contractAddress, contractABI) => {
  // function to get all messages from the contract
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
      // fetch the messages in the contract
      let messages = await messagePortalContract.getMessages();

      let messagesParsed = [];
      // loop through messages and extract the address, messages and timestamps
      messages.forEach((message) => {
        messagesParsed.push({
          address: message.messenger,
          message: message.textMessage,
          date: new Date(message.timestamp * 1000),
        });
      });
      console.log("messagesParsed:", messagesParsed);
      return messagesParsed;
    }
  } catch (error) {
    console.log(error);
  }
};
