// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./NERC223.sol";
import "./NERC223Helper.sol";

contract NERC223Swap is NERC223ContractReceiver {

    string private tokenSymbolLP;
    address payable tokenAddressLP;
    NERC223 private tokenLP;
    NERC223Helper private helper;

    string public poolName;
    mapping(address => mapping(string => uint)) private deposits; // USER_ADDR >> SYMBOL >> AMOUNT

    constructor(string memory _poolName, address _helperAddress, string memory _tokenSymbolLP) {
        poolName = _poolName;
        helper = NERC223Helper(_helperAddress);
        tokenSymbolLP = _tokenSymbolLP;
        tokenAddressLP = payable(helper.getTokenAddress(tokenSymbolLP));
        tokenLP = NERC223(tokenAddressLP);
    }

    function getDeposits(address _user, string calldata _symbol) public view returns(uint) {
        return deposits[_user][_symbol];
    }

    // ERC223 fallback not overridden
    function tokenFallback(address from, uint value, bytes calldata data) external {}

    function tokenAddressFallback(address from, uint value, address tokenAddress, bool swapCall) external {
        _depositToken(from, value, tokenAddress, swapCall);
    }

    ////// gas: 1000000
    // user sending money to deposit to contract initiates a callback
    // contract registers deposit into user's account
    // contract mints LP token to user.
    function _depositToken(address _from, uint _value, address _tokenAddress, bool swapCall) private {
        // deposit to contract (++ valueIn)
        string memory _symbol = helper.getTokenSymbol(_tokenAddress);
        deposits[_from][_symbol] += _value;
        // mint LP token to user
        if (!swapCall) {
            tokenLP.mintTo(_from, _value);
        }
    }

    // withdrawing: user has to approve contract to use `value` worth LP tokens
    // contract can send user `value` worth deposited symbol
    // contract burns LP token from user
    function withdrawToken(string calldata _symbol, uint _value) public {
        _withdrawToken(_symbol, _value, false);
    }
    function _withdrawToken(string calldata _symbol, uint _value, bool swapCall) private {
        // checks
        require(helper.getTokenBalance(address(this), _symbol) > _value);
        require(deposits[msg.sender][_symbol] >= _value);
        require(tokenLP.allowance(msg.sender, address(this)) >= _value);
        // update local values
        deposits[msg.sender][_symbol] -= _value;
        // transfer out to user
        address payable _tokenAddress = payable(helper.getTokenAddress(_symbol));
        NERC223 token = NERC223(_tokenAddress);
        token.transfer(msg.sender, _value);
        // burn LP token from user
        if (!swapCall) {
            tokenLP.burnFrom(msg.sender, _value);
        }
    }

    // user has to approve contract to pull `valueIn`
    // contract can send user `valueOut`
    // swap calls 2 transferFrom() (USER > CONTRACT, CONTRACT > USER)
    function swapTokens(string calldata _symbolIn, string calldata _symbolOut, uint _valueIn, uint _valueOut) external {
        address payable _tokenAddressIn = payable(helper.getTokenAddress(_symbolIn));
        NERC223 tokenIn = NERC223(_tokenAddressIn);
        // checks
        // how to make sure valueOut isn't corrupted (ie user isnt cheated)
        require(tokenIn.allowance(msg.sender, address(this)) >= _valueIn);
        require(helper.getTokenBalance(address(this), _symbolOut) >= _valueOut);
        // swap
        tokenIn._transferFrom(msg.sender, address(this), _valueIn, true); // _symbolIn += _valueIn, swapCall = true
        // tokenAddressFallback > depositToken(_symbol1, valueIn) ^ ABOVE LINE ^
        deposits[msg.sender][_symbolIn] -= _valueIn;
        deposits[msg.sender][_symbolOut] += _valueOut;
        _withdrawToken(_symbolOut, _valueOut, true); // _symbolOut += _valueOut, swapCall = true
    }
}