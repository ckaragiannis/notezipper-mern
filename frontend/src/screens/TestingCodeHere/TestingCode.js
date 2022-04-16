import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import { useDispatch, useSelector } from "react-redux";
import {
	getMoreUsdc,
	getUsdcBalance,
	sendTransferUsdc,
} from "../../actions/userActions";

const TestingCode = () => {
	const [senderAddress, setSenderAddress] = useState(
		"0x7ab0af2157221d0f199c4ad1f12039044408bc5e"
	);
	const [receiverAddress, setReceiverAddress] = useState(
		"0x2bFDac30a4D61C6335aB3a17F0325F9E77055308"
	);
	const [amount, setAmount] = useState("0.00");

	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log(userLogin.userInfo.token);

	const usdcBalance = useSelector((state) => state.usdcBalance);
	const { loading, error, success, usdcInfo } = usdcBalance;
	// console.log(usdcBalance);

	const transferUsdc = useSelector((state) => state.transferUsdc);
	const {
		loading: loadingTransfer,
		error: errorTransfer,
		success: successTransfer,
		usdcTransferInfo,
	} = transferUsdc;

	const mintMoreUsdc = useSelector((state) => state.mintMoreUsdc);
	const {
		loading: loadingMintMore,
		error: errorMintMore,
		success: successMintMore,
		mintMoreInfo,
	} = mintMoreUsdc;

	console.log("TestingCode->userLogin is:");
	console.log(userLogin);
	console.log("TestingCode->usdcBalance is:");
	console.log(usdcBalance);
	console.log("TestingCode->transferUsdc is:");
	console.log(transferUsdc);
	console.log("TestingCode->mintMoreUsdc is:");
	console.log(mintMoreUsdc);

	// console.log("USDC INFO IS: ", usdcInfo);
	// console.log("USDC TRANSFER IS: ", transferUsdc);
	// console.log("MINT MORE USDC IS: ", mintMoreInfo);

	useEffect(() => {
		dispatch(getUsdcBalance());
		console.log("USEEFFECT RAN");
		if (!userInfo) {
			navigate("/");
		}
	}, [dispatch, navigate, userInfo, successMintMore, successTransfer]);

	const mintMoreHandler = async (e) => {
		e.preventDefault();
		console.log("1... CLICKED THE minMoreHandler button");
		await dispatch(getMoreUsdc({ senderAddress }));
		console.log(
			"2... FINISHED waiting for getMoreUsdc, now calling getUsdcBalance"
		);
		await dispatch(getUsdcBalance()); // Update the current balance of the senderAccount await the sendTransferUsdc function first
		console.log("3... FINISHED getUsdcBalance call ");
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log("IN TRANSFER USDC submit handler: ", receiverAddress);
		// console.log("IN TRANSFER USDC submit handler: ", senderAddress);
		if (
			window.confirm(
				`Are you sure you want to transfer ${amount} usdc now`
			)
		) {
			console.log("1... START");
			await dispatch(
				sendTransferUsdc({ senderAddress, receiverAddress, amount })
			);
			console.log("2... PROCESSING");
			await dispatch(getUsdcBalance()); // Update the current balance of the senderAccount await the sendTransferUsdc function first
			console.log("3... DONE");
		}
	};

	return (
		<MainScreen
			title={"Welcome Back " + (userInfo ? userInfo.name : "UNKNOWN")}
		>
			<div>
				<div className="container mt-">
					<div className="d-flex min-vh-100 justify-content-center align-items-center">
						<section className="border rounded p-4 py-5 shadow">
							<div>
								<div
									className="card text-light bg-dark p-4"
									style={{ width: "400px" }}
								>
									<p className="m-0 p-0">You have:</p>
									<div className="d-flex">
										<h3
											className="fw-bold mt-1"
											id="usdcBalance"
										>
											{usdcInfo && usdcInfo.usdcBalance}
										</h3>
										<small
											className="fw-light mt-1 ms-1 py-2"
											id="contractName"
										>
											USDC
										</small>
									</div>
									<div className="mt-3">
										<small
											className="bg-light text-muted text-lowercase p-2 px-3 rounded-pill"
											id="userAddress"
										>
											{senderAddress}
										</small>
									</div>
								</div>
								<p className="card-text mt-3 d-none">
									visit <a href="mint-usdc.html">here</a> to
									mint usdc
								</p>
							</div>
							<div className="mt-4">
								<h5 className="fw-bold">Transfer Usdc</h5>
								<div
									className="alert alert-info mt-2"
									id="transferResponse"
									style={{ display: "none" }}
								></div>

								<Form onSubmit={submitHandler}>
									{loading && <Loading />}
									{loadingTransfer && <Loading />}
									{loadingMintMore && <Loading />}
									{success && (
										<ErrorMessage variant="success">
											Sender Address: <br />
											{senderAddress}
											<br />
											Current Balance:{" "}
											{usdcInfo.usdcBalance} USDC
										</ErrorMessage>
									)}
									{successTransfer && (
										<ErrorMessage variant="success">
											Successfully sent{" "}
											{usdcTransferInfo.amount} USDC from:{" "}
											<br />
											Sender Address: <br />
											{usdcTransferInfo.senderAddress}
											<br />
											To: <br />
											Receiver Address: <br />
											{
												usdcTransferInfo.receiverAddress
											}{" "}
											<br />
											Transaction Hash: <br />
											<small>
												<a
													target="_new"
													href={
														"https://ropsten.etherscan.io/tx/" +
														usdcTransferInfo.txHash
													}
												>
													{usdcTransferInfo.txHash}
												</a>
											</small>
										</ErrorMessage>
									)}
									{successMintMore && (
										<ErrorMessage variant="success">
											Minted {mintMoreInfo.amountAdded}{" "}
											USDC just now <br />
											Current Balance:{" "}
											{usdcInfo?.usdcBalance} USDC
										</ErrorMessage>
									)}
									{error && (
										<ErrorMessage variant="danger">
											{error}
										</ErrorMessage>
									)}
									{errorTransfer && (
										<ErrorMessage variant="danger">
											{errorTransfer}
										</ErrorMessage>
									)}
									{errorMintMore && (
										<ErrorMessage variant="danger">
											{errorMintMore}
										</ErrorMessage>
									)}
									<Form.Group controlId="receiverAddress">
										<Form.Label>
											Receivers Address:
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Receivers Address"
											value={receiverAddress}
											onChange={(e) =>
												setReceiverAddress(
													e.target.value
												)
											}
										></Form.Control>
									</Form.Group>
									<Form.Group controlId="amountt">
										<Form.Label>Amount:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Amount"
											value={amount}
											onChange={(e) =>
												setAmount(e.target.value)
											}
										></Form.Control>
									</Form.Group>
									<br></br>
									<Button type="submit" varient="primary">
										Continue
									</Button>
									&nbsp;&nbsp;&nbsp;
									<Button
										onClick={mintMoreHandler}
										varient="secondary"
									>
										Mint 10 USDC
									</Button>
								</Form>
							</div>
						</section>
					</div>
				</div>
				<script
					src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
					type="application/javascript"
				></script>
			</div>
		</MainScreen>
	);
};

export default TestingCode;
