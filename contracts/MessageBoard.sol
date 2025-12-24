// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MessageBoard {
    struct Message {
        string text;
        uint256 likes;
    }

    mapping(address => Message) public messages;
    address[] public authors;

    event MessageWritten(address indexed user, string text);
    event MessageUpdated(address indexed user, string text);
    event MessageLiked(address indexed liker, address indexed author);

    function writeMessage(string calldata _text) external {
        if (bytes(messages[msg.sender].text).length == 0) {
            authors.push(msg.sender);
        }

        messages[msg.sender].text = _text;
        emit MessageWritten(msg.sender, _text);
    }

    function updateMessage(string calldata _text) external {
        require(bytes(messages[msg.sender].text).length != 0, "No message");
        messages[msg.sender].text = _text;
        emit MessageUpdated(msg.sender, _text);
    }

    function likeMessage(address _author) external {
        require(bytes(messages[_author].text).length != 0, "No message");
        messages[_author].likes++;
        emit MessageLiked(msg.sender, _author);
    }

    function getAllAuthors() external view returns (address[] memory) {
        return authors;
    }
}