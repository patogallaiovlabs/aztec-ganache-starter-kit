const ACE = artifacts.require('./ACE.sol');
const ZkAsset = artifacts.require('./ZkAsset.sol');
const ZkAssetMintable = artifacts.require('./ZkAssetMintable.sol');
const TestERC20 = artifacts.require('./TestERC20.sol');
const ERC20Mintable = artifacts.require("ERC20Mintable");

module.exports = async (deployer, network) => {
  await deployer.deploy(TestERC20);
  await deployer.deploy(
    ERC20Mintable,
    "PatoCoin",
    "PAT");
  //const testERC20 = await TestERC20.deployed();
  const eRC20Mintable = await ERC20Mintable.deployed();

  let aceContract;
  if (network === 'development') {
    aceContract = await ACE.deployed();
    // initialise the ZkAsset with an ERC20 equivilant
    await deployer.deploy(
      ZkAsset,
      aceContract.address, // address _aceAddress,
      eRC20Mintable.address,//testERC20.address, // address _linkedTokenAddress
      1 // uint256 _scalingFactor
    );
    console.log('ERC20Mintable address:', eRC20Mintable.address);
    // initialise the private asset (private => _linkedTokenAddress=0)
    await deployer.deploy(ZkAssetMintable,
      aceContract.address, //  address _aceAddress,
      '0x0000000000000000000000000000000000000000', // address _linkedTokenAddress,
      1, // uint256 _scalingFactor,
      0, // uint24 _optionalMintProofId,
      [], // bytes memory _optionalInitialisationMint
    );
  }
};
