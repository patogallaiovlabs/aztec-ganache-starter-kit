require('@babel/register');

module.exports = {
  compilers: {
    solc: {
      version: '>=0.5.0 <0.7.0',
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
      network_id: '*',
      port: 8545,
    },
  },
};
