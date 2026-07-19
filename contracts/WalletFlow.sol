// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
}

/// @notice Atomic, USDC-style payment routing for WalletFlow links.
/// @dev The payer approves this contract, then calls pay(). Percentages must total 10,000 bps.
contract WalletFlow {
    uint16 private constant BPS = 10_000;

    struct Recipient { address wallet; uint16 bps; }
    struct PaymentLink { address owner; address token; uint256 amount; bool active; Recipient[] recipients; }

    uint256 public nextLinkId;
    mapping(uint256 => PaymentLink) private links;

    event LinkCreated(uint256 indexed linkId, address indexed owner, address indexed token, uint256 amount);
    event PaymentProcessed(uint256 indexed linkId, address indexed payer, address indexed token, uint256 amount);

    function createLink(address token, uint256 amount, Recipient[] calldata recipients) external returns (uint256 linkId) {
        require(token != address(0), "token required");
        require(amount > 0 && recipients.length > 0 && recipients.length <= 8, "invalid link");
        uint256 total;
        linkId = nextLinkId++;
        PaymentLink storage link = links[linkId];
        link.owner = msg.sender;
        link.token = token;
        link.amount = amount;
        link.active = true;
        for (uint256 i; i < recipients.length; i++) {
            require(recipients[i].wallet != address(0) && recipients[i].bps > 0, "invalid recipient");
            total += recipients[i].bps;
            link.recipients.push(recipients[i]);
        }
        require(total == BPS, "must total 100%");
        emit LinkCreated(linkId, msg.sender, token, amount);
    }

    function pay(uint256 linkId) external {
        PaymentLink storage link = links[linkId];
        require(link.active, "inactive link");
        link.active = false; // payment links are one-time and replay-safe
        require(IERC20(link.token).transferFrom(msg.sender, address(this), link.amount), "payment failed");
        uint256 distributed;
        for (uint256 i; i < link.recipients.length; i++) {
            uint256 share = i + 1 == link.recipients.length ? link.amount - distributed : link.amount * link.recipients[i].bps / BPS;
            distributed += share;
            require(IERC20(link.token).transfer(link.recipients[i].wallet, share), "distribution failed");
        }
        emit PaymentProcessed(linkId, msg.sender, link.token, link.amount);
    }

    function getLink(uint256 linkId) external view returns (address owner, address token, uint256 amount, bool active, Recipient[] memory recipients) {
        PaymentLink storage link = links[linkId];
        return (link.owner, link.token, link.amount, link.active, link.recipients);
    }
}
