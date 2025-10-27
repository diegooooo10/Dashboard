import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { useIsDesktop } from "../../utils";
import { THEME_KEY } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type HorizontalGraphicProps = {
  label: string;
  textDescription: string;
  dataChart: number[];
  labels: string[];
};
const Graphic = ({
  label,
  textDescription,
  dataChart,
  labels,
}: HorizontalGraphicProps) => {
  const isDesktop = useIsDesktop();
  const theme = document.body.getAttribute(THEME_KEY);

  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: textDescription,
        data: dataChart,
        backgroundColor: "#2563eb",
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    indexAxis: isDesktop ? "y" : "x",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: theme === "dark" ? "#f9fafb" : "#111827",
        },
      },

      title: {
        display: true,
        text: label,
        color: theme === "dark" ? "#f9fafb" : "#111827",
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: theme === "dark" ? "#f9fafb" : "#111827",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: theme === "dark" ? "#f9fafb" : "#111827",
        },
      },
    },
  };

  return (
    <Bar data={data} options={options} className="max-h-96 w-auto max-w-full" />
  );
};

export default Graphic;
