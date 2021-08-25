require('@babel/register');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = ['0xc85ef7d79691fe79573b1a7064c19c1a9819ebdbd1faaab1a8ec92344438aaf4'];
module.exports = {
  compilers: {
    solc: {
      version: '0.5.7',
      settings: {
        optimizer: {
          enabled: true,
          runs: 500,
        },
        evmVersion: 'constantinople',
      },
    },
  },
  networks: {
    development: {
      host: '127.0.0.1',
      network_id: '33',
      port: 4444,
      gasPrice: 60000000
    },
    testnet: {
      provider: () => new HDWalletProvider(
        {
          privateKeys,
          providerOrUrl: 'http://localhost:4444/',
          derivationPath: "m/44'/37310'/0'/0/",
          // Higher polling interval to check for blocks less frequently
          pollingInterval: 15e3,
          chainId: 31
        }
      ),
      network_id: 31,
      gasPrice: 0x26D73CC0,
      //networkCheckTimeout: 1e76,
      skipDryRun: false,
      timeoutBlocks: 100,
      confirmations: 1,
      // Higher polling interval to check for blocks less frequently
      // during deployment
      //deploymentPollingInterval: 600,
      //disableConfirmationListener: true,
    },
  },
};
