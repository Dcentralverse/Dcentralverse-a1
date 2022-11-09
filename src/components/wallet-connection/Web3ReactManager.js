import { useEffect, useState } from "react";
import {
  useActiveWeb3React,
  useEagerConnect,
  useInactiveListener,
} from "./useWalletConnect";
export default function Web3ReactManager({ children }) {
  const { connector } = useActiveWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
      
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  return children;
}
