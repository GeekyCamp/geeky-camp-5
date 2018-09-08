pragma solidity 0.4.24;


import './openzeppelin/IERC20.sol';


contract DDNS {
    struct Domain {
        uint ip;
        address owner;
        bool isBought;
    }
    
    mapping(string => Domain) domains;

    address public owner;
    
    uint constant price = 1; // 1 token

    IERC20 token; //can be a pointer to a published contract which inherits the ERC20 interface

    constructor() public {
        owner = msg.sender;
    }
     
    function buyDomain(string domain) public {
        require(!domains[domain].isBought);
        
        //IMPORTANT: This is withdrawing tokens from the sender.
        //For this to work, the sender must have already given approval to the DDNS contract for that (via ERC20's approval method).
        require(token.transferFrom(msg.sender, address(this), price));
        
        domains[domain] = Domain({ip: 0, owner: msg.sender, isBought: true}); //notice how every field is named. It makes the code easier to read.

    }
    
    function setIP(string domain, uint ip) public {
        require(domains[domain].owner == msg.sender);
        domains[domain].ip = ip;
    }
    
    function getIP(string domain) public view returns (uint) {
        require(domains[domain].isBought);
        return domains[domain].ip;
    }
    
    function withdraw(uint value) public {
        require(msg.sender == owner);
        
        //get the current token balance of the DDNS
        uint bal = token.balanceOf(address(this));
        require(bal >= value);
        
        //Forward to the owner
        require(token.transfer(owner, value));
    }
    
}
