import Web3 from "web3/dist/web3.min.js";
import Auth from "./build/contracts/Auth.json";
// Used to perfrom signature authentication

import { bufferToHex} from "ethereumjs-util";
import { recoverPersonalSignature } from 'eth-sig-util';

export const loadWeb3 = async () => {
	// Modern dapp browsers...
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		try {
			// Request account access
			await window.ethereum.request({ method: "eth_requestAccounts" });;
		} catch (error) {
			// User denied account access...
			console.error("User denied account access")
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		window.web3  = window.web3.currentProvider;
	}
	// If no injected web3 instance is detected, fall back to Ganache
	else {
		window.web3  = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	//var web3 = new Web3(window.web3);

	if (!window.web3) {
		alert("Please install MetaMask to use this DApp");
	}
};
	

export const loadBlockchainData = async () => {
	const web3 = window.web3;
	// Load account
	const accounts = await web3.eth.getAccounts();
	// Network ID
	const networkId = await web3.eth.net.getId();

	// Network data
	if (networkId) 
	{
		const auth = new web3.eth.Contract( Auth.abi, Auth.networks[networkId].address);
		return { auth, accounts: accounts[0] };
	}
};


export const signMessage = async ( message, from ) => {
	//console.log(message)
	try {
		const sign = await window.ethereum.request({
			method: 'personal_sign',
			params: [message, from, ''],
		});
		return sign
	} catch (err) {
		console.error(err)
	}
  };
  
export const verifyMessage = async ( nonce, sign, from) => {
	
	const msg = nonce;

	// We now are in possession of msg, publicAddress and signature. We
	// will use a helper from eth-sig-util to extract the address from the signature
	const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));

	const address = recoverPersonalSignature({
		data: nonce,
		sig: sign,
	});

	// The signature verification is successful if the address found with
	// sigUtil.recoverPersonalSignature matches the initial publicAddress

	if (address.toLowerCase() === from.toLowerCase()) {
		return true;
	} else {
		return false;
	}
};

