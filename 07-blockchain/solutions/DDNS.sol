pragma solidity 0.4.24;
contract DDNS {
    struct Domain {
        uint ip;
        address owner;
        bool isBought;
    }
    
    mapping(string => Domain) domains;

    address public owner;
    
    uint constant price = 1 ether;

    constructor() public {
        owner = msg.sender;
    }
     
    function buyDomain(string domain) public payable {
        require(!domains[domain].isBought && msg.value >= price);
        domains[domain] = Domain({ip: 0, owner: msg.sender, isBought: true}); //notice how every field is named. It makes the code easier to read.

        uint difference = msg.value - price;

        if (difference > 0) {
            msg.sender.transfer(difference); // refund the extra
        }
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
        owner.transfer(value);
    }
    
}
