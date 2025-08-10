import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import ZoomPlugin from "chartjs-plugin-zoom"
// import Hammer from "hammerjs" // Required for touch gestures

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ZoomPlugin,
)

import type { ChartOptions } from "chart.js"

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
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
      },
    },
  },
}

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const data = {
  labels,
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
  return <Line options={options} data={data} />
}
