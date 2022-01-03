import { useEffect, useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const hasCode = (code: unknown): code is { code: number } =>
  !!(typeof code === "object" && code && "code" in code);

export const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          const [account] = await window.ethereum
            // @ts-ignore
            .request({ method: "eth_requestAccounts" });
          // @ts-ignore
          ethereum.on("accountsChanged", (accounts: string[]) => {
            console.log(accounts);
          });
          setAccount(account);
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        }
      } catch (error) {
        if (hasCode(error) && error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    };
    connect();
  }, []);

  return {
    account,
  };
};
