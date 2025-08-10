import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js"
import { Line } from "react-chartjs-2"
import ZoomPlugin from "chartjs-plugin-zoom"
import "chartjs-adapter-date-fns"
// import Hammer from "hammerjs" // Required for touch gestures

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ZoomPlugin,
)

import type { ChartOptions } from "chart.js"

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]

const labels = [
  "2025-01-01",
  "2025-02-01",
  "2025-03-01",
  "2025-04-01",
  "2025-05-01",
  "2025-06-01",
  "2025-07-01",
  "2025-08-01",
  "2025-09-01",
  "2025-10-01",
  "2025-11-01",
  "2025-12-01",
]

export const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      type: "time", // Assuming a time scale
      time: {
        unit: "day", // Initial unit
        displayFormats: {
          day: "mmm d",
        },
      },
      // labels: labels, // Ensure labels are also set here if needed
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Invoice Chart",
    },

    zoom: {
      pan: {
        enabled: true,
        mode: "xy" as const, // Pan along both x and y axes
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy" as const, // Zoom along both x and y axes
        onZoom: ({ chart }) => {
          const xMin = chart.scales.x.min
          const xMax = chart.scales.x.max
          const timeSpan = xMax - xMin // Milliseconds difference
          // console.log(timeSpan)
          let newUnit = "day"
          let newFormat = "MMM dd"

          if (timeSpan < 3600000 * 24 * 7) {
            // Less than 7 days
            newUnit = "hour"
            newFormat = "MMM dd, h:mm a"
          } else if (timeSpan < 3600000 * 24 * 30) {
            // Less than 30 days
            newUnit = "day"
            newFormat = "MMM dd"
          } else {
            newUnit = "month"
            newFormat = "MMM yyyy"
          }

          chart.options.scales.x.time.unit = newUnit
          chart.options.scales.x.time.displayFormats[newUnit] = newFormat

          chart.update()
        },
      },
    },
  },
}

export const data = {
  // labels,
  datasets: [
    {
      label: "Dataset 1",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [-500, 100, 200, -300, 400, -200, 300],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [-200, 300, -100, 400, -500, 200, 100],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}

export function Chart() {
  return (
    <div className="my-4">
      <Line options={options} data={data} />
    </div>
  )
}
