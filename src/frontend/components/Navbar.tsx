import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@quaantum/components";
import React from "react";
import { useWeb3 } from "../utils/hooks/useWeb3";
import { Link as RouterLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { account } = useWeb3();
  return (
    <>
      <Flex
        bgColor="#222222"
        c="#fff"
        p="20px"
        justify="space-between"
        align="center"
      >
        <Flex align="center" gap="20px">
          {/** @ts-ignore */}
          <Link as={RouterLink} to="/">
            <Heading color="#ffffff">EthMarketplace</Heading>
          </Link>
          <UnorderedList>
            <ListItem>
              {/** @ts-ignore */}
              <Link as={RouterLink} to="/sell">
                Sell
              </Link>
            </ListItem>
          </UnorderedList>
        </Flex>

        {account}
      </Flex>
      <Box p="20px">{children}</Box>
    </>
  );
};

export default Navbar;
