const ACE = artifacts.require('./ACE.sol');
const JoinSplitFluid = artifacts.require('./JoinSplitFluid.sol');
const Swap = artifacts.require('./Swap.sol');
const Dividend = artifacts.require('./Dividend.sol');
const PrivateRange = artifacts.require('./PrivateRange.sol');
const JoinSplit = artifacts.require('./JoinSplit.sol');

const utils = require('@aztec/dev-utils');
const bn128 = require('@aztec/bn128');

const {
  proofs: {
    JOIN_SPLIT_PROOF,
    MINT_PROOF,
    SWAP_PROOF,
    DIVIDEND_PROOF,
    PRIVATE_RANGE_PROOF,
  },
} = utils;


module.exports = async (deployer, network) => {
  if (network === 'development') {
    await deployer.deploy(ACE);
    await deployer.deploy(JoinSplitFluid);
    await deployer.deploy(Swap);
    await deployer.deploy(JoinSplit);
    await deployer.deploy(PrivateRange);

    await deployer.deploy(Dividend);
    const ACEContract = await ACE.deployed(bn128.CRS);
    const JoinSplitFluidContract = await JoinSplitFluid.deployed();
    await ACEContract.setCommonReferenceString(bn128.CRS);
    await ACEContract.setProof(MINT_PROOF, JoinSplitFluidContract.address);
    console.log("JoinSplitFluidContract.address:", JoinSplitFluidContract.address);
    await ACEContract.setProof(SWAP_PROOF, Swap.address);
    console.log("Swap.address:", Swap.address);
    await ACEContract.setProof(DIVIDEND_PROOF, Dividend.address);
    console.log("Dividend.address:", Dividend.address);
    await ACEContract.setProof(JOIN_SPLIT_PROOF, JoinSplit.address);
    console.log("JoinSplit.address:", JoinSplit.address);
    await ACEContract.setProof(PRIVATE_RANGE_PROOF, PrivateRange.address);
    console.log("PrivateRange.address:", PrivateRange.address);
    console.log('ACE address:', ACEContract.address);
  }
};
