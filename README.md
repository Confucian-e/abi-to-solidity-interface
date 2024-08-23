# Convert Ethereum ABI to Solidity Interface

## Install

```bash
npm install abi-to-solidity-interface
```

## Usage

```typescript
import { abiToSolidityInterface } from "abi-to-solidity-interface";

const abi = [
  {
    inputs: [],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractName = "Counter";

const solidityInterface = abiToSolidityInterface(abi, contractName);
```

```solidity
interface Counter {
  function add();
  function count() external view returns (uint256);
}
```
