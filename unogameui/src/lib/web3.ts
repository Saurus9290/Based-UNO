import { ethers } from 'ethers'
import { UnoGameContract } from './types'
import UNOContractJson from '../constants/UnoGame.json'
import * as dotenv from 'dotenv';

dotenv.config()

declare global {
  interface Window {
    ethereum?: any;
  }
}

async function verifyContract(provider: ethers.Provider, address: string) {
  const code = await provider.getCode(address);
  if (code === '0x') {
    throw new Error('No contract deployed at the specified address');
  }
  console.log('Contract verified at address');
}

export async function getContract(address: string) {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.JsonRpcProvider('https://rpc.cardona.zkevm-rpc.com')

      const signer = await provider.getSigner(address)      

      //TestNet
      const contractAddress = '0xa991bd23e19fD447A9542FeDE9C9DC6E8e68A0A1'
     
      if (!contractAddress) {
        throw new Error('Contract address is not set');
      }
      const contractABI = UNOContractJson.abi

      await verifyContract(provider, contractAddress);
      const gameContract = new ethers.Contract(
        contractAddress!,
        contractABI,
        signer
      ) as ethers.Contract & UnoGameContract

      return { contract: gameContract }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }
  return { account: null, contract: null }
}

export async function getContractNew() {
  try {
    const rpcUrl = 'https://rpc.cardona.zkevm-rpc.com';
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    if (!KEY) {
      throw new Error('Something is missing');
    }

    const wallet = new ethers.Wallet(KEY, provider);

    // TestNet
    const contractAddress = '0xa991bd23e19fD447A9542FeDE9C9DC6E8e68A0A1';
    if (!contractAddress) {
      throw new Error('Contract address is not set');
    }

    const contractABI = UNOContractJson.abi;
    await verifyContract(provider, contractAddress);

    const gameContract = new ethers.Contract(
      contractAddress!,
      contractABI,
      wallet
    ) as ethers.Contract & UnoGameContract;

    console.log('Contract connected with wallet');

    return { contract: gameContract, wallet: wallet.address };
  } catch (error) {
    console.error('Failed to connect to contract:', error);
    return { account: null, contract: null };
  }
}