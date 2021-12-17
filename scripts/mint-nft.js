// require('dotenv').config();
// const API_URL = process.env.API_URL;
// const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
// const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

// const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
// const alchemyWeb3 = createAlchemyWeb3(API_URL);
// const contract = require('../artifacts/contracts/OsunRiverNFT.sol/TorNFT.json');

// const contractAddress = '0xAc2e693B5A6276521eA83Ae1F8F0E50F78F62380';
// const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

// async function mintNFT(tokenURI) {
//   // get the nonce - nonce is needed for security reasons. It keeps track of the number of
//   // transactions sent from our address and prevents replay attacks.
//   const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
//   const tx = {
//     from: METAMASK_PUBLIC_KEY, // our MetaMask public key
//     to: contractAddress, // the smart contract address we want to interact with
//     nonce: nonce, // nonce with the no of transactions from our account
//     gas: 1000000, // fee estimate to complete the transaction
//     data: nftContract.methods.createNFT('0x0d28235B6191a66A3410cc1e3CeBfE53602D7865', tokenURI).encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
//   };

//   const signPromise = alchemyWeb3.eth.accounts.signTransaction(tx, METAMASK_PRIVATE_KEY);
//   signPromise
//     .then((signedTx) => {
//       alchemyWeb3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
//         if (!err) {
//           console.log(
//             'The hash of our transaction is: ',
//             hash,
//             "\nCheck Alchemy's Mempool to view the status of our transaction!",
//           );
//         } else {
//           console.log('Something went wrong when submitting our transaction:', err);
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(' Promise failed:', err);
//     });
// }


// mintNFT(
//   "https://bafkreigx6cnb7il6mp4xnf3blzfrd5j2zq7hq5txlud5zhh43ls2rwf4ri.ipfs.dweb.link/"
// )

require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/TorNFT.json")
const contractAddress = "0xAc2e693B5A6276521eA83Ae1F8F0E50F78F62380"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT(
  "https://bafkreigx6cnb7il6mp4xnf3blzfrd5j2zq7hq5txlud5zhh43ls2rwf4ri.ipfs.dweb.link/"
)
