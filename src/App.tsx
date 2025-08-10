// import "./App.css"
// import { Counter } from "./features/counter/Counter"
// import logo from "./logo.svg"

import { Chart } from "./components/chart"
import { InputInvoice } from "./components/inputInvoice"
import { socket } from "./utils/socket"
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles.css"
import InvoiceCard from "./components/invoiceCard"
import { useEffect } from "react"

export const App = () => {
  useEffect(() => {
    console.log("Connecting to socket server...")
    socket.connect() // Connect to the server

    socket.on("connect", () => {
      console.log("Connected to server")
    })

    socket.on("message", data => {
      console.log("Received message:", data)
      // Update state or perform actions based on the received data
    })

    return () => {
      socket.disconnect() // Disconnect when the component unmounts
    }
  }, [])
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}

      <InputInvoice />
      <InvoiceCard />
      <Chart />
    </div>
  )
}
