const API_URL = "http://18.182.45.18:8765";
const PUBLIC_KEY = require('./secrets.json').publicKey
const PRIVATE_KEY= require('./secrets.json').privateKey


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);


const contract = require("../artifacts/contracts/NFT.sol/MyNFT.json");
const contractAddress = "0xbe056922fe64A4cC67A66f7B0E2BBa6398e06B4F";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);



async function mintNFT(tokenURI) {
 const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
 console.log(tokenURI);
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
             "\nYour NFT will arrive in a few minutes, thanks for shopping!"
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
     console.log(" Promise failed:", err)
   })
}
const tmp = Math.floor(Math.log2(2-Math.random())*3);

var card=["ipfs://QmSgyEpsoYfiUouDheq5g27fCjyKaDxpd3QFstbBPEZFkd",
          "ipfs://QmRMduXnc6tazMj1xw2ApNewJNGnuDFi7fkT7NnmXpHNWz",
          "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb"
]
mintNFT(card[tmp]);
