import React, { useState, useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartData } from "chart.js/auto";

interface EventData {
  id: string;
  project: string;
  task: string;
  description: string;
  start: string;
  end: string;
  duration: string; // Duration format: "0h 30min"
  __v: number;
}

interface BarChartProps {
  data: EventData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (selectedDate) {
      if (chartRef.current) {
        if (chartInstanceRef.current) {
          // Destroy the previous chart instance before creating a new one
          chartInstanceRef.current.destroy();
        }

        const groupedData: { [task: string]: number } = {};

        const filteredData = data.filter((event) => {
          const startDate = event.start.split("T")[0];
          return startDate === selectedDate;
        });

        filteredData.forEach((event) => {
          const durationInHours = parseDurationToHours(event.duration);
          if (groupedData[event.task]) {
            groupedData[event.task] += durationInHours;
          } else {
            groupedData[event.task] = durationInHours;
          }
        });

        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          const chartData: ChartData = {
            labels: Object.keys(groupedData), // Use the tasks as labels
            datasets: [
              {
                label: "Event Durations",
                data: Object.values(groupedData), // Use the total durations as data
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          };

          const chartConfig: ChartConfiguration = {
            type: "bar",
            data: chartData,
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Duration (hours)",
                  },
                },
              },
            },
          };

          chartInstanceRef.current = new Chart(ctx, chartConfig);
        }
      }
    }
  }, [data, selectedDate]);

  // Function to parse the duration string (e.g., "0h 30min") into hours
  const parseDurationToHours = (duration: string): number => {
    const hours = parseInt(duration.split("h")[0]);
    const minutes = parseInt(duration.split(" ")[1].split("min")[0]);
    return hours + minutes / 60;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="text-black">
      <div
        className="bg-white text-black"
        style={{ width: "800px", height: "500px" }}
      >
        <div className="pt-6 pl-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={
              selectedDate
                ? { borderColor: "black", backgroundColor: "white" }
                : { borderColor: "black", backgroundColor: "white" }
            }
          />
        </div>
        <canvas ref={chartRef} />

        <style>{`
      /* Additional styles for the input field */
      input[type="date"] {
        /* Customize the appearance of the calendar dropdown arrow (optional) */
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        /* Add your desired styles here, such as borders, padding, etc. */
        border: 1px solid black; /* Set the border color to black */
        background-color: white; /* Set the background color to white */
        /* You can add more styles here as needed */
      }

      /* Style the date picker's calendar icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(100%); /* Set the icon color to black */
      }

      /* Optional: Remove the default border on focus (if you prefer) */
      input[type="date"]:focus {
        outline: none;
      }
    `}</style>
      </div>
    </div>
  );
};

export default BarChart;
