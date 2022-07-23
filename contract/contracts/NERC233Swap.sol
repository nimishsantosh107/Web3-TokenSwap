// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./NERC233.sol";
import "./NERC233Helper.sol";

contract NERC233Swap is NERC233ContractReceiver {
    NERC233Helper private helper;
    string public poolName;
    mapping(address => mapping(string => uint)) private deposits; // USER_ADDR >> SYMBOL >> AMOUNT

    constructor(string memory _poolName, address _helperAddress) {
        poolName = _poolName;
        helper = NERC233Helper(_helperAddress);
    }

    function getDeposits(address _user, string calldata _symbol) public view returns(uint) {
        return deposits[_user][_symbol];
    }

    // ERC233 fallback not overridden
    function tokenFallback(address from, uint value, bytes calldata data) external {}

    function tokenAddressFallback(address from, uint value, address tokenAddress) external {
        depositToken(from, value, tokenAddress);
    }

    function depositToken(address _from, uint _value, address _tokenAddress) private {
        string memory _symbol = helper.getTokenSymbol(_tokenAddress);
        deposits[_from][_symbol] += _value;
    }

    function withdrawToken(string calldata _symbol, uint _value) public {
        // checks
        require(helper.getTokenBalance(address(this), _symbol) > _value);
        require(deposits[msg.sender][_symbol] >= _value);
        // update local values
        deposits[msg.sender][_symbol] -= _value;
        // transfer out to user
        address payable _tokenAddress = payable(helper.getTokenAddress(_symbol));
        NERC233 token = NERC233(_tokenAddress);
        token.transfer(msg.sender, _value);
    }

    // user has to approve contract to pull `valueIn`
    // contract can send user `valueOut`
    // swap calls 2 transferFrom() (USER > CONTRACT, CONTRACT > USER)
    function swapTokens(string calldata _symbolIn, string calldata _symbolOut, uint _valueIn, uint _valueOut) external {
        address payable _tokenAddressIn = payable(helper.getTokenAddress(_symbolIn));
        NERC233 tokenIn = NERC233(_tokenAddressIn);
        // checks
        // how to make sure valueOut isn't corrupted (ie user isnt cheated)
        require(tokenIn.allowance(msg.sender, address(this)) >= _valueIn);
        require(helper.getTokenBalance(address(this), _symbolOut) >= _valueOut);
        // swap
        tokenIn.transferFrom(msg.sender, address(this), _valueIn); // _symbolIn += _valueIn
        // tokenAddressFallback > depositToken(_symbol1, valueIn) ^ ABOVE LINE ^
        deposits[msg.sender][_symbolIn] -= _valueIn;
        deposits[msg.sender][_symbolOut] += _valueOut;
        withdrawToken(_symbolOut, _valueOut); // _symbolOut += _valueOut
    }
}