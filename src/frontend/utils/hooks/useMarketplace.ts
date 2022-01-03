import { useState } from "react";
import Marketplace from "../../../abis/Marketplace.json";
import { useAsyncEffect } from "./useAsyncEffect";
import type Web3 from "web3";
import { useWeb3 } from "./useWeb3";

type Contract = InstanceType<Web3["eth"]["Contract"]>;

export interface Product {
  id: number;
  name: string;
  price: number;
  owner: string;
}

export const useMarketplace = () => {
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marketplace, setMarketplace] = useState<Contract | null>(null);

  useWeb3();

  useAsyncEffect(async () => {
    setLoading(true);
    const chainId = parseInt(
      await window.ethereum.request({
        method: "eth_chainId",
      }),
      16
    ).toString() as keyof typeof Marketplace["networks"];
    const network = Marketplace.networks[chainId];
    const abi = Marketplace.abi;
    if (network) {
      // @ts-ignore
      const marketplace = new window.web3.eth.Contract(abi, network.address);
      setMarketplace(marketplace);
      const count = await marketplace.methods.productCount().call();
      setProductCount(count);

      const products = await Promise.all(
        Array.from({ length: count }, (_, i) =>
          marketplace.methods.products(i + 1).call()
        )
      );
      setProducts(products);
    } else {
      setError("Marketplace contract not deployed to this network.");
    }
    setLoading(false);
  }, []);

  return {
    productCount,
    products,
    loading,
    error,
    marketplace,
  };
};
