// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Marketplace {
    string public name;
    uint256 public productCount;
    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner;
    }

    event ProductCreated(uint256 id, string name, uint256 price, address owner);

    event ProductPurchased(uint256 id, address buyer, uint256 price);

    constructor() {
        name = "Eth Marketplace";
        productCount = 0;
    }

    function createProduct(string memory _name, uint256 _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: _name,
            price: _price,
            owner: msg.sender
        });
        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    function purchaseProduct(uint256 _id) public payable {
        require(_id > 0 && _id < productCount + 1);
        Product memory _product = products[_id];
        address _seller = _product.owner;
        address _buyer = msg.sender;
        require(_seller != _buyer);
        require(_product.price <= msg.value);

        _product.owner = _buyer;

        products[_id] = _product;

        payable(_seller).transfer(msg.value);

        emit ProductPurchased(_id, _buyer, _product.price);
    }
}
