import { Link } from 'react-router-dom';
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import styles from '../styles/Navbar.module.css';

const client = createThirdwebClient({ 
  clientId: import.meta.env.VITE_CLIENTID
});

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        Celo DApp
      </div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Send Celo</Link>
        <Link to="/mint" className={styles.navLink}>Mint NFT</Link>
      </div>
      <div>
        <div className={styles.walletButton}>
          <ConnectButton client={client} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
