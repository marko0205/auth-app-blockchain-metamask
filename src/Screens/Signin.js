import * as React from "react";
import { loadBlockchainData, loadWeb3, signMessage, verifyMessage } from "../Web3helpers";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
	const navigate = useNavigate();

	const [accounts, setAccounts] = React.useState(null);
	const [auth, setAuth] = React.useState(null);

	const loadAccounts = async () => {
		let { auth, accounts } = await loadBlockchainData();
		setAccounts(accounts);
		setAuth(auth);
	};

	const handleGetUsername = async () => {
		try {
			const username = await auth.methods.getUserAndUpdateNonce(accounts).call({ from: accounts });
			return username
		} catch (error) {
			alert(error.message);
		}
	};

	const login = async () => {
		if (!window.web3) {
			return alert("Please install MetaMask to use this DApp");
		}
		try {
			await auth.methods.fetchNonce(accounts).call({ from: accounts }, (error, result) =>  
			{
				if (!error) {
					//console.log("nonce: " + result);

					signMessage(result , accounts ).then(sign => {

						verifyMessage(result, sign, accounts).then(res => {
							if (res===true) {
								handleGetUsername().then(res => {
									localStorage.setItem("username", res);
									localStorage.setItem("account", accounts);
									navigate("/Home");
								})
							}
							else {
								localStorage.setItem("account", "");
								alert("Something went wrong");
							}
						})
					})
				}
				else alert("Account not found, register first!");
			});
		} catch (error) {
			//alert(error.message);
		}
	};

	React.useEffect(() => {
		loadWeb3();
	}, []);

	React.useEffect(() => {
		loadAccounts();
	}, []);


	return (
		<div style={rootDiv}>
		<img
			src="/resources/logo-no-background.png"
			style={image}
			alt="logo"
		/>
		<button style={button} onClick={login}>
			{" "}
			Sign In
		</button>

		<span
			style={{ cursor: "pointer" }}
			onClick={() => {
			if (!window.web3) {
				return alert("Please install MetaMask to use this DApp");
			}
			navigate("/Signup");
			}}
		>
			{" "}
			Create new account{" "}
		</span>
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
