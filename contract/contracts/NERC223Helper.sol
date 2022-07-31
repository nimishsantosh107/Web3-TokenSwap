// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./NERC223.sol";

/*
WORKS ONLY WITH `NERC223` TOKENS
*/
contract NERC223Helper {
    mapping(string => address) private tokenSymbolToAddress;
    mapping(address => string) private tokenAddressToSymbol;

    /* MAP SYMBOLS TO TOKEN ADDRESS */
    function getTokenAddress(string calldata _symbol) public view returns(address){
        return tokenSymbolToAddress[_symbol];
    }

    function getTokenSymbol(address _tokenAddress) public view returns(string memory){
        return tokenAddressToSymbol[_tokenAddress];
    }

    function setTokenAddress(string calldata _symbol, address _tokenAddress) public {
        tokenSymbolToAddress[_symbol] = _tokenAddress;
        tokenAddressToSymbol[_tokenAddress] = _symbol;
    }

    /* GET BALANCE */
    function getTokenBalance(address _account, string calldata _symbol) public view returns (uint) {
        address payable tokenAddress = payable(tokenSymbolToAddress[_symbol]);
        require(tokenAddress != address(0), "SET TOKEN FIRST");
        return _getTokenBalance(_account, tokenAddress);
    }

    function _getTokenBalance(address _account, address payable _tokenAddress) public view returns(uint) {
        NERC223 token = NERC223(_tokenAddress); // address not new init params
        return token.balanceOf(_account);
    }

    /* MINT TOKEN */
    function _mintToken(address _account, address payable _tokenAddress, uint _amount) public {
        NERC223 token = NERC223(_tokenAddress);
        token.mintTo(_account, _amount);
    }

    function mintToken(address _account, string calldata _symbol, uint _amount) public {
        address payable tokenAddress = payable(tokenSymbolToAddress[_symbol]);
        require(tokenAddress != address(0), "SET TOKEN FIRST");
        return _mintToken(_account, tokenAddress, _amount);
    }

    /* BURN TOKEN */
    function _burnToken(address _account, address payable _tokenAddress, uint _amount) public {
        NERC223 token = NERC223(_tokenAddress);
        token.burnFrom(_account, _amount);
    }

    function burnToken(address _account, string calldata _symbol, uint _amount) public {
        address payable tokenAddress = payable(tokenSymbolToAddress[_symbol]);
        require(tokenAddress != address(0), "SET TOKEN FIRST");
        return _burnToken(_account, tokenAddress, _amount);
    }
}