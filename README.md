# Dapp - Metamask authentication 
#### University project for Data Security course

## Project Description

Design and develop a decentralized application which allow the user to register and login an account, allowing him to authenticate with a single click, without having to remember and enter the classic login credentials. This app implements features such as Sing-in with Google, Facebook, Apple... but in a completely decentralized context. It use the metamask extension to interact with the ethereum blockchain.

 A short video show the workflow:

<img src="assets/demo.gif" width="300" height="300" alt="demo">

## Requirement

First of all you need to install nodejs (developed and tested with v16):

```
$ sudo apt install nodejs
```

Then you can install the Etherium simulator Ganache:

```
$ npm install ganache --global
```

Finally install Truffle suite which is a development environment for Smart Contracts:

```
$ npm install -g truffle
```

## Usage

Don't forget to run ganache in background on the port 7545, from the UI or with the command: 
```
$ ganache-cli -p 7545
```

Now you can download the project repository with git, go into the root project folder and install the dependencies with the command:

```
$ npm install 
```

Once finished go into the /scr folder, compile and upload the Smart Contracts on Ganache:

```
$ truffle migrate
```

Then you can also test the SmartContract function with the command:

```
$ truffle test
```

Now you can start the nodejs App and interact with it available at localhost on the port 3000
```
$ npm run start
```

## Smart Contract description

The Solidity contract Auth contains the following methods:

- **createUser**: allows users to create an account
- **fetchNonce**: recover the nonce associated to an user for the login purpose 
- **getUserAndUpdateNonce**: get the data of an user
- **generateRandomSequence**: generate a new nonce value for an user after the login
- **deleteUser**: allow an user to delete his account



## License

MIT

**Free Software, Hell Yeah!**

