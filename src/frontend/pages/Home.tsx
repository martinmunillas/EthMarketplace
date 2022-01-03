import { Button, Flex, Text } from "@quaantum/components";
import React from "react";
import { Product, useMarketplace } from "../utils/hooks/useMarketplace";
import { useWeb3 } from "../utils/hooks/useWeb3";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { products, marketplace } = useMarketplace();
  const { account } = useWeb3();

  const handleBuy = (product: Product) => {
    marketplace?.methods
      .purchaseProduct(product.id)
      .send({ from: account, value: product.price })
      .catch(console.error);
  };

  return (
    <>
      {products.map((product) => (
        <Flex key={product.id} gap="20px">
          <Text>{product.id}</Text>
          <Text>{product.name}</Text>
          <Text>{product.owner}</Text>
          <Text>{window.web3.utils.fromWei(product.price, "ether")} eth</Text>
          <Button onClick={() => handleBuy(product)}>Buy</Button>
        </Flex>
      ))}
    </>
  );
};

export default Home;
