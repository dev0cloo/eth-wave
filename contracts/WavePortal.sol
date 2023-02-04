// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;

    constructor() { console.log('I am a simple smart contract');         
    }

    function wave () public {
        totalWaves += 1 ;
        console.log('%s has waved', msg.sender);
    }

    function getWave () public view returns (uint256){
        console.log ('We have %d waves', totalWaves);
        return totalWaves;
    }
}