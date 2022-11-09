import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import Sidebar from "./components/sidebar";
import {Buffer} from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {

  // function getLibrary(provider) {
  //   return new Web3(provider);
  // }
  return (
    <>
      {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      <Sidebar />
    {/* </Web3ReactProvider> */}
    </>
  );
}

export default App;
