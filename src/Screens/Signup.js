import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const [username, setUsername] = React.useState("");
	const navigate = useNavigate();

	const [accounts, setAccounts] = React.useState(null);
	const [auth, setAuth] = React.useState(null);

	const loadAccounts = async () => {
		let { auth, accounts } = await loadBlockchainData();
		setAccounts(accounts);
		setAuth(auth);
};

const signUp = async () => {

	const nonce = makeid(6)

	console.log("address: "+ accounts)
	console.log(nonce)

	if (!username) {
		alert("please insert atleast the Nick!");
		return;
	}

	try {
		await auth.methods
		.createUser(username, accounts, nonce)
		.send({ from: accounts });
		alert("Successfull registration!");
		localStorage.setItem("username", username);
		navigate("/");
	} catch (e) {
		alert("This address is already registered!");
	}
};
React.useEffect(() => {
	loadWeb3();
}, []);

React.useEffect(() => {
	loadAccounts();
}, []);


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

return (
	<div style={rootDiv}>
	<img
		src="/resources/logo-no-background.png"
		style={image}
		alt="logo"
	/>
	<input
		style={input}
		value={username}
		onChange={(e) => setUsername(e.target.value)}
		placeholder="Username"
		type="text"
	/>
	<button style={button} onClick={signUp}>
		{" "}
		Sign Up
	</button>
	</div>
);
}

const rootDiv = {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
height: "100vh",
};

const input = {
width: 300,
padding: 10,
margin: 10,
borderRadius: 10,
outline: "none",
border: "2px solid grey",
fontSize: 17,
};

const button = {
width: 325,
padding: 10,
borderRadius: 10,
margin: 10,
cursor: "pointer",
fontSize: 17,
color: "white",
backgroundColor: "#9D27CD",
border: "none",
};

const image = { 
width: 130,
height: 130,
objectFit: "contain",
borderRadius: 70,
};
