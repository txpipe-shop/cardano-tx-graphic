# Cardano-tx-graphic

<span>
A webapp for drawing cardano txs and dissecting cbor information.
</span>

## Requirements

It is recommended to use `Node v18.0.0` or higher.
It is recommended to use bun to run this project.

# How To Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/txpipe-shop/cardano-graphical-tx.git
   cd cardano-graphical-tx
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Configure variables in .env**

   To ensure that the app works correctly, you need to set the appropriate values in the `.env` file.
   <br>

4. **Build**

   ```bash
   bun run build
   ```

5. **Run the app**

   ```bash
   bun run dev
   ```

## Examples to test the app

The following transactions were made on the preprod network.

**Tx CBOR:**

```bash
84a70081825820f17477b3879320a18e72c6a6af1158be2a3decb8dc1b78a19d132248d6da7e150201828258390036e2bc9dc949639b9a2a1ebb1e7177fc2aaa925c945a38a1d3c3450f3d8e7565a718dee1e5f90977a7bb19df19f8b26a8ae38f2052df346e1a001e848082583900cc25b7bd71fa51376b407ce2fbf651c8bd0fc01c247852a68b33b6aea4f93ef1d4968d3be5c65289730cbfa8a81eefd4eac5f781cbe0ed3b821b000000025291ad4ca2581c2b424eb51d04e39cfe7483ffe60eda9c5388d622d2bbb10443631818aa4443424c501b0000082f79cd41e0444d454c441b0000082f79cd41e0474d696e737761701b0000082f79cd41e04c466c61632046496e616e63651b0000082f79cd41e04f4c656e66692044414f20746f6b656e1b0000082f79cd41e04f4f736d69756d44414f20546f6b656e1b0000082f79cd41e050496e6469676f2044414f20546f6b656e1b0000082f79cd41e05247656e697573205969656c6420546f6b656e1b0000082f79cd41e052576f726c64204d6f62696c6520546f6b656e1b0000082f79cd41e0581b57696e6752696465727320476f7665726e616e636520546f6b656e1b0000082f79cd41e0581c77211b30313564b8b11db9c9de94addc5fa305f5d47fd278140eef63a146534f444954411b00005af3107a4000021a00030949031a0264e3be075820b4433ddcd8c3e5d7372766de6b251fc4061e17b25ae33cf1a83b8261320472b809a1581c77211b30313564b8b11db9c9de94addc5fa305f5d47fd278140eef63a146534f444954411b00005af3107a40000e81581ccc25b7bd71fa51376b407ce2fbf651c8bd0fc01c247852a68b33b6aea20082825820e67b8e6b83eebbaa4e3a4e711ce71233a8781caa15d46e671e020f95885c0b035840a7307802e39a3800cdb9166ee443cbdccdb1b5e097488b2e2a6672fda63976131657bba26ec1c5d640610a3ef91ceb8110c0d64f028de89ae39a81af5c0c7102825820143108f515fa7636dd003d39c50b326ac4e9511e95cf9bbd406b35693bdb61d958402899071a05954127244dfea5f3d0be60541059a8b8e3eeb9d4789ff149a0d68fb3cf1b788883280bb9549b4d7732e49cba12ffbfdf58f5b605307db229838b0301818201818200581ccc25b7bd71fa51376b407ce2fbf651c8bd0fc01c247852a68b33b6aef5a11902d1a178383737323131623330333133353634623862313164623963396465393461646463356661333035663564343766643237383134306565663633a166534f44495441a265696d616765782368747470733a2f2f692e6962622e636f2f526a58585370372f736f646974612e706e67646e616d6566534f44495441
```

**Tx Hash:**

   ```bash
   64403900eb882a71f9aae0569b422c0c31a1787092a877ead54afd1b1f713b13
   ```
