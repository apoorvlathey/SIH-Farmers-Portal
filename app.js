const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const auth = require('./services/auth');
const farmerRoute = require('./routes/farmerRoute');
const app = express();
const Buyer = require('./models/buyerSchema');
const Farmer = require('./models/farmerSchema');
const buyerRoute = require('./routes/buyersRoute');
const cropUpdation = require('./routes/cropUpdation');
//const sms = require('./services/sms');
const login = require('./routes/login');
const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const smsRecieve = require('./services/smsRecieve');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

mongoose
  .connect(
    'mongodb+srv://rachit2501:owasp123@cluster0-oh5ch.mongodb.net/test?retryWrites=true://localhost:27017/sihDB',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('Failed to connect to db'));
var tin = [];
app.use('/sms', smsRecieve);
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/shop', function(req, res) {
  res.render('shop');
});

app.get('/cart', function(req, res) {
  res.render('cart');
});

app.get('/update', function(req, res) {
  res.render('update', { tyu: tin });
});

app.use('/farmerCrop', cropUpdation);

app.use('/login', login);
app.use('/buyerregister', buyerRoute);
app.use('/farmerregister', farmerRoute);

app.get('/bidding/:id', (req, res) => {
  res.render('bidding', {
    auctionId: req.params.id,
  });
});

app.get('/:id/:id2', (req, res) => {
  console.log(req.params.id2);
  if (req.params.id2) {
    const string = req.params.id2.substring(1);
    console.log(string);
    console.log(req.params.id);
    const data = JSON.parse(string);
    console.log(typeof data);
    res.render(req.params.id, { ur: data, tyu: data });
  }
});

app.get('/details', auth, async (req, res) => {
  console.log(req.body.aadharnumber);
  const foundFarmers = await Farmer.findOne({
    aadharnumber: req.body.aadharnumber,
  });
  console.log(req.params.id);
  if (foundFarmers) {
    res.send(foundFarmers);
  }
});

app.get('/:id', (req, res) => {
  res.render(req.params.id);
});

app.get('/bidding/:id', (req, res) => {
  res.render('bidding', {
    auctionId: req.params.id,
  });
});

app.post('/register', function(req, res) {
  var t = req.body.type;
  console.log(req.body);
  if (t == 'farmer') res.redirect('/farmerregister');
  else {
    res.redirect('/buyerregister');
  }
});

app.post('/update', auth, async function(req, res) {
  console.log(req.body.cropname);
  console.log(req.body.quantity);
  console.log(req.body.price);
  console.log(req.body.aadharnumber);

  const promise = Farmer.updateOne(
    { aadharnumber: req.body.aadharnumber },
    {
      $push: {
        crop: {
          name: req.body.cropname,
          quantity: req.body.quantity,
          price: req.body.price,
        },
      },
      function(err) {
        if (err) {
          console.log('Something wrong when updating data!');
        } else {
          console.log('Successfully  updated crop in farmer');
        }
      },
    }
  );
  promise.then(() => {
    console.log('sajkdbhsajkd');
    res.redirect('/details');
  });
});

app.post('/sendtokens', (req, res) => {
  const sendAmt = body.body.amt;
  var toAddress = req.body.addr;
  web3js = new web3(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/1dc641a8f6b046aabe9fb3d587984e30'
    )
  );

  var myAddress = '4E04768CDD20e35EE87e6a89fC5B920f9492ffC5';
  var privateKey = Buffer.from(
    '8B090EB2E3D9AF5068B819FFBFC0EC07BF17484F0BC2977BFC6EE13BB61DE596',
    'hex'
  );

  //contract abi is the array that you can get from the ethereum wallet or etherscan
  var contractABI = [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_spender', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'biddingContractAddress',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_value', type: 'uint256' }],
      name: 'burn',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_contractAddress', type: 'address' }],
      name: 'setContractAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_target', type: 'address' },
        { name: '_mintedAmount', type: 'uint256' },
      ],
      name: 'mintToken',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'newOwner', type: 'address' }],
      name: 'transerOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        { name: '', type: 'address' },
        { name: '', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { name: 'tokenName', type: 'string' },
        { name: 'tokenSymbol', type: 'string' },
        { name: 'initialSupply', type: 'uint256' },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: '_from', type: 'address' },
        { indexed: true, name: '_to', type: 'address' },
        { indexed: false, name: 'tokens', type: 'uint256' },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: '_tokenOwner', type: 'address' },
        { indexed: true, name: '_spender', type: 'address' },
        { indexed: false, name: 'tokens', type: 'uint256' },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: '_from', type: 'address' },
        { indexed: false, name: '_value', type: 'uint256' },
      ],
      name: 'Burn',
      type: 'event',
    },
  ];
  var contractAddress = '0x2E82e2858357F5eaCe2ffA64da3eeF0661Ed4691';
  //creating contract object
  var contract = new web3js.eth.Contract(contractABI, contractAddress);

  var count;
  // get transaction count, later will used as nonce
  web3js.eth.getTransactionCount(myAddress).then(function(v) {
    console.log('Count: ' + v);
    count = v;
    var amount = web3js.utils.toHex(sendAmt);
    //creating raw tranaction
    var rawTransaction = {
      from: myAddress,
      gasPrice: web3js.utils.toHex(20 * 1e9),
      gasLimit: web3js.utils.toHex(210000),
      to: contractAddress,
      value: '0x0',
      data: contract.methods.transfer(toAddress, amount).encodeABI(),
      nonce: web3js.utils.toHex(count),
    };
    console.log(rawTransaction);
    //creating transaction via ethereumjs-tx
    var transaction = new Tx(rawTransaction);
    //signing transaction with private key
    transaction.sign(privateKey);
    //sending transacton via web3js module
    web3js.eth
      .sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      .on('transactionHash', console.log);

    // contract.methods.balanceOf(myAddress).call()
    //   .then(function (balance) { console.log(balance) });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server is running on Port 3001');
});
