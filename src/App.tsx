import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useConnect, useDisconnect, useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import SessionConnector from "@cartridge/connector/session";

function App() {
  const { account } = useAccount();
  const { connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const sessionConnector = useMemo(
    () => connectors[0] as SessionConnector,
    [connectors]
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {account ? (
          <button onClick={() => disconnect()}> disconnect </button>
        ) : (
          <button onClick={() => sessionConnector.connect()}>connect</button>
        )}
      </div>
    </>
  );
}

export default App;
