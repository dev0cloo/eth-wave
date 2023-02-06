// async function to fetch contract, compile and deploy locally
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  //  send a message transaction with owner's address
  let messageTxn = await waveContract.sendMessage(
    "Here is a test message from me"
  );
  await messageTxn.wait();

  //  send a message from another address
  messageTxn = await waveContract
    .connect(randomPerson)
    .sendMessage("A random message");
  await messageTxn.wait();

  //  call get messages function from deployed contract
  let allMessages = await waveContract.getMessages();
  console.log(allMessages);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
