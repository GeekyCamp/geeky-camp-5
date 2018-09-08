pragma solidity 0.4.24;

contract Counter {
    address owner;
    uint public counter; //by default, this is initialized to 0
    
    constructor() public {
        owner = msg.sender;
    }
    
    function count() public {
        require(msg.sender == owner && counter + 1 > counter);
        counter ++;
    }
}

