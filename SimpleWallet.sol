// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SimpleWallet {

    
    mapping(address => uint) private bal;

    function transferMoney(address to, uint amount) public returns(string memory){
         if (bal[msg.sender] >= amount) {
            bal[msg.sender] -= amount;
            bal[to] += amount;
            return "Transfer Sucessful";
        }    
        else
            return "transfer failed: Insuficient Funds";       
    }   

    function getBalance() public view returns(uint){
            return bal[msg.sender];
    }   

    function creditAmount(uint amt) public returns(uint){
            bal[msg.sender] += amt;
            return bal[msg.sender];
    }

    function getBalanceof(address caller) public view returns(uint){
            return bal[caller];
    }

    function debitAmount(uint amt) public returns(uint){
            bal[msg.sender] -= amt;
            return bal[msg.sender];
    }

}
