import { getContract, createThirdwebClient } from 'thirdweb';
import { celoAlfajoresTestnet } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc721";
import styles from '../styles/NFT.module.css';

const client = createThirdwebClient({ 
  clientId: import.meta.env.VITE_CLIENTID
});

const contract = getContract({
  client,
  address: import.meta.env.VITE_ADDRESS,
  chain: celoAlfajoresTestnet,
});

const nftData = await getNFT({
  contract,
  tokenId: "0",
});

const NTF = () => {
  return (
	<div className={styles.nft}>
      {nftData && (
        <div>
          <h2>< br/>< br/></h2>
          <img 
            src={nftData.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")} 
            width="500" 
            height="600" 
            alt={nftData.metadata.name}
          />
          <h2 className={styles.center}>{nftData.metadata.description}</h2>
        </div>
      )}	
	</div>
  );
};

export default NTF;
