import React from "react";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export default function ContractDatesGraph({ PRdate, POdate, InvoiceDate, Paiddate }) {
    console.log("Propped Dates: ", { PRdate, POdate, InvoiceDate, Paiddate });

    // Collect all dates and their corresponding labels
    const datesWithLabels = [
        { date: PRdate, label: "PR Date" },
        { date: POdate, label: "PO Date" },
        { date: InvoiceDate, label: "Invoice Date" },
        { date: Paiddate, label: "Paid Date" },
    ];

    // Parse dates and calculate min and max years
    const years = datesWithLabels.map(({ date }) => new Date(date).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // Parse and sort dates in ascending order, preserving labels
    const sortedDates = datesWithLabels
        .map(({ date, label }) => ({ date: new Date(date), label }))
        .sort((a, b) => a.date - b.date);

    const data = {
        datasets: [
            {
                label: "Payment Dates",
                data: sortedDates.map(({ date, label }) => ({
                    x: date,
                    y: 0,
                    label, // Include the label for each point
                })),
                borderColor: "#4f46e5", // Tailwind blue
                backgroundColor: "rgba(59, 130, 46)", // Semi-transparent blue
                tension: 0, // Straight line
                pointBackgroundColor: "rgb(63 230 53)", // Tailwind green
                pointRadius: 10,
                pointHoverRadius: 12, // Increase point size on hover
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            title: {
                display: true,
                text: "Payments Dates",
                color: "#374151", // Tailwind gray-700
                font: {
                    size: 20,
                },
            },
            tooltip: {
                callbacks: {
                    title: () => "", // Remove the default title (date) from the tooltip
                    label: (context) => {
                        const { label } = context.raw; // Get the custom label
                        const date = context.raw.x.toLocaleDateString(); // Format the date
                        return ["   " + label, "   " + date]; // Return as array for multi-line display
                    },
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "year",
                },
                grid: {
                    display: false, // Hide gridlines on X-axis
                },
                min: `${minYear}-01-01`, // Set dynamic min year
                max: `${maxYear + 1}-01-01`, // Set dynamic max year
                offset: true, // Offset the scale to create space on both sides
            },
            y: {
                display: false, // Hide Y-axis completely
            },
        },
    };

    return (
        <div className="px-10 pt-2 pb-10 bg-gray-100 border-[3px] border-green-600 rounded-lg w-full">
            <Line data={data} options={options} height={50} />
        </div>
    );
}
