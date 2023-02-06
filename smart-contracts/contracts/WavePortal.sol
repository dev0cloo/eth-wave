// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    // create new event anytime a message is sent with the senders details
    event newMessage(address indexed from, string, uint256 timestamp);
    // create a struct for storing messagers details
    struct Messages {
        address messenger;
        string textMessage;
        uint256 timestamp;
    }
    // create new empty array from Messages struct
    Messages[] message;

    constructor() {
        console.log("Smart contract is being constructed.");
    }

    function sendMessage(string memory _message) public {
        console.log("%s has waved", msg.sender, _message);
        // log the message to messages array
        message.push(Messages(msg.sender, _message, block.timestamp));

        emit newMessage(msg.sender, _message, block.timestamp);
    }

    function getMessages() public view returns (Messages[] memory) {
        return message;
    }
}
