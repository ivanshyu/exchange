const Web3 = require("web3");
const Tx = require('ethereumjs-tx');
const PrivateKeyProvider = require("truffle-privatekey-provider");
const {pushIntoQueue} = require('../routes/rabbitmq/producer');
require("dotenv").config()

let admin = "0x3a40FBb93049776CbBF917dd6Be7A950b6685F26";
let adminPK = "0x0ca7ab102a200a224ff23ba39c42e8fdbe7a1189a7a3a3ce38a55b7d278a5e33";
const bankAddress = "0x8849d98F9C1a6aEEc42f49a44A6a3a6Dbc456d6D";
const settlementAddress = "0x5246CD9250Eb6bC2c560CE457BEf433a78c21e6A";

let blockchainURL = "http://localhost:8545";
/*
const backendAddr = admin.substr(2);
const backendAddrpkBuffer = Buffer.from(adminPK.substr(2), 'hex');
const provider = new PrivateKeyProvider(backendAddrpkBuffer, blockchainURL);
*/
const web3deploy = new Web3(blockchainURL);
const Bank = require('./build/NCCUBank.json');
const Wallet = require('./build/NCCUWallet.json');
const Settlement = require('./build/Settlement.json');

const keystore = require("./keystore.json");

const user1 = '108753110';
const user1Address = "0x432321057F298159F3b29aA68d2fafC8E537d2a2";
const user1PrivateKey = "0x8e0a5a00b76eeda647bf6ab7b129fc48fe076d558be6b5d2a048b406f80be90e";
const user1Wallet = '0x7B4EE2376f2CcC97C6cb1115701aB505966B33cc';

const user2 = '104703037';
const user2Address = "0x95282bf0024b63b4c50ab147f9cafa8d5185472d";
const user2PrivateKey = "0xfc1992354235f2df5b631906be1d6b5d49bd24db0fa98488dc1e0b348f4c78b8";
const user2Wallet = '0x334A3f8aC83Eaf5558d1be6077937C1d9a9BA8d6';

//keystore
const tester1 = '104703037';
const tester1Address = "0x4bf7Ba7c7217dEae1B354fA87a4D67b55538E869";
const tester1PrivateKey = '0xa248289b526ea834fa7036e4a5ea4d0b899955bc716b75ab37b386d3039b7ef6';
//0x5EbfE42863600f0AF619b338F37d2E874D77f471
const tester2 = 'tester2';
const tester2Address = "0xc4317EedCf79d34736D49F205Fe69680319d1B69";
const tester2PrivateKey = '0xd0ab71c58387b0182db40acef27631ea118b6456215c0fc99c68b35084df3c54';

const tester3 = 'tester3';
const tester3Address = "0xE43ccFe172cA36Aef30E0adFF154f4CcE3eD580e";
const tester3PrivateKey = '0x0cae7696f27d6ccf7edf3eba4a86441f47911b60c59cc8c1e0a2e1b9350e4729';
//0x0A9C0dfd14B0fCa39C3e57f36A8a9102a9f45B9C
const tester4 = 'tester4';
const tester4Address = "0xc3D43C6f16E42BcBCd22c65E9Ab94bA541ae3c6d";
const tester4PrivateKey = '0x70ad7f83e15dcd15c084553877aae2bfbfc76894a299145f0cb37a2942fa3db6';

const tester5 = 'tester5';
const tester5Address = "0xdEAF621CeDe01e8E3Abb92FE70Cc1bBAfb0957d5";
const tester5PrivateKey = '0x9f5d9816f9c7df64710ecd99adb862e7ed4825c2af65fec937a29a52625544a4';

const tester6 = 'tester6';
const tester6Address = "0xD49355ED1597046b8074f240aD67a4A239C29efC";
const tester6PrivateKey = '0xa48b9b1e2712bfe8c38a98a6d7797ac7c3daa649e53f794472e817f493da17c2';
//console.log(web3deploy.eth.getBalance("0x7ddc00fbb4a74abac97dda2b1427137ba550c002"));

const deployBank = async() => {
    return new Promise( async ( resolve, reject ) => {
        try{
            await unlock().catch(err => {
                reject(err);
            });
            instBank = await new web3deploy.eth.Contract(Bank.abi)
            .deploy({ data: Bank.bytecode})
            .send({ from: admin, gas: 34000000 })
            .on('receipt', function (receipt) {
                console.log('receipt:', receipt.contractAddress);
            })
            .on('error', function (error) {
                console.log('error:', error);
                reject(error);
            })
            .then(function(newContractInstance){
                resolve(newContractInstance.options.address) // instance with the new contract address
            });
        } catch(err){
            reject(err);
        }
    });
}
const getBankAdmin = async() => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.getAdmin().call({from: user1Address});
            console.log(result);
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}
const searchWallet = async(user) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.searchWalletAddress(user).call({from: admin});
            console.log(result)
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}
const searchAddress = async(user) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.searchAddress(user).call({from: admin});            
            console.log(result);
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}
const getBalance = async(user) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.getBalanceByID(user).call({from: admin});
            console.log(result)
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}

const getCoupons = async(user) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.getCoupons(user).call({from: admin});
            console.log(result)
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}

const getCouponsPoolFromSettlement = async(user) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi, settlementAddress);
            let result = await instSettlement.methods.getCouponsPool().call({from: admin});
            console.log(result)
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}

const getCouponsPoolDetailFromSettlement = async(coupon_id) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi, settlementAddress);
            let result = await instSettlement.methods.getCouponDetail(coupon_id).call({from: admin});
            console.log(result)
            resolve(result);
        } catch(err){
            reject(err);
        }
    });
}

const createEthAccount = async () =>{
    return new Promise( async ( resolve, reject ) => {
        try{
            let user = await web3deploy.eth.accounts.create();
            console.log(user);
            let keystore = await web3deploy.eth.accounts.encrypt(user.privateKey, '02282040')
            console.log(JSON.stringify(keystore));
            resolve(user);
        } catch(err){
            reject(err);
        }
    });
} 
const registerUserToBank = async(id, address, wallet) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            await instBank.methods.initIDMapping(id, address, wallet).send({
                from: admin,
                gas: 3400000,
            })
            .on('receipt', function (receipt) {
                console.log(receipt);
                resolve(receipt);
            })
            .on('error', function (error) {
                console.log(error);
                reject(error);
            })
         } catch(err){
             console.log(err);
             reject(err);
         }
    });
}
const setUserIdToBank = async(user, userAddress) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            instBank.methods.setIdtoAddress(user, userAddress).send({
                from: admin,
                gas: 3400000,
            })
            .on('receipt', function (receipt) {
                console.log(receipt);
                resolve(receipt);
            })
            .on('error', function (error) {
                console.log(error);
                reject(error);
            })
        }catch(err){
            console.log(err);
            reject(error);
        }
    });
}
const unlock = async () => {  //time : seconds
    return new Promise( async ( resolve, reject ) => {
        await web3deploy.eth.personal.unlockAccount(admin, "plsm")
        .then((response) => {
            if(response == true)
                resolve();
            reject();
        }).catch((error) => {
            reject(error)
        });
    });
}

const lock = async () => {  //time : seconds
    return new Promise( async ( resolve, reject ) => {
        await web3deploy.eth.personal.lockAccount(admin)
        .then((response) => {
            if(response == true)
                resolve();
            reject();
        }).catch((error) => {
            reject(error)
        });
    });
}

const mint = async(id, value) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            await unlock().catch(err => {
                reject(err);
            });
            instBank = await new web3deploy.eth.Contract(Bank.abi, bankAddress);
            let result = await instBank.methods.mintToWallet(id, value).send({
                from: admin,
                gas: 3400000,
            })
            .on('receipt', async function (receipt) {
                console.log(receipt);
                await lock().catch(err => {
                    reject(err);
                });
                resolve(receipt);
            })
            .on('error', async function (error) {
                console.log(error);
                await lock().catch(err => {
                    reject(err);
                });
                reject(error);
            })
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}
const transfer = async(id, targetID, value, address, pk) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi);
            const encodedData = instBank.methods.transfer(id, targetID, value).encodeABI();
            console.log(encodedData)
            let TxResult = await signTx(address, pk, bankAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
            //console.log(encodedData);
            //resolve(encodedData);
           
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}
const transferBatch = async(id, targetIDArray, address, addressPK, value) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi);
            const encodedData = instBank.methods.transferBatch(id, targetIDArray, value).encodeABI();
            let TxResult = await signTx(address, addressPK, bankAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
            
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

const buyCoupon = async(id, coupon_id, value, address, addressPK) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instBank = await new web3deploy.eth.Contract(Bank.abi);
            const encodedData = instBank.methods.buyCoupon(id, value, coupon_id).encodeABI();
            let TxResult = await signTx(address, addressPK, bankAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}
const initSettlement = async (address, addressPK) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi);
            const encodedData = instSettlement.methods.init(bankAddress).encodeABI();
            let TxResult = await signTx(address, addressPK, settlementAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
        }catch(err){
            console.log(err);
            reject(err);
        }
    }); 
}
const soldToSettlement = async (id, minValue, maxValue, coupon_id, vendor, type, address, addressPK) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi);
            const encodedData = instSettlement.methods.pushToCouponPool(id, minValue, maxValue, coupon_id, vendor, type).encodeABI();
            let TxResult = await signTx(address, addressPK, settlementAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
        }catch(err){
            console.log(err);
            reject(err);
        }
    }); 
}
const couponSoldFromSettlement = async (from, toCoupon, address, addressPK) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi);
            const encodedData = instSettlement.methods.couponSold(from, toCoupon).encodeABI();
            let TxResult = await signTx(address, addressPK, settlementAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
        }catch(err){
            console.log(err);
            reject(err);
        }
    }); 
}
const couponExchangeFromSettlement = async (from, toCoupon, fromCoupon, address, addressPK) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi);
            const encodedData = instSettlement.methods.couponExchange(from, toCoupon, fromCoupon).encodeABI();
            let TxResult = await signTx(address, addressPK, settlementAddress, encodedData).catch((err) => {
                console.log(err);
                reject(err);
            });
            console.log('\nTxResult', TxResult);
            resolve(TxResult);
        }catch(err){
            console.log(err);
            reject(err);
        }
    }); 
}
const deployWallet = async(id, address) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            await unlock().catch(err => {
                reject(err);
            });
            instWallet = await new web3deploy.eth.Contract(Wallet.abi)
            .deploy({ data: Wallet.bytecode, arguments: [id]})
            .send({ from: admin, gas: 3400000 })
            .on('receipt', async function (receipt) {
                console.log('wallet address:', receipt.contractAddress);
                let result = await registerUserToBank(id, address, receipt.contractAddress).catch(err => {
                    console.log(err);
                    reject(err);
                })
                resolve(result);
            })
            .on('error', function (error) {
                console.log('error:', error);
                reject(error);
            });
        } catch(err){
            console.log('err:', err);
            reject(err);
        }
    });
}
const deploySettlement = async(id, address) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            await unlock().catch(err => {
                reject(err);
            });
            instSettlement = await new web3deploy.eth.Contract(Settlement.abi)
            .deploy({ data: Settlement.bytecode, arguments: []})
            .send({ from: admin, gas: 34000000 })
            .on('receipt', async function (receipt) {
                console.log('Settlement address:', receipt.contractAddress);
                resolve(receipt);
            })
            .on('error', function (error) {
                console.log('error:', error);
                reject(error);
            });
        } catch(err){
            console.log('err:', err);
            reject(err);
        }
    });
}
const sendEther = async(address, value) => {
    const toAddress = address;
    const amount = value;
    const amountToSend = web3deploy.utils.toWei(amount, "ether"); //convert to wei value
    var send = web3deploy.eth.sendTransaction({from: admin, to: toAddress, value: amountToSend});
}

const sendSignedTransaction = async(tx) => {
    return new Promise( async (resolve, reject) => {
        console.log("inside")
        web3deploy.eth.sendSignedTransaction(tx)
                    .on('transactionHash', hash => {
                        console.log(hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        console.log('confirmation', confirmationNumber);
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt);
                        resolve(receipt)
                    })
                    .on('error', function (err) {
                        console.log(err);
                        reject(err);
                    })
    })
}
const signFromKeystore = async() => {
    //let account = await web3deploy.eth.accounts.decrypt(keystore, "02282040");
    let result = await transfer(tester1, user1, 1, tester1Address, tester1PrivateKey);
}

let a = [tester1, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6];
//console.log(a.length);
//sendEther(user1Address, "2");
//buyCoupon(tester3, "5dd61e8a3339cfc917a7df71" , 10, tester3Address, tester3PrivateKey);
//buyCoupon(tester1, "5dd61e8a3339cfc917a7df7b" , 10, tester1Address, tester1PrivateKey);

//deployBank();
//transfer(tester1, user1, 1);
//transferBatch(user2, [tester1, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6, tester2, tester3, tester4, tester5, tester6], user2Address, user2PrivateKey, 2);
//createEthAccount();
//getBalance(tester1);
//mint(tester1, 110000);
//searchWallet(tester3);
//searchAddress(user1);
//deployWallet(user1, user1Address);
//deployWallet(tester1, tester1Address);
//deployWallet(tester3, tester3Address);
//deployWallet(tester4, tester4Address);
//deployWallet(tester5, tester5Address);
//deployWallet(tester6, tester6Address);
//unlock();
//signFromKeystore();
//deployWallet(tester5, tester5Address);
//getCoupons(tester1);
//deploySettlement();
//getCouponsPoolFromSettlement();
//getCouponsPoolDetailFromSettlement('5dd61e8a3339cfc917a7df81');
//initSettlement(admin, adminPK);
//couponSoldFromSettlement(tester3, '5de78a7151250b50ebeb1abb', tester3Address, tester3PrivateKey)
//couponExchangeFromSettlement(tester3, '5de78a7151250b50ebeb1aba', '5dd61e8a3339cfc917a7df71', tester3Address, tester3PrivateKey)
//soldToSettlement(tester1, 100, 1000, "5de78a7151250b50ebeb1abb", ["7-11", "全家"], 1, tester1Address, tester1PrivateKey);
async function signTx(userEthAddr, userRawPrivateKey, contractAddr, encodedData) {
    return new Promise( async (resolve, reject) => {
  
        web3deploy.eth.getTransactionCount(userEthAddr)
            .then(nonce => {
                console.log(nonce)
                let userPrivateKey = Buffer.from(userRawPrivateKey.slice(2), 'hex');
                console.log(userPrivateKey);
                let txParams = {
                    nonce: web3deploy.utils.toHex(nonce),
                    gas: 3400000,
                    gasPrice: 0,
                    //gasPrice: web3js.utils.toHex(20 * 1e9),
                    //gasLimit: web3.utils.toHex(3400000),
                    to: contractAddr,
                    value: 0,
                    data: encodedData
                }
  
                let tx = new Tx(txParams);//with min version
                //let tx = new Tx(txParams);//with require()
                tx.sign(userPrivateKey);
                const serializedTx = tx.serialize();
                const rawTx = '0x' + serializedTx.toString('hex');
  
                console.log('☆ RAW TX ☆\n', rawTx);

                //'1' should be replaced by transaction'id. 
                try{
                    pushIntoQueue('1'+','+rawTx, 'transfer');
                    resolve("ok");
                }catch(err){
                    console.log(err);
                    reject(err);
                }
                
                //console.log(rawTx)
                /*
                web3deploy.eth.sendSignedTransaction(rawTx)
                    .on('transactionHash', hash => {
                        console.log(hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        // console.log('confirmation', confirmationNumber);
                    })
                    .on('receipt', function (receipt) {
                        //console.log(receipt);
                        resolve(receipt)
                    })
                    .on('error', function (err) {
                        //console.log(err);
                        reject(err);
                    })*/
                    
            })
  
    })
}
module.exports = {
    searchWallet, searchAddress, getBalance, deployWallet, setUserIdToBank, transfer, buyCoupon, signTx, sendSignedTransaction, soldToSettlement, getCouponsPoolFromSettlement, getCouponsPoolDetailFromSettlement
}