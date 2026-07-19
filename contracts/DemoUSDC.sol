// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Test-only USDC-like token for the WalletFlow hackathon demo.
/// @dev Never present this as real USDC or deploy it where it could be traded.
contract DemoUSDC {
    string public constant name = "WalletFlow Demo USD Coin";
    string public constant symbol = "dUSDC";
    uint8 public constant decimals = 6;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function mint(uint256 amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 permitted = allowance[from][msg.sender];
        require(permitted >= amount, "allowance exceeded");
        if (permitted != type(uint256).max) allowance[from][msg.sender] = permitted - amount;
        _transfer(from, to, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) private {
        require(to != address(0), "zero recipient");
        require(balanceOf[from] >= amount, "insufficient balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}
