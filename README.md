[![CircleCI](https://circleci.com/gh/AztecProtocol/aztec-ganache-starter-kit.svg?style=svg)](https://circleci.com/gh/AztecProtocol/aztec-ganache-starter-kit)

# aztec-rsk-starter-kit

A repository that helps dApp developers deploy AZTEC to a local RSK Node.

### Getting started

1. Clone this repository `git clone --recursive git@github.com:patogallaiovlabs/aztec-rsk-starter-kit.git`

2. Install the dependencies `cd aztec-rsk-starter-kit && yarn install`

3. Start RSK node `./rskj-init.sh && ./rsk-start.sh`

4. Deploy AZTEC! `yarn migrate`

5. Run the demos:
- Basic demo, simulate mint and transfer: `yarn demo`
- Demo mint ERC20 and deposit to a ZkAsset contract: `yarn deposit`
