pragma solidity 0.4.24;

import './openzeppelin/ERC20.sol';

contract Token is ERC20 {
    
    constructor() public {
        _totalSupply = 1000000; //this is the amount of tokens created initially.
        //There won't be any more!
        
        _mint(msg.sender, _totalSupply); //give everything to the owner at the start
    }
    
}
