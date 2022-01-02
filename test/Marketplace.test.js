const Marketplace = artifacts.require("Marketplace");
require("chai").use(require("chai-as-promised")).should();

contract("Marketplace", ([deployer, seller, buyer, buyer2]) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", () => {
    it("deploys succesfully", async () => {
      const address = marketplace.address;
      assert.notEqual(address, "0x0");
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await marketplace.name();
      assert.typeOf(name, "string");
    });
  });

  describe("products", () => {
    let productCount;
    it("creates a product", async () => {
      const oldProductCount = (await marketplace.productCount()).toNumber();
      const result = await marketplace.createProduct(
        "iPhone X",
        web3.utils.toWei("1", "Ether"),
        { from: seller }
      );
      productCount = (await marketplace.productCount()).toNumber();

      const event = result.logs[0].args;

      assert.equal(productCount, oldProductCount + 1);
      assert.equal(event.id.toNumber(), productCount);
      assert.equal(event.name, "iPhone X");
      assert.equal(event.price, web3.utils.toWei("1", "Ether"));
      assert.equal(event.owner, seller);
    });

    it("should be rejected", async () => {
      await marketplace.createProduct("", web3.utils.toWei("1", "Ether"), {
        from: seller,
      }).should.be.rejected;

      await marketplace.createProduct("iPhone X", "", {
        from: seller,
      }).should.be.rejected;
    });
    it("list products", async () => {
      const product = await marketplace.products(productCount);

      assert.equal(product.id.toNumber(), productCount);
      assert.equal(product.name, "iPhone X");
      assert.equal(product.price, web3.utils.toWei("1", "Ether"));
      assert.equal(product.owner, seller);
    });

    it("sells a product", async () => {
      const oldBalance = new web3.utils.BN(await web3.eth.getBalance(seller));
      const result = await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      });

      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), productCount);
      assert.equal(event.buyer, buyer);
      assert.equal(event.price, web3.utils.toWei("1", "Ether"));

      const newBalance = new web3.utils.BN(await web3.eth.getBalance(seller));

      assert.equal(
        oldBalance
          .add(new web3.utils.BN(web3.utils.toWei("1", "Ether")))
          .toString(),
        newBalance.toString()
      );
    });

    it("should be rejected", async () => {
      await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;

      await marketplace.purchaseProduct(productCount, {
        from: buyer2,
        value: 0,
      }).should.be.rejected;

      await marketplace.purchaseProduct(productCount + 1, {
        from: buyer2,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;

      await marketplace.purchaseProduct(-1, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
