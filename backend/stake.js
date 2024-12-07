const { Coinbase, ExternalAddress, StakeOptionsMode } = require("@coinbase/coinbase-sdk");
const fs = require('fs');
require('dotenv').config();

const walletAddress = process.env.WALLET_ADDRESS;

const apiKeyName = process.env.CDK_API_KEY_NAME

const privateKey = fs.readFileSync('privateKey.pem', 'utf8');

async function stake() {
  Coinbase.configure({ apiKeyName: apiKeyName, privateKey: privateKey}) 

  // Create a new external address on the ethereum-holesky testnet network.
  const address = new ExternalAddress(Coinbase.networks.EthereumHolesky, walletAddress);

  // Find out how much ETH is available to stake.
  const stakeableBalance = await address.stakeableBalance(Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);
  console.log("Stakeable balance of address %s is %s ETH", walletAddress, stakeableBalance);

  // Build a stake transaction for an amount <= stakeableBalance
  process.stdout.write("Building a transaction to stake 0.005 ETH...");
  const stakingOperation = await address.buildStakeOperation(0.005, Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);
  console.log("Done.");
}

module.exports = { stake };
