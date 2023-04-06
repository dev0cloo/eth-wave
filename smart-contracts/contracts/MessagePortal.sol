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

    uint256 private seed;
    // create new empty message array from Messages struct
    Messages[] message;

    constructor() payable {
        console.log("Smart contract is being constructed.");

        // set initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    // let users send messages to the contract
    function sendMessage(string memory _message) public {
        console.log("%s has sent a message: %s", msg.sender, _message);
        // log the message to messages array
        message.push(Messages(msg.sender, _message, block.timestamp));

        // Generate a new seed for the next user
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        emit newMessage(msg.sender, _message, block.timestamp);

        // Give a 50% chance that the user wins the prize
        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.00001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Not enough funds in the contract to make this transaction"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw amount from contract");
        }
    }

    // return all messages in contract storage
    function getMessages() public view returns (Messages[] memory) {
        return message;
    }
}
