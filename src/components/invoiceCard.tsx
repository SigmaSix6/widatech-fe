/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState, Suspense } from "react"
import { getInvoice, getTotalInvoice } from "../utils/server"

// type InvoiceProps = {
//   invoiceId: string
// }

const InvoiceDetails: React.FC = () => {
  const [invoice, setInvoice] = useState<{
    invoice_no: string
    total_price_sum: number
    date: string
    customer: string
    salesperson: string
    notes: string
  } | null>(null)

  const [index, setIndex] = useState(0)
  // const [currIndex, setCurrIndex] = useState(0)
  const [totalDataLength, setTotalDataLength] = useState(0)

  const hitApi = (idx: number) =>
    getInvoice(String(idx)).then(data => {
      const isoDate = data[0].date
      const d = new Date(isoDate)
      const day = String(d.getDate()).padStart(2, "0")
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const year = String(d.getFullYear())
      const formatted = `${day}-${month}-${year}`
      data[0].date = formatted // Format date to DD-MM-YYYY
      setInvoice(data[0])
    })

  const getDataLength = () => {
    void getTotalInvoice().then(data => {
      setTotalDataLength(data[0].length)
    })
  }

  useEffect(() => {
    // let mounted = true
    // getInvoice().then(data => {
    //   console.log(data)
    //   if (mounted) setInvoice(data[0])
    // })
    // return () => {
    //   mounted = false
    // }
    getDataLength()
    void hitApi(index)
  }, [index])

  if (!invoice) {
    return <div>Loading invoice...</div>
  }

  return (
    <div>
      <h3 style={{ color: "white" }}>Invoice #{invoice.invoice_no}</h3>
      <p>Date: {invoice.date}</p>
      <p>Customer: {invoice.customer}</p>
      <p>Salesperson: {invoice.salesperson}</p>
      <p>Amount: RP.{invoice.total_price_sum}</p>
      <p>Notes: {invoice.notes}</p>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${index === 0 ? "disabled" : ""}`}
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1)
              }
            }}
          >
            <a className="page-link" href="#" tabIndex={-1}>
              Previous
            </a>
          </li>

          {/* <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li> */}
          <li
            className={`page-item ${index === totalDataLength - 1 ? "disabled" : ""}`}
            onClick={() => {
              if (index < totalDataLength - 1) {
                setIndex(index + 1)
              }
            }}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

// Lazy load the InvoiceDetails component
const LazyInvoiceDetails = React.lazy(() =>
  Promise.resolve({ default: InvoiceDetails }),
)

const InvoiceCard: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "30vh",
    }}
  >
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        width: 300,
      }}
    >
      <Suspense fallback={<div>Loading card...</div>}>
        <LazyInvoiceDetails />
      </Suspense>
    </div>
  </div>
)

export default InvoiceCard
