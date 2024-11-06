import SupplyChainABI from "./SupplyChain.json";
import { ethers } from "ethers";

const contractAddress = "0x957a339e4df2b7595c2f0f2cecc85496d4cae7c0";

export const getContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SupplyChainABI,
      signer
    );
    return contract;
  }
  throw new Error("Please install MetaMask");
};

export const addParticipant = async (role, id, data) => {
  const contract = await getContract();
  const tx = await contract[`add${role}`](...Object.values(data));
  await tx.wait();
};

export const addDrug = async (id, name) => {
  const contract = await getContract();
  const tx = await contract.addDrug(id, name);
  await tx.wait();
};

export const purchaseDrug = async (id) => {
  const contract = await getContract();
  const tx = await contract.purchaseDrug(id);
  await tx.wait();
};

export const shipDrug = async (id) => {
  const contract = await getContract();
  const tx = await contract.shipDrug(id);
  await tx.wait();
};

export const receiveDrug = async (id) => {
  const contract = await getContract();
  const tx = await contract.receiveDrug(id);
  await tx.wait();
};

export const getDrugStatus = async (id) => {
  const contract = await getContract();
  return await contract.getDrugStatus(id);
};

export const traceDrug = async (id) => {
  const contract = await getContract();
  return await contract.traceDrug(id);
};

export const getDrugDetails = async (id) => {
  const contract = await getContract();
  return await contract.getDrugDetails(id);
};
