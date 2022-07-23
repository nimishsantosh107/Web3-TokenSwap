// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./ERC233.sol";

// NERC233 factory
contract NERC233Factory {
    address[] private _deployedTokens;
    mapping(address => string) private _addressToSymbol; // TOKEN_ADDR >> SYMBOL
    mapping(string => address) private _symbolToAddress; // SYMBOL >> TOKEN_ADDR

    function createToken(string memory name, string memory symbol) public {
        NERC233 token = new NERC233(name, symbol);
        address tokenAddress = address(token);
        _deployedTokens.push(tokenAddress);
        _addressToSymbol[tokenAddress] = symbol;
        _symbolToAddress[symbol] =tokenAddress;
    }

    function getTokens() public view returns(address[] memory) {
        return _deployedTokens;
    }

    function getSymbol(address tokenAddress) public view returns(string memory) {
        return _addressToSymbol[tokenAddress];
    }

    function getAddress(string calldata symbol) public view returns(address) {
        return _symbolToAddress[symbol];
    }
}

// NERC223 Receiver Interface
interface NERC233ContractReceiver is ERC233ContractReceiver {
    function tokenAddressFallback( address from, uint value, address tokenAddress ) external;
}

contract NERC233 is ERC223 {
    constructor(string memory name, string memory symbol) ERC223(name, symbol) {}

    // NERC223 Transfer to a contract or externally-owned account
    function transfer(address to, uint value) override public returns (bool success) {
        if (isContract(to)) {
            return transferTokenToContract(msg.sender, to, value);
        }
        bytes memory empty;
        _transfer( msg.sender, to, value, empty );
        return true;
    }

    // NERC223 Transfer from address to a contract or externally-owned account
    function transferFrom(address from, address to, uint256 value) override public returns (bool success) {
        require( value <= allowances_[from][msg.sender] );
        allowances_[from][msg.sender] -= value;

        if (isContract(to)) {
            return transferTokenToContract(from, to, value);
        }
        bytes memory empty;
        _transfer( from, to, value, empty );
        return true;
    }

    // NERC223 Transfer to contract and invoke tokenAddressFallback() method
    function transferTokenToContract(address from, address to, uint value) private returns (bool success) {
        bytes memory empty;
        _transfer( from, to, value, empty );

        NERC233ContractReceiver rx = NERC233ContractReceiver(to);
        rx.tokenAddressFallback(from, value, address(this)); // token address
        return true;
    }

    /*
    TRANSACTIONS:
        mint
        mintTo
        burn
        burnFrom
        approve
        approveAndCall
        safeApprove
        transfer
        transfer
        transferFrom

    CALLS:
        name
        symbol
        totalSupply
        deimals
        allowance
        balanceOf
     */
}