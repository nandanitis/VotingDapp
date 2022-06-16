const Election = artifacts.require("./Election.sol");

contract("Election", accounts => {

  let contract;
  before( async() => {
    contract = await Election.deployed();
  })

  it("..should get deployed", async () => {
    assert.notEqual(contract,"Contract is Empty")
  });

  it("..Candidate Must Be Choosen", async () => {
    await contract.Contestent("batman");
    await contract.Contestent("superman");
    const person = await contract.candidates(1);
  });

  it("...Voting has been done", async () => {
    var votedTo=1;
    let accounts = await web3.eth.getAccounts()
    contract.vote( votedTo, {from: accounts[0]})
    candidate = await contract.candidates(votedTo);
    let votes=candidate[2];
    assert.notEqual(votes,1,"Votes has not been increased");

  })

});
