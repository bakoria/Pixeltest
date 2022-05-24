// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Transaction {

    uint account = 1000;
    address father;
    address son;
    address dauter;
    address anotherChild;

    constructor (address _father, address _son, address _dauter, address _achild) {
        father = _father;
        son = _son;
        dauter = _dauter;
        anotherChild = _achild;
    }
    
    function virtualDeposit(uint _amt) public returns (string memory) {
        require(father == msg.sender, "Only Father deposit the money");
        account += _amt;
        return "Deposit Successful";
    }

    modifier onlyChild() {
        require(son == msg.sender || dauter == msg.sender || anotherChild == msg.sender, 
        "Only Son/Daughter withdraw the money");
        _;
    }

    function virtualWithdraw(uint _amt) public onlyChild() returns (string memory) {
        require(account >= _amt+10, "Insufficient Balance/Minimum balance 10 required");
        account -= _amt;
        return "Withdraw Successful";
    }

    function accountInquiry() public view returns (uint) {
        return account;
    }
}
