import React, { useEffect, useState } from "react";
import Election from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voteText, setVoteText] = useState("");

  const candi = () => {
    
    contract.methods.Contestent(voteText).send({ from: account });
  };

  const vote = async (event) => {
    event.preventDefault();
    var e = document.getElementById("select");
    var strUser = e.value;
    contract.methods.vote(strUser).send({ from: account });
    
  };

  const loadCandi = async (contract) => {
    const totalSupply = await contract.methods.candidatesCount().call();
    let results = [];
    for (let i = 1; i <= totalSupply; i++) {
      let candidates = await contract.methods.candidates(i).call();
      results.push(candidates);
    }
    setCandidates(results);
  };

  const loadweb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if (networkData) {
      const abi = Election.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      console.log(contract);
      return contract;
    }
  };


  useEffect(async () => {
    const web3 = await getWeb3();
    await loadweb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await loadCandi(contract);

    
  }, []);

  return (
    <div className="outerSpace">
     
      <main>
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom ">
            <a
              href="/"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
             
              <span className="fs-5 text-white">  Your Wallet Address : {account}e</span>
            </a>
          </header>

          <div className="p-3 mb-3 bg-light rounded-3 border border-dark ">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Voting on the dApp</h1>
              <p className="col-md-8 fs-4">
                Casted votes will be store on the block. Each person can vote
                only one once through his Meta Mask wallet. Each Candidate will
                have his own nft minted.{" "}
              </p>
              {/* <button class="btn btn-primary btn-lg" type="button">
                Example button
              </button> */}
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6 ">
              <div className="h-100 p-5 bg-light rounded-3 border border-dark">
                <h2>Candidates : </h2>
                
                <div>
                  <label for="cars" className="fw-bold p-1">
                    Add people For Voting :{" "}
                  </label>
                  <input
                    type="text"
                    value={voteText}
                    onChange={(e) => setVoteText(e.target.value)}
                    className="form-control mb-2"
                    placeholder="e.g. Nandan"
                  />
                </div>
                <button
                  onClick={candi}
                  class="btn btn-outline-secondary"
                  type="button"
                >
                  Add Candidate
                </button>

                <div className="col-8 d-flex justify-content-center flex-wrap mt-4">
            {candidates.map((candidate, key)=><div className="d-flex flex-column align-items-center" key={key}>
                  <img width="100" className="px-3" src={`https://avatars.dicebear.com/api/bottts/${candidate[1]}.svg`} />
                  <span>{candidate[1]}</span>
            </div>)}
          </div>


              </div>
            </div>
            <div className="col-md-6">
              <div className="h-140 p-3 bg-dark text-white border rounded-3" >
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Votes Casted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, key) => (
                      <tr key={key}>
                        <th>{candidate[0]}</th>
                        <th>{candidate[1]}</th>
                        <th>{candidate[2]}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div>
                  <label for="cars" className="fw-bold p-1">
                    Choose a Person To Vote :{" "}
                  </label>
                  <select
                    id="select"
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Open this Select Menu</option>
                    {candidates.map((candidate, key) => (
                      <option key={key} value={candidate[0]}>
                        {candidate[1]}
                      </option>
                    ))}
                  </select>
                  <input
                    type="submit"
                    value="Vote Now"
                    onClick={vote}
                    className="btn btn-outline-light"
                  />
                </div>
              </div>
            </div>
          </div>

          <footer class="pt-3 mt-4 text-muted border-top">&copy;Passing Time</footer>
        </div>
      </main>
    </div>
  );
};

export default App;