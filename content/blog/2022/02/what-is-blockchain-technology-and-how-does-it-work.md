---
title: What Is Blockchain Technology And How Does It Work?
author: Andrew M McCall
date: 2022-02-16 00:00:00
image: "/images/blog/2022/ethereum-article-twitter-card/ethereum-article-header.png"
images:
- "/images/blog/2022/ethereum-article-twitter-card/ethereum-article-header.png"
tags:
- Blockchain
- Ethereum
- Smart Contracts
- Web 3.0
- Javascript
- Solidity
Description: Everything you need to know about the basics of Ethereum, blockchain
  technology, and smart contracts with a bit of Solidity.
draft: false
---

## What Is Blockchain Technolology, Ethereum, Smart Contracts: Explained

Feeling confused about the blockchain, Ethereum, or smart contracts?  This article aims to give a general introduction to the components and principles of the blockchain and help newcomers understand some of the terms and definitions behind this newer and exciting technology. 

## What is the Blockchain?

The blockchain is a decentralized network of computers.  Furthermore, it is continously growing in size.  This is because the blockchain is designed to store a decentralized public ledger of information.  The blocks are then chained together with cryptography.  Each block contains it's own copy of the public ledger and a crytpographic hash of the previous record.   The blockchain is excellent for recording monetary transactions.  

## Anatomy Of A Transaction

Unlike traditional bank transaction, Ethereum and blockchain transactions are a bit more complex to execute.  This is because the decentralized technology aims to be as secure as possible and presupposed a minimal level of immutability which is a cornerstone of the blockchain technology.  

Here are some of the essential parts of an Ethereum transaction:

**NONCE:** How many times the sender has sent a transaction.  Regarding the blockchains: Refers to **a number only used once.** Which is a number added to a hashed or encrypted block in a blockchain that, when rehashed, meets the difficulty level restrictions.  

**TO:** Address of account that the transaction data (money) is going to be sent to

**VALUE:**  Amount of ether to send to targeted address

**Gas Price :** A term used on the Ethereum platform that refers to the **price you are willing to pay for a transaction**

**Start Gas / Gas Limit:** unit of gas that this transaction can consume

**V, R, S:  A**re the **values for the transaction's signature**
They can be used as in Get public key of any Ethereum account A little more information, r and s are outputs of an ECDSA signature, and v is the recovery id.

**V,R,S is a one way process.**

****

![Ethereum Transaction Explained](/images/blog/2022/ethereum-transaction.png "A basic ethereum transaction")

Source: [ETHEREUM — What? How? Why?. What is Ethereum? Learn about a… | by Vritika Naik | The Capital | Medium](https://medium.com/the-capital/ethereum-what-how-why-b4be4308629d)

## Blockchain Nodes

The blockchain is made up of nodes.  Each node contains and entire copy of the blockchain.

The transaction arrives at the node.

Multiple transactions can be happening asynchronously at the same time on the node.  

The node assembles the transactions into a “block” which is similar to a list or even a ledger.

The node then performs validation calculations the block.  This is what we would refer to as mining.  

## Notes On Mining

**What is the SHA-256 Algorithm?**

SHA 256 is a part of the SHA 2 family of algorithms, where SHA stands for Secure Hash Algorithm. Published in 2001, it was a joint effort between the NSA and NIST to introduce a successor to the SHA 1 family, which was slowly losing strength against brute force attacks.

The significance of the 256 in the name stands for the final hash digest value, i.e. irrespective of the size of plaintext/cleartext, the hash value will always be 256 bits.

The other algorithms in the SHA family are more or less similar to SHA 256. 

Transactions each contain a unique digital fingerprint for the data it contains.  This is created using SHA-256.  What is unique about SHA-256 is that it will always return 256 bits regardless of the data into the hash. 

 

Simply put, it will always have the same length and key if the data remains un-mutated.  

The goal of the blockchain is to record all transactions and keep the record as immutable as possible.  The Blockchain wants to keep past transactions unchanged as possible.  

When transactions are modified it changes the value of the unique SHA-256 fingerprint.  Mining must take place to calculate a new **nonce** such that the value, when added to hashed or encrypted block, that when rehashed meets the difficult level restrictions. 

Since the record of the SHA-256 is passed to future blocks as the **“previous sha-256 value,”**  this requires multiple re-mining events.  Another way to say this: If one block’s sha-256 value becomes invalidated, it can affect the other blocks as well.  If one block is changed, re-mining will need to occur on cascading blocks.  

This means that the further back in time a block is, the more difficult it is to change due to added complexity of re-hashing.  

## Distributed Blockchain

The blockchain wouldn’t be valuable if it couldn’t maintain the integrity of it’s data.  That is why the block chain is distributed across a network.  The distributed network makes up a group of peers where a complete copy of the blockchain is stored on each.  This is similar to a checks and balances system.

When transactions are created and tokens are being passed between parties, it is important to resist the modification of the past and maintain the integrity of the passed stored transactions.  

In the example of a coinbase transaction, having a copy of the previous hash makes tracing the transaction easier and mutation of the transaction record more difficult.  

## Tokens: Resist Modification Of Blockchain Transactions

Let’s take a moment to summarize what we have learned so far.

Since blockchains are by default trustless, global, and permanent, and that all the data is stored across the network in such a way that anyone who uses the blockchain can know it’s transactional history, This is because blockchain transactions are recorded to a public-facing general ledger on it’s respective node network.

Additionally:

> [Smart contracts](https://blockgeeks.com/guides/smart-contracts/)
 are how things get done in the Ethereum ecosystem. When someone wants to get a particular task done in [ethereum](https://blockgeeks.com/guides/ethereum/)
 they initiate a smart contract with one or more people. S**mart contracts are a series of instructions, written using the programming language “[solidity](https://blockgeeks.com/guides/how-to-learn-solidity/)”, which work on the basis of the IFTTT logic aka the IF-THIS-THEN-THAT logic**
. Basically, if the first set of instructions are done then execute the next function and after that the next and keep on repeating until you reach the end of the contract
> 

Source: [What is An Ethereum Token: The Ultimate Beginner’s Guide - Blockgeeks](https://blockgeeks.com/guides/ethereum-token/)

To summarize, **smart contracts** are **how** things get done in Ethereum.  

**Ether** is the name of Ethereum’s currency that is exchanged for value. 

To continue our point regarding tokens, it is important to understand that Ethereum is not just a transactional currency but it is also an Environment as well.  Anyone can utilize the blockchain to create decentralized applications and personal projects.  Smart contracts are able to tie together traditional web 2.0 interfaces built with technologies like Javascript and the Ethereum network.  

Since applications deployed to the Ethereum network are decentralized, they are traditionally not owned by single people but groups of people.  This means that people typically buy into an application through what is referred to as an [ICO (Initial Coin Offering)](https://www.gemini.com/cryptopedia/initial-coin-offering-explained-ethereum-ico).  

To summarize what an ICO is from gemini.com:

> *An Initial Coin Offering (ICO), also known as a token sale, is an asset distribution methodology that involves selling digital assets to raise funds for a blockchain-based project. ICOs first became popular in 2017, and they’ve since raised billions of dollars for a wide variety of crypto projects. The explosive growth of token sales helped to accelerate the adoption of Ethereum and cemented its place as a key value player in the crypto ecosystem.*
> 

Source: [Initial Coin Offerings: The Ethereum ICO Boom | Gemini](https://www.gemini.com/cryptopedia/initial-coin-offering-explained-ethereum-ico)

What this means is that a person buys tokens that are associated with a decentralized application in exchange for Ether.  

## Two Types Of Tokens

### Usage Tokens

Usage tokens basically act like native currency inside of the decentralized app.  This is not a foreign concept to many.  For example, when you go to your local carnival or fair, you often exchange money for tickets. These tickets are the currency to use the rides.  

This principal can be extended to usage tokens.  Golem Network Tokens are a good example of this.  Golem is a worldwide supercomputer that utilizes the power of each computer in it’s network.  Golem Network Tokens are what you use to pay for the computer processing power you rent from the network.  

Source: [What Is Golem (GNT)? | A Guide to the Decentralized Supercomputer (coincentral.com)](https://coincentral.com/golem-gnt-beginners-guide/)

### Work Tokens

> Work Tokens are tokens that give individuals rights to contribute work to aDAO (and earn value) to help it function properly.
> 

Source: [Tokens, Tokens and More Tokens. Over $331M has been raised in token… | by Nick Tomaino | The Control](https://thecontrol.co/tokens-tokens-and-more-tokens-d4b177fbb443)

Essentially, work tokens are a way to identify you as a type of shareholder in relation to the decentralized application or organization.  This means that you have a say in the direction of the application or organization.  It also means that you can earn directly from your involvement with the organization or application. 

 

The idea, simplified in this example, is that using tokens makes certain functions within the smart contracts easier to execute which is win-win for everyone.  Tokens can also add overall value to Ether as well.  

Since this is meant to be a simplified introduction, if you want to learn more about how Tokens work and they receive their value you can read about it here: [What is An Ethereum Token: The Ultimate Beginner’s Guide - Blockgeeks](https://blockgeeks.com/guides/ethereum-token/)

## Blockchains are Public and Designed To Be Immutable

The point being made here is that Ethereum transactions are designed to be publicly available and also as immutable as possible.  For example, with Coinbase transactions, the previous hash value is always stored so that transactions can be retained and verifiable.  This is good because it  again helps resist mutation.   Creating new SHA-256 hashes for each transaction is the bread and butter of what mining is. 

When a transaction is created, the block is designed to solve some level of secure specificity to satisfy a security standard.  When the SHA-256 hash changes some data, the block needs to reprocess to ensure the new hash meets the complexity requirements.  

Another way of putting this is that we are looking at the value of the hash to determine that it is less than some target value.  The entire process of rehashing takes time which we refer to as block time.  

## What Is Block Time?

Block time can be defined as the amount of time it takes to hash everything from zero to the target nonce value that meets the complexity requirement that is predetermined.  Once the block has found the solution, it has to distribute the solution to all the other nodes.  

One interesting note is that Ethereum has a target block time of 15 seconds.  The target is variable and adjusts over time.  The goal here is that the complexity target for solving nodes is going to change to dynamically adjust the block time to always be near that 15 seconds.  

One of the reasons that the block time is always being adjusted is because Ethereum is a distributed network so available computing power is always changing depending on the amount of processing attached to the network.  

## What Are Smart Contracts And How To Smart Contracts Work

A simple definition of smart contracts is that they are an account that is controlled by some code.  This is typically written with Solidity using a simple programming paradigm such as IF-THIS-THEN-THAT logical structures.  

It will usually include the balance that the account owns, a data storage for the contract, and the code for when the contract needs to run.  

![How A Smart Contract Works](/images/blog/2022/smart-contract-schematic.png "How a smart contract works")

Source: [Smart Contracts 101 – PayNinja](https://www.payninja.co/smart-contracts/)

## Account vs Contract Account - Ethereum

External accounts live in their own type of universe.  

Contract accounts are specific to their network.  There is no communication between networks with contract accounts.  

Contract Source: This is the code that we author on our computer.  We then deploy the code to the network.  This is the logic that controls how the contract should behave and how it handles money.  

The source code gets deployed to the network (such as Ethereum or a test network like Rinkeby).

The deployed contract code creates an “instance” which we refer to as a contract account.  We can take one contract source code and deploy it multiple times.  If you are a developer, one way to think of contract accounts is that they are like “classes”.  We can build it than deploy multiple instances of the same class to the networks.  

## Solidity Programming Language | Smart Contracts | Ethereum Network

Solidity is a strongly-typed programming language that is used to create smart contracts on the Ethereum network.  It’s extension is .sol.  It is similar to Javascript but does has some large quirks to it that make it different in some respects.  The contracts we write are usually pretty small.  So how is Solidity used then? 

We write contract definitions using solidity which takes the contract definitions and stuffs it into a compiler.  This produces byte code that is ready for deployment.  It acts as an application binary interface to interact between our front end and the Ethereum network.  This is because after we deploy the smart contract we typically use something like Javascript to interact with the byte code directly as it is deployed on the blockchain.  

## Conclusion

I hope this helps you understand a bit about the Ethereum network, blockchain, and smart contracts.  The goal is not to cover everything, but give a simplified introduction for those who are new to the blockchain and Ethereum.  If you have any questions you can contact me or reach out to me @elkcityhazard on twitter.