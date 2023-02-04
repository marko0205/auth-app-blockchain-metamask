// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Auth  {
	mapping(address => user) public usersList;

	struct user {
		string username;
		address addr;
		bytes32 nonce;
	}

	// events
//	event userCreated(string username, address _address, bytes32 _nonce );
//	event userFetched(address _address, bytes32 _nonce);

	modifier onlyOwner(address _address) {
    	require(msg.sender == _address);
    	_;
	}
	
	function getUserAndUpdateNonce(address _address) public onlyOwner(_address) returns (string memory) {
		bytes32 newNonce = generateRandomSequence();
		usersList[_address].nonce = newNonce;
		return usersList[_address].username;
	}


	// ideally should be used a RNG contract or an oracle to generate truly random values
	function generateRandomSequence() public view returns (bytes32) {
		return keccak256(abi.encodePacked(block.timestamp, blockhash(block.number - 1)));
	}

	function createUser(string memory _username, address _address, string memory _nonce) public {	
		//userCount++;
		require(usersList[_address].addr != _address, "already registered");
		usersList[_address] = user(_username, _address, keccak256(abi.encodePacked(_nonce)));
	//	emit userCreated(_username, _address, keccak256(abi.encodePacked(_nonce)));
	}

    function fetchNonce(address _address) public view returns (bytes32) {
        //keccak256(abi.encodePacked(...)) è usato per comparare le stringhe e richiede meno gas
        require (usersList[_address].addr == _address);
	//	emit userFetched(_address, usersList[_address].nonce);
		return usersList[_address].nonce;
    }

	function deleteUser(address _address) public onlyOwner(_address) {
		require(usersList[_address].addr == _address, "User not found");
		delete usersList[_address];
	}

}
