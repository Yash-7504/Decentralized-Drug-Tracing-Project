const hre = require("hardhat");

describe("SupplyChain", function () {
  let SupplyChain, supplyChain, owner, addr1, addr2;

  beforeEach(async function () {
    SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners();
    supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy the contract and set the right owner", async function () {
      const { expect } = await import("chai");
      expect(await supplyChain.owner()).to.equal(owner.address);
    });

    it("Should have initial state variables set correctly", async function () {
      const { expect } = await import("chai");
      // Add your initial state checks here
      // Example: expect(await supplyChain.someVariable()).to.equal(expectedValue);
    });
  });

  describe("Transactions", function () {
    it("Should allow adding a new product", async function () {
      const { expect } = await import("chai");
      await supplyChain.addProduct("Product1", "Description1", 1);
      const product = await supplyChain.products(0);
      expect(product.name).to.equal("Product1");
      expect(product.description).to.equal("Description1");
      expect(product.quantity).to.equal(1);
    });

    it("Should update the product status correctly", async function () {
      const { expect } = await import("chai");
      await supplyChain.addProduct("Product1", "Description1", 1);
      await supplyChain.updateProductStatus(0, "Shipped");
      const product = await supplyChain.products(0);
      expect(product.status).to.equal("Shipped");
    });

    it("Should prevent non-owners from adding products", async function () {
      const { expect } = await import("chai");
      await expect(
        supplyChain.connect(addr1).addProduct("Product1", "Description1", 1)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should prevent non-owners from updating product status", async function () {
      const { expect } = await import("chai");
      await supplyChain.addProduct("Product1", "Description1", 1);
      await expect(
        supplyChain.connect(addr1).updateProductStatus(0, "Shipped")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Edge cases and Security", function () {
    it("Should handle overflow correctly", async function () {
      const { expect } = await import("chai");
      // Example: testing for overflow issues
      await expect(
        supplyChain.addProduct(
          "Product1",
          "Description1",
          hre.ethers.constants.MaxUint256.add(1)
        )
      ).to.be.reverted;
    });

    it("Should not allow unauthorized access to sensitive functions", async function () {
      const { expect } = await import("chai");
      // Example: testing for access control
      await expect(
        supplyChain.connect(addr1).sensitiveFunction()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not allow adding a product with an empty name", async function () {
      const { expect } = await import("chai");
      await expect(
        supplyChain.addProduct("", "Description1", 1)
      ).to.be.revertedWith("Product name cannot be empty");
    });

    it("Should not allow updating status of non-existent product", async function () {
      const { expect } = await import("chai");
      await expect(
        supplyChain.updateProductStatus(9999, "Shipped")
      ).to.be.revertedWith("Product does not exist");
    });
  });
});
