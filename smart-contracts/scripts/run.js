// async function to fetch contract, compile and deploy locally
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const messageContractFactory = await hre.ethers.getContractFactory(
    "MessagePortal"
  );
  const messageContract = await messageContractFactory.deploy();
  await messageContract.deployed();

  console.log("Contract deployed to:", messageContract.address);
  console.log("Contract deployed by:", owner.address);

  //  send a message transaction with owner's address
  let messageTxn = await messageContract.sendMessage(
    "Here is a test message from me"
  );
  await messageTxn.wait();

  //  send a message from another address
  messageTxn = await messageContract
    .connect(randomPerson)
    .sendMessage("A random message");
  await messageTxn.wait();

  //  call get messages function from deployed contract
  let allMessages = await messageContract.getMessages();
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
