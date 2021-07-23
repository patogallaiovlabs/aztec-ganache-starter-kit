[![CircleCI](https://circleci.com/gh/AztecProtocol/aztec-ganache-starter-kit.svg?style=svg)](https://circleci.com/gh/AztecProtocol/aztec-ganache-starter-kit)

# aztec-ganache-starter-kit

A repository that helps dApp developers deploy AZTEC to a local blockchain.

### Getting started

1. Clone this repository `git clone --recursive git@github.com:patogallaiovlabs/aztec-ganache-starter-kit.git`

2. Install the dependencies `cd aztec-ganache-starter-kit && yarn install`

3. Start RSK node `./rskj-init.sh && ./rsk-start.sh`

4. Deploy AZTEC! `yarn migrate`

6. Run the private payment demo. `yarn demo`
