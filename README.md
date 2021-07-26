# aztec-rsk-starter-kit

A repository that helps dApp developers deploy AZTEC to a local RSK Node.

### Getting started
0. Prerequisites:
   1. Node: https://nodejs.org/en/
   1. Java: https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html
   2. Yarn: https://classic.yarnpkg.com/en/docs/install/#mac-stable  

1. Clone this repository `git clone --recursive git@github.com:patogallaiovlabs/aztec-rsk-starter-kit.git`

2. Install the dependencies `cd aztec-rsk-starter-kit && yarn install`

3. Start RSK node `./rskj-init.sh && ./rskj-start.sh`

4. Deploy AZTEC! `yarn migrate`

6. Run the private payment demo. `yarn demo`
