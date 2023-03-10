// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract MessagePortal {
    // create new event anytime a message is sent with the senders details
    event newMessage(address indexed from, string, uint256 timestamp);
    // create a struct for storing messengers details
    struct Messages {
        address messenger;
        string textMessage;
        uint256 timestamp;
    }
    // create new empty message array from Messages struct
    Messages[] message;

    constructor() payable {
        console.log("Smart contract is being constructed.");
    }

    // let users send messages to the contract
    function sendMessage(string memory _message) public {
        console.log("%s has sent a message: %s", msg.sender, _message);
        // log the message to messages array
        message.push(Messages(msg.sender, _message, block.timestamp));

        emit newMessage(msg.sender, _message, block.timestamp);

        uint256 prizeAmount = 0.1 ether;
        require(
            prizeAmount <= address(this).balance,
            "Not enough funds in the contract to make this transaction"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw amount from contract");
    }

    // return all messages in contract storage
    function getMessages() public view returns (Messages[] memory) {
        return message;
    }
}
