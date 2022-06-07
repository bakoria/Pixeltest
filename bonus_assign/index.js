var web3;
var address="0xb0779bDD3db31e79c9993baE879f9b223a96A029";

async function Connect(){
	await window.web3.currentProvider.enable();
	web3=new Web3(window.web3.currentProvider);
}

if(typeof web3 !== 'undefine'){
	web3=new Web3(window.web3.currentProvider);
}
else{
	web3=new Web3(new Web3.Provider.HttpProvider("https://rinkeby.infura.io/v3/"));
}

var abi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sonLimit",
				"type": "uint256"
			}
		],
		"name": "approveAllowance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			}
		],
		"name": "realDeposit",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			}
		],
		"name": "realWithdraw",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_father",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_son",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var contract=new web3.eth.Contract(abi, address);

function allowance(){
	var inputval=document.getElementById("amount").value;
	
	web3.eth.getAccounts().then(function(account){
		return contract.methods.approveAllowance(inputval).send({from: account[0]});
	}).then(function(tmp){
		$("#amount").val("");
		balance();	
	}).catch(function(tmp){
		alert(tmp);
	})
}

function deposit(){
	var inputval=document.getElementById("amount").value;
	
	web3.eth.getAccounts().then(function(account){
		return contract.methods.realDeposit(inputval).send({from: account[0]});
	}).then(function(tmp){
		$("#amount").val("");
		balance();			
	}).catch(function(tmp){
		alert(tmp);
	})
}

function withdraw(){
	var inputval=document.getElementById("amount").value;

	web3.eth.getAccounts().then(function(account){
		return contract.methods.realWithdraw(inputval).send({from: account[0]});
	}).then(function(tmp){
		$("#amount").val("");	
		balance();
	}).catch(function(tmp){
		alert(tmp);
	})
}

function balance(){
	contract.methods.getBalances().call().then(function(value){	
	document.getElementById("balance_0").innerHTML = "Father = " + value[0];
	document.getElementById("balance_1").innerHTML = "Son = " + value[1];
	console.log(value);
	})
}