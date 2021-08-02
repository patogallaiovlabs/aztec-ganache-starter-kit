import utils from "@aztec/dev-utils";

const aztec = require("aztec.js");
const dotenv = require("dotenv");
dotenv.config();
const secp256k1 = require("@aztec/secp256k1");

const ZkAssetMintable = artifacts.require("./ZkAssetMintable.sol");

const {
  proofs: { MINT_PROOF }
} = utils;

const { JoinSplitProof, MintProof } = aztec;

contract("Private payment", accounts => {
  const bob = secp256k1.accountFromPrivateKey(
    process.env.GANACHE_TESTING_ACCOUNT_0
  );
  const sally = secp256k1.accountFromPrivateKey(
    process.env.GANACHE_TESTING_ACCOUNT_1
  );
  let privatePaymentContract;

  beforeEach(async () => {
    privatePaymentContract = await ZkAssetMintable.deployed();
    console.log('ZkAssetMintable: ', privatePaymentContract.contract);
    console.log('ZkAssetMintable balance: ', privatePaymentContract);
  });

  it("Bob should be able to deposit 100 then pay sally 25 by splitting notes he owns", async () => {
    console.log("Bob wants to deposit 100");
    const bobNote1 = await aztec.note.create(bob.publicKey, 100);
    debugger
    const newMintCounterNote = await aztec.note.create(bob.publicKey, 100);
    const zeroMintCounterNote = await aztec.note.createZeroValueNote();
    const sender = accounts[0];
    const mintedNotes = [bobNote1];

    /*     
     * @param {Object} currentTotalValueNote - note whose value represents the total current value of minted or burned notes
     * @param {Object} newTotalValueNote - note whose value represents the new total value of minted or burned notes
     * @param {Object[]} mintedNotes - notes to be minted or burned
     * @param {string} sender - Ethereum address of the transaction sender
     */
    const mintProof = new MintProof(
      zeroMintCounterNote,
      newMintCounterNote,
      mintedNotes,
      sender
    );

    

    const mintData = mintProof.encodeABI();
 
    /**
    * @dev Executes a confidential minting procedure, dependent on the provided proofData
    * being succesfully validated by the zero-knowledge validator
    *
    * @param _proof - uint24 variable which acts as a unique identifier for the proof which
    * _proofOutput is being submitted. _proof contains three concatenated uint8 variables:
    * 1) epoch number 2) category number 3) ID number for the proof
    * @param _proofData - bytes array of proof data, outputted from a proof construction
    */
    let result_mint = await privatePaymentContract.confidentialMint(MINT_PROOF, mintData, {
      from: accounts[0]
    });

    console.log("completed mint proof", JSON.stringify(result_mint, null, 4));
    console.log("Bob successfully deposited 100");

    // bob needs to pay sally for a taxi
    // the taxi is 25
    // if bob pays with his note worth 100 he requires 75 change
    console.log("Bob takes a taxi, Sally is the driver");
    const sallyTaxiFee = await aztec.note.create(sally.publicKey, 25);

    console.log("The fare comes to 25");
    const bobNote2 = await aztec.note.create(bob.publicKey, 75);
    const sendProofSender = accounts[0];
    const withdrawPublicValue = 0;
    const publicOwner = accounts[0];

    const sendProof = new JoinSplitProof(
      mintedNotes,
      [sallyTaxiFee, bobNote2],
      sendProofSender,
      withdrawPublicValue,
      publicOwner
    );
    const sendProofData = sendProof.encodeABI(privatePaymentContract.address);
    const sendProofSignatures = sendProof.constructSignatures(
      privatePaymentContract.address,
      [bob]
    );
    let result_payment = await privatePaymentContract.methods["confidentialTransfer(bytes,bytes)"](
      sendProofData,
      sendProofSignatures,
      {
        from: accounts[0]
      }
    );

    console.log("Bob paid sally 25 for the taxi and gets 75 back", JSON.stringify(result_payment, null, 4));
  });
});
