// async function to fetch contract, compile and deploy locally
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  //  call get waves function from deployed contract
  await waveContract.getWaves();

  //  send a wave transaction with owner's address
  const firstWaveTxn = await waveContract.wave();
  await firstWaveTxn.wait();

  await waveContract.getWaves();

  //  send a wave from another address
  const secondWaveTxn = await waveContract.connect(randomPerson).wave();
  await secondWaveTxn.wait();

  await waveContract.getWaves();
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
