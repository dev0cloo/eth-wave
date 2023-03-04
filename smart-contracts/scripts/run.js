// async function to fetch contract, compile and deploy locally
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const messageContractFactory = await hre.ethers.getContractFactory(
    "MessagePortal"
  );
  let ownerBalance = await owner.getBalance();
  console.log(
    "Owner balance is:",
    hre.ethers.utils.formatEther(ownerBalance),
    "eth"
  );

  const messageContract = await messageContractFactory.deploy({
    value: ethers.utils.parseEther("1"),
  });
  await messageContract.deployed();

  console.log("Contract deployed to:", messageContract.address);
  console.log("Contract deployed by:", owner.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    "Contract balance is:",
    hre.ethers.utils.formatEther(contractBalance),
    "eth"
  );
  //  send a message transaction with owner's address
  let messageTxn = await messageContract.sendMessage(
    "Here is a test message from the owner."
  );
  await messageTxn.wait();

  // get balance after first messsage
  contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    "Contract balance is:",
    hre.ethers.utils.formatEther(contractBalance),
    "eth"
  );

  //  send a message from another address
  messageTxn = await messageContract
    .connect(randomPerson)
    .sendMessage("A test message from another user");
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
