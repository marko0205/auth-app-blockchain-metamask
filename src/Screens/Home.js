import * as React from "react";
import { useNavigate } from "react-router-dom";
import Blockies from 'react-blockies';
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

export default function Home() {
    const [username, setUsername] = React.useState("");
    const [account, setAccount] = React.useState("");

    const navigate = useNavigate();
    const [auth, setAuth] = React.useState(null);

	const loadAccounts = async () => {
		let { auth, accounts } = await loadBlockchainData();
		//setAccounts(accounts);
		setAuth(auth);
	};

    React.useEffect(() => {
        const nick= localStorage.getItem("username")
        const addr= localStorage.getItem("account")
        if (nick===null)
            navigate("/");
        setUsername(nick);
        setAccount(addr)

    }, [username, account]);

    const handleLogout = React.useCallback(() => {
        resetUser()
        navigate("/");
    }, [username, account]);

    const resetUser = () => {
        setUsername("")
        setAccount("")
        localStorage.removeItem("username");
        localStorage.removeItem("account");
    }

    const delete_user = async () => {
		try {
			await auth.methods.deleteUser(account).send({ from: account }, (error, result) =>  
			{
				if (!error) {
                    alert("Account successfully deleted!");
                    handleLogout();
				}
				else alert("Account does not exist!");
			});
		} catch (error) {
			alert(error.message);
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
			<p>
                Logged in as <Blockies seed={account} />
			</p>
			<div>
				My username is {username ? <pre>{username}</pre> : 'not set.'}{' '}
				My publicAddress is <pre>{account}</pre>
			</div>

            <span
                style={{ cursor: "pointer", color: "red"}}
                onClick={() => {
                    delete_user();
                }}
            >
                {" "}
                Delete account{" "}
		    </span>
			
			<p>
                <button
                    style={button}
                    onClick={handleLogout}
                >
                    Log out
                </button>
			</p>
		</div>
	);
}


const button = {
width: 100,
padding: 10,
borderRadius: 5,
margin: 10,
cursor: "pointer",
fontSize: 17,
color: "white",
backgroundColor: "#9D27CD",
border: "none",
};

const rootDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    lineHeight: 1.5,
};
