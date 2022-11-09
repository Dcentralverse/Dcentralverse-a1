import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { useState, useEffect } from "react";
import { injected } from "../../utils/helper/connector";


export function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  const contextNetwork = useWeb3ReactCore("Network");
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  
  const { activate, active } = useActiveWeb3React();
  const [tried, setTried] = useState(false);

  // useEffect(() => {
  //   injected.isAuthorized().then((isAuthorized) => {
  //     if (isAuthorized) {
  //       activate(injected, undefined, true).catch(() => {
  //         setTried(true);
  //       });
  //     } else {
  //       setTried(true);
  //     }
  //   });
  // }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useActiveWeb3React()

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        activate(injected)
      }
      const handleChainChanged = (chainId) => {
        activate(injected)
      }
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId) => {
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}