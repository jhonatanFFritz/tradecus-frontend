import { useState, useEffect } from "react";
import ToursTable from "../components/ToursTable";
import MyButton from "../components/MyButton";
import AddIcon from "@mui/icons-material/Add";

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
    return <div>Obteniendo Tours...</div>;
  }

  
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Tours</p>
      <ToursTable data={data} loadData={loadData} />
      
      <div className="flex justify-center fixed bottom-0 right-0 mb-4 mr-4">
        <MyButton
          text="Nuevo tour"
          color="success"
          tooltip="Crear nuevo tour"
          icon={<AddIcon />}
          // onClick={}
        />
      </div>
    </>
  );
}
