import { useState, useEffect } from "react";
import ToursTable from "../components/ToursTable";

export default function Tours() {
  const [data, setData] = useState(null);

  const loadData = () => {
    fetch("http://localhost:3000/api/tour")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Tours</p>
      <ToursTable data={data} loadData={loadData} />
    </>
  );
}
