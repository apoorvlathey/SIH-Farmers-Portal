pragma solidity ^0.5.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract Bidding {
    address public owner;
    
    ERC20 public ERC20Interface;        //To interact with ERC20 token contract
    address tokenContractAddress;
    
    enum auctionState {Created, BiddingStarted, Ended}
    uint endTimeIncrement = 1 * (60*60);     // 1 hour
    
    event AuctionCreated(uint AuctonId, uint farmerId, uint basePricePerKg, uint cropId, uint timeCreated);
    event BidPlaced(address highestBidder, uint highestBid, uint AuctionEndTime);
    
    struct auction {
        uint auctionId;
        uint farmerId;
        uint basePricePerKg;
        uint cropId;
        uint startTime;
        uint endTime;
        auctionState state;
        
        uint highestBid;
        address highestBidder;
    }
    
    auction[] public auctions;
    
    mapping(uint => uint[]) public farmerAuctions;
    mapping(uint => mapping(address => uint)) public buyerBids;   // buyerBids[AuctionId][BuyerAddress] == BuyerTotalBidAmt
    
    constructor(address _tokenContractAddress) public {
        owner = msg.sender;
        tokenContractAddress = _tokenContractAddress;
        ERC20Interface = ERC20(tokenContractAddress);
    }
    
    function newAuction(uint _farmerId, uint _basePricePerKg, uint _cropId) external returns(uint _auctionId) {
        uint aId = auctions.length++;
        farmerAuctions[_farmerId].push(aId);
        
        auction storage a = auctions[aId];
        a.auctionId = aId;
        a.farmerId = _farmerId;
        a.basePricePerKg = _basePricePerKg;
        a.cropId = _cropId;
        a.startTime = now;
        a.endTime = now + 365*24 * 60*60;   //default endtime 1 Year from creation
        a.state = auctionState.Created;
        
        emit AuctionCreated(aId, _farmerId, _basePricePerKg, _cropId, now);
        return aId;
    }
    
    function placeBid(uint _auctionId, uint _bidAmt) public returns(bool success) {
        auction storage a = auctions[_auctionId];
        
        require(a.state != auctionState.Ended, "Auction has Ended");
        if(a.state == auctionState.Created) {
            require(_bidAmt >= a.basePricePerKg);
        }
        if(now > a.endTime) {
            a.state = auctionState.Ended;
            revert();
        }
        require(_bidAmt > a.highestBid, "Bid is less than Highest Bid");
        
        if(buyerBids[_auctionId][msg.sender] > 0) {
            ERC20Interface.transferFrom(msg.sender, address(this), ( _bidAmt - buyerBids[_auctionId][msg.sender] ));
        } else {
            ERC20Interface.transferFrom(msg.sender, address(this), _bidAmt);
        }
        buyerBids[_auctionId][msg.sender] = _bidAmt;
        
        a.endTime = now + endTimeIncrement;
        
        if(a.state == auctionState.Created) {
            a.state = auctionState.BiddingStarted;
        }
        
        a.highestBid = _bidAmt;
        a.highestBidder = msg.sender;
        
        emit BidPlaced(msg.sender, _bidAmt, a.endTime);
        return true;
    }
    
    function getHighestBid(uint _auctionId) public view returns(uint) {
        return auctions[_auctionId].highestBid;
    }
    
    function withdrawTokensAfterAuctionEnded(uint _auctionId) public {
        require(buyerBids[_auctionId][msg.sender] > 0);
        if(now > auctions[_auctionId].endTime && auctions[_auctionId].state == auctionState.BiddingStarted) {
            auctions[_auctionId].state = auctionState.Ended;
        }
        require(auctions[_auctionId].state == auctionState.Ended);
        require(auctions[_auctionId].highestBidder != msg.sender);      //buyers that lost can only withdraw
        ERC20Interface.transferFrom(address(this), msg.sender, buyerBids[_auctionId][msg.sender]);
    }
    
    function tranferContractTokens(address _to, uint _amt) public onlyOwner {
        ERC20Interface.transferFrom(address(this), _to, _amt);
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function transferOwnership (address newOwner) public onlyOwner {
        owner = newOwner;
    }
}