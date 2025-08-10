import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import { insertInvoice } from "../utils/server.ts"
import monitor from "../assets/monitor.webp"
import headphone from "../assets/headphone.webp"
import laptop_charger from "../assets/laptopCharger.webp"
import bluetooth_speaker from "../assets/bluetoothSpeaker.webp"
type Inputs = {
  date: string
  customer_name: string
  sales_name: string
  payment_type: string
  notes: string
  multi_product_sold: object[]
}
const InputInvoice = () => {
  const {
    register,
    control,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = data => {
    void insertInvoice(data).then(res => {
      if ((res as { status: number }).status === 200) {
        alert("Invoice inserted successfully")
      } else {
        alert(
          "Failed to insert invoice " +
            `(${String((res as { status: number }).status)})`,
        )
      }
    })
  }
  const options = [
    {
      image: bluetooth_speaker,
      value: ["bluetooth speaker", 3, 1000, 3000],
      label: "Bluetooth Speaker / 3 / 1000",
    },
    {
      image: headphone,
      value: ["headphone", 6, 1000, 6000],
      label: "Headphone / 6 / 1000",
    },
    {
      image: laptop_charger,
      value: ["laptop charger", 2, 10000, 20000],
      label: "Laptop Charger / 2 / 10000",
    },
    {
      image: monitor,
      value: ["lcd monitor", 1, 100000, 100000],
      label: "LCD Monitor / 1 / 100000",
    },
  ]
  return (
    <form
      onSubmit={e => {
        void handleSubmit(onSubmit)(e)
      }}
    >
      <label>Date</label>
      <input type="date" {...register("date", { required: true })} />
      {errors.date && <p>This field is required</p>}
      <label>Customer Name</label>
      <input {...register("customer_name", { required: true })} />
      {errors.customer_name && <p>This field is required</p>}
      <label>Sales Name</label>
      <input {...register("sales_name", { required: true })} />
      {errors.sales_name && <p>This field is required</p>}
      <label>Payment Type</label>
      <input {...register("payment_type", { required: false })} />
      <label>Notes</label>
      <textarea {...register("notes", { required: false })} />
      <label>Product Sold</label>
      <Controller
        name="multi_product_sold" // Unique name for your select input
        control={control}
        rules={{ required: "This field is required" }} // Add validation rules as needed
        render={({ field }) => (
          <Select
            {...field} // Spreads onChange, onBlur, and value props from Controller
            isMulti
            options={options} // Your array of select options
            isClearable // Optional: allows clearing the selection
            placeholder="Select an option..."
            formatOptionLabel={data => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img
                  src={data.image}
                  alt="item-image"
                  style={{ height: "30px" }}
                />
                <span>{data.label}</span>
              </div>
            )}
          />
        )}
      />
      {errors.multi_product_sold && <p>This field is required</p>}
      <input type="submit" value="Submit Invoice" />
    </form>
  )
}

export { InputInvoice }
