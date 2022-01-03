import { Button, Flex, Input, Text } from "@quaantum/components";
import React, { FormEventHandler, useState } from "react";
import { useMarketplace } from "../utils/hooks/useMarketplace";
import { useWeb3 } from "../utils/hooks/useWeb3";

interface SellProductProps {}

interface Product {
  name: string;
  price: string;
}

const SellProduct: React.FC<SellProductProps> = ({}) => {
  const [product, setProduct] = useState<Product>({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const { account } = useWeb3();
  const { marketplace } = useMarketplace();

  if (!marketplace) {
    return <Text>Markeplace contract hasn't been deployed to his network</Text>;
  }
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    marketplace.methods
      .createProduct(
        product.name,
        window.web3.utils.toWei(product.price, "ether")
      )
      .send({ from: account })
      .once("receipt", () => {
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <Input
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, ["name"]: e.target.value })}
      />
      <Input
        placeholder="Price in eth"
        onChange={(e) => setProduct({ ...product, ["price"]: e.target.value })}
      />
      <Button type="submit">Sell</Button>
    </Flex>
  );
};

export default SellProduct;
