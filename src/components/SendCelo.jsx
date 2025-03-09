import { TransactionButton } from "thirdweb/react";
import { createThirdwebClient, toWei } from "thirdweb";
import { prepareTransaction } from "thirdweb/transaction";
import { useState } from 'react';
import styles from '../styles/SendCelo.module.css';
import { defineChain } from "thirdweb/chains";

const celoAlfajores = defineChain({
  id: 44787,
  name: "Celo Alfajores",
  rpc: "https://alfajores-forno.celo-testnet.org", 
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  blockExplorers: {
    default: { name: "CeloScan", url: "https://alfajores.celoscan.io" },
  },
  testnet: true,
});

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENTID,
});

const SendCelo = () => {

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <div className={styles.layout}>
	  <h1><br /></h1>
      <h1 className={styles.title}>Send Celo</h1>
      <div>
        <label>
          Recipient Address: &nbsp;
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient address"
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Amount (in CELO): &nbsp;
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
        <p></p>
      </div>
      <div className={styles.button}>
      <TransactionButton
        transaction={() => {
          if (!recipient || !amount) {
            throw new Error("Recipient and amount are required");
          }

          const transaction = prepareTransaction({
            to: recipient,
            chain: celoAlfajores,
            client: client,
            value: toWei(amount),
          });
          
          console.log("Prepared Transaction:", transaction);
          return transaction;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction sent:", result);
          alert("Transaction sent successfully!");
          
          setAmount("");
          setRecipient("");
        }}
        onError={(error) => {
          console.error("Transaction failed:", error);
          alert("Transaction failed: " + error.message);
        }}
      >
        Confirm Transaction
      </TransactionButton>
      </div>
    </div>
  );
};

export default SendCelo;
