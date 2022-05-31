import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

export const useWeb3 = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const [usersCount, setUsersCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState("");
  const [userProducts, setUserProducts] = useState();
  const handleChangeAccount = (account) => {
    setAccount(account[0]);
  };
  window.ethereum.on("accountsChanged", handleChangeAccount);

  const getData = useCallback(async () => {
    setUsers([]);
    await window.ethereum.enable();
    //const localNetwork = new Web3("http://127.0.0.1:7545");
    // const web3 = new Web3(
    //   `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
    // );
    const web3 = new Web3(Web3.givenProvider);

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setContract(contract);

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const products = await contract.methods.getUserProducts(accounts[0]).call();
    setUserProducts(products);
    console.log(products);
    // const usersCountRaw = await contract.methods.getUsersCount().call();
    // setUsersCount(usersCountRaw);

    // localAccounts.forEach(async (account) => {
    //   const userRaw = await contract.methods.users(account).call();
    //   console.log(userRaw);
    //   const user = {
    //     address: account,
    //     name: userRaw.name,
    //     role: userRaw.role,
    //     date: userRaw.date,
    //   };
    //   setUsers((prev) => [...prev, user]);
    // });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { contract, account, userProducts };
};
