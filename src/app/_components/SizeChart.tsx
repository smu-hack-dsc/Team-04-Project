import axios from "axios";
import React, { useEffect, useState } from "react";

interface SizeChartProps {
  brand: string;
  category: string;
}

interface SizeData {
  [size: string]: {
    shoulder_width: number[];
    waist: number[];
    hip_width: number[];
  };
}

// Helper function to get the first key of an object
const getFirstKey = (obj: any) => {
  return Object.keys(obj)[0];
};
const getMeasurementText = (measurement: string) => {
  switch (measurement) {
    case "shoulder_width":
      return "Shoulder Width (in cm)";
    case "hip_width":
      return "Hip Width (in cm)";
    case "waist":
      return "Waist (in cm)";
    default:
      return measurement;
  }
};

const SizeChart: React.FC<SizeChartProps> = ({ brand, category }) => {
  const [sizeData, setSizeData] = useState<SizeData | null>(null);

  useEffect(() => {
    // Fetch the size chart data using axios when the component mounts
    axios
      .get(`http://54.179.80.139:5000/api/size_chart/${brand}/${category}`)
      .then((response) => {
        console.log(response.data);
        setSizeData(response.data.size_chart);
      })
      .catch((error) => {
        console.error("Error fetching size chart:", error);
      });
  }, [brand, category]); // Add brand and category as dependencies to re-fetch data when they change

  if (!sizeData) {
    return <div>Loading size chart...</div>;
  }

  // Define the order of sizes you want
  const sizeOrders = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  // Extract all available measurements from the size data
  const availableMeasurements = Object.keys(sizeData[getFirstKey(sizeData)]);
  return (
    <div>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Size</th>
            {availableMeasurements.map((measurement) => (
              <th key={measurement} className="border border-gray-400 p-2">
                {getMeasurementText(measurement)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeOrders.map((size) => (
            <tr key={size}>
              <td className="border border-gray-400 p-2">{size}</td>
              {availableMeasurements.map((measurement) => (
                <td key={measurement} className="border border-gray-400 p-2">
                  {sizeData[size][measurement][0]} -{" "}
                  {sizeData[size][measurement][1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
