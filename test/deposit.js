import utils from "@aztec/dev-utils";

const aztec = require("aztec.js");
const dotenv = require("dotenv");
dotenv.config();
const secp256k1 = require("@aztec/secp256k1");

const ZkAssetMintable = artifacts.require("./ZkAssetMintable.sol");
const ERC20Mintable = artifacts.require("ERC20Mintable");
const ZkAsset = artifacts.require("ZkAsset");
const ACE = artifacts.require("ACE");

const {
  proofs: { MINT_PROOF }
} = utils;

const customMetaData = {
  data:
      // eslint-disable-next-line max-len
      '0x00000000000000000000000000000000000000000000000000000000000000c1000000000000000000000000000000000000000000000000000000000000014100000000000000000000000000000000000000000000000000000000000003d7000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041680f6037b257d0f6313038b3dac0102f4fd324000000000000000000000000ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1a000000000000000000000000ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2a0000000000000000000000000000000000000000000000000000000000000003c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c20000000000000000000000000000000000000000000000000000000000000001dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
  dataWithNewEphemeral:
      // eslint-disable-next-line max-len
      '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00000000000000000000000000000000000000000000000000000000000000c1000000000000000000000000000000000000000000000000000000000000014100000000000000000000000000000000000000000000000000000000000003d7000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041680f6037b257d0f6313038b3dac0102f4fd324000000000000000000000000ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1a000000000000000000000000ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2a0000000000000000000000000000000000000000000000000000000000000003c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c20000000000000000000000000000000000000000000000000000000000000001dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
  addresses: [
      '0x41680f6037B257d0f6313038b3dac0102f4fd324',
      '0xad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1ad1a',
      '0xad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2ad2a',
  ],
};

const { JoinSplitProof, MintProof, note } = aztec;

contract("Private payment", accounts => {
  const bob = secp256k1.accountFromPrivateKey(
    process.env.GANACHE_TESTING_ACCOUNT_0
  );

  const sally = secp256k1.accountFromPrivateKey(
    process.env.GANACHE_TESTING_ACCOUNT_1
  );

  let erc20;
  let zkAsset;
  let ace;

  before(async () => {
    erc20 = await ERC20Mintable.deployed();
    zkAsset = await ZkAsset.deployed();
    ace = await ACE.deployed();
    console.log("ERC20Mintable address:", erc20.address);
    let totalSupply = await erc20.totalSupply();
    await erc20.mint(bob.address, 100);
    console.log("Bob address(100):", bob.address);
    await erc20.mint(sally.address, 200);
    console.log("Sally address(200):", sally.address);
    totalSupply = await erc20.totalSupply();
    console.log("Total supply:", totalSupply.toNumber());
    
    // Approve ACE contract, to interact with bob tokens.
    let approved = await erc20.approve(ace.address, 100, { from: bob.address });
    //console.log("Approved result:", JSON.stringify(approved));
  });

  it("test check bob balance of ERC20 token", async () => {
    const totalBob = await erc20.balanceOf(bob.address);
    expect(totalBob.toNumber()).to.equal(100);
  });

  it("test zkAzzet token linked to valid ERC20 token", async () => {
    const result = await zkAsset.linkedToken();
    expect(result).to.equal(erc20.address);
  });

  it("test transfer from ERC20 to zkAsset", async () => {

    let totalBob = await erc20.balanceOf(bob.address);
    expect(totalBob.toNumber()).to.equal(100);

    const depositInputNotes = [];
    const depositInputOwnerAccounts = [];
    const depositPublicValue = 20;
    const publicOwner = bob.address;
    const sender = bob.address;

    const depositOutputNotes = [await note.create(bob.publicKey, depositPublicValue)];
    const publicValue = depositPublicValue * -1;

    //depositOutputNotes.forEach((individualNote) => {
    //    return individualNote.setMetaData(customMetaData.data);
    //});

    const depositProof = new JoinSplitProof(depositInputNotes, depositOutputNotes, sender, publicValue, publicOwner);
    const depositData = depositProof.encodeABI(zkAsset.address);
    const depositSignatures = depositProof.constructSignatures(zkAsset.address, depositInputOwnerAccounts);

    await ace.publicApprove(zkAsset.address, depositProof.hash, 20, { from: bob.address });
    let result = await zkAsset.methods['confidentialTransfer(bytes,bytes)'](depositData, depositSignatures, { from: bob.address });
    expect(result.logs[0].event).to.equal('CreateNote');
    expect(result.logs[0].args.owner).to.equal(bob.address);
    expect(result.logs[1].event).to.equal('ConvertTokens');
    expect(result.logs[1].args.owner).to.equal(bob.address);
    expect(result.logs[1].args.value.toNumber()).to.equal(20);

    //console.log("Result:", result.logs);

    totalBob = await erc20.balanceOf(bob.address);
    expect(totalBob.toNumber()).to.equal(80);

    let allowance = await erc20.allowance(bob.address, ace.address);
    expect(allowance.toNumber()).to.equal(80);
  });

});
