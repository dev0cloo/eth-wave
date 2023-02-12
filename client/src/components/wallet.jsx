import { getAllMessages } from "./messages";
import { useState } from "react";
/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */

export const checkIfWalletIsConnected = async () => {
  try {
    // deconstruct ethereum object. same as ethereum = window.ethereum
    const { ethereum } = window;

    // check if metamask is installed
    if (!ethereum) {
      console.error("Make sure you have metamask installed!");
      return null;
    }

    console.log("We have the ethereum object", ethereum);

    // get accounts
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    // use the first account if it exists
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }

    // getAllMessages();
  } catch (error) {
    console.error(error);
    return null;
  }
};
