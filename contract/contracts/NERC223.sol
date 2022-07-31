// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./ERC223.sol";

// NERC223 factory
contract NERC223Factory {
    address[] private _deployedTokens;
    mapping(address => string) private _addressToSymbol; // TOKEN_ADDR >> SYMBOL
    mapping(string => address) private _symbolToAddress; // SYMBOL >> TOKEN_ADDR

    function createToken(string memory name, string memory symbol) public {
        NERC223 token = new NERC223(name, symbol);
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
interface NERC223ContractReceiver is ERC223ContractReceiver {
    function tokenAddressFallback( address from, uint value, address tokenAddress, bool swapCall ) external;
}

contract NERC223 is ERC223 {
    constructor(string memory name, string memory symbol) ERC223(name, symbol) {}

    // NERC223 Transfer to a contract or externally-owned account
    function transfer(address to, uint value) override public returns (bool success) {
        if (isContract(to)) {
            return _transferTokenToContract(msg.sender, to, value, false);
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
            return _transferTokenToContract(from, to, value, false);
        }
        bytes memory empty;
        _transfer( from, to, value, empty );
        return true;
    }

    // NERC223 Transfer from address to a contract or externally-owned account 
    // (with internal call flag which enables minting LP)
    function _transferFrom(address from, address to, uint256 value, bool swapCall) public returns (bool success) {
        require( value <= allowances_[from][msg.sender] );
        allowances_[from][msg.sender] -= value;

        if (isContract(to)) {
            return _transferTokenToContract(from, to, value, swapCall);
        }
        bytes memory empty;
        _transfer( from, to, value, empty );
        return true;
    }

    // NERC223 Transfer to contract and invoke tokenAddressFallback() method
    function _transferTokenToContract(address from, address to, uint value, bool swapCall) private returns (bool success) {
        bytes memory empty;
        _transfer( from, to, value, empty );

        NERC223ContractReceiver rx = NERC223ContractReceiver(to);
        rx.tokenAddressFallback(from, value, address(this), swapCall); // token address
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