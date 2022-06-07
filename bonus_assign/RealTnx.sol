// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract RealTnx {

    address payable father;
    address payable son;
    uint allowance; 
    mapping(address => uint) private balance;
    
    constructor (address payable _father, 
                 address payable _son) {
        father = _father;
        son = _son;
    }

    function approveAllowance(uint _sonLimit) public {
        require(father == msg.sender, "Only Father approve the allowance");
        allowance = _sonLimit;
    }
    
    function realDeposit(uint _amt) public payable returns (string memory) {
        require(father == msg.sender, "Only Father deposit the money");
        balance[father] += _amt;
        return "Deposit Successful";
    }

    modifier onlyChild() {
        require(son == msg.sender, "Only Son withdraw the money");
        _;
    }

    function realWithdraw(uint _amt) public payable onlyChild() returns (string memory) {
        require(balance[father] >= _amt, "Insufficient Balance");
        require(allowance >= _amt, "Allowance limit exhausted");
        balance[father] -= _amt;
        balance[msg.sender] += _amt;
        allowance -= _amt;
        return "Withdraw Successful";
    }

    function getBalances() public view returns (uint, uint) {
        return (balance[father], balance[son]);
    }
}
