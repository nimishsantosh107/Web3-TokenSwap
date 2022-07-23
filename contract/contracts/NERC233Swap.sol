// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./NERC233.sol";
import "./NERC233Helper.sol";

contract NERC233Swap is NERC233ContractReceiver {
    NERC233Helper private helper;
    string private tokenSymbolLP;

    string public poolName;
    mapping(address => mapping(string => uint)) private deposits; // USER_ADDR >> SYMBOL >> AMOUNT

    constructor(string memory _poolName, address _helperAddress, string memory _tokenSymbolLP) {
        poolName = _poolName;
        helper = NERC233Helper(_helperAddress);
        tokenSymbolLP = _tokenSymbolLP;
    }

    function getDeposits(address _user, string calldata _symbol) public view returns(uint) {
        return deposits[_user][_symbol];
    }

    // ERC233 fallback not overridden
    function tokenFallback(address from, uint value, bytes calldata data) external {}

    function tokenAddressFallback(address from, uint value, address tokenAddress) external {
        depositToken(from, value, tokenAddress);
    }

    // user sending money to deposit to contract initiates a callback
    // contract registers deposit into user's account
    // contract mints LP token to user.
    function depositToken(address _from, uint _value, address _tokenAddress) private {
        // deposit to contract (++ valueIn)
        string memory _symbol = helper.getTokenSymbol(_tokenAddress);
        deposits[_from][_symbol] += _value;
        // mint LP token to user
        helper.mintToken(_from, tokenSymbolLP, _value);
    }

    // withdrawing: user has to approve contract to use `value` worth LP tokens
    // contract can send user `value` worth deposited symbol
    // contract burns LP token from user
    function withdrawToken(string calldata _symbol, uint _value) public {
        address payable _tokenAddressLP = payable(helper.getTokenAddress(tokenSymbolLP));
        NERC233 tokenLP = NERC233(_tokenAddressLP);
        // checks
        require(helper.getTokenBalance(address(this), _symbol) > _value);
        require(deposits[msg.sender][_symbol] >= _value);
        require(tokenLP.allowance(msg.sender, address(this)) >= _value);
        // update local values
        deposits[msg.sender][_symbol] -= _value;
        // transfer out to user
        address payable _tokenAddress = payable(helper.getTokenAddress(_symbol));
        NERC233 token = NERC233(_tokenAddress);
        token.transfer(msg.sender, _value);
        // burn LP token from user
        helper.burnToken(msg.sender, tokenSymbolLP, _value);
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