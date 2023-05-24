import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Input,
} from "@mui/material";

export default function NewTourFrom() {
  const [formData, setFormData] = useState({
    nombre_tour: "",
    precio_tour: "",
    precio_promo_tour: "",
    duracion_tour: "",
    descripcion_tour: "",
    estado_tour: "onw",
    atractivo_tour: "",
    tipo_transporte: "default",
    duracion_viaje: "",
    distancia_recorrido: "",
    id_transporte: "",
  });
  const [images, setImages] = useState([]);
  const [transportes, setTransportes] = useState([
    "Problemas al obtener datos",
  ]);

  useEffect(() => {
    // Obtener los registros de la tabla de transportes
    axios.get("http://localhost:3000/api/conveyance").then((response) => {
      setTransportes(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const tourData = {
      ...formData,
      images: images, // Agrega las imágenes al objeto de datos
    };
    console.log(tourData);
    console.log(images);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tour",// Establecer la ruta de la API
        tourData,// Establecer los datos a enviar
        {
          headers: {
            "Content-Type": "multipart/form-data", // Establecer el encabezado "multipart/form-data"
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <p className="text-gray-700 text-3xl mb-4 font-bold">Nuevo Tour</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TextField
            name="nombre_tour"
            label="Nombre del Tour"
            value={formData.nombre_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="precio_tour"
            label="Precio"
            type="number"
            value={formData.precio_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="precio_promo_tour"
            label="Precio promoción"
            type="number"
            value={formData.precio_promo_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="duracion_tour"
            label="Duración"
            value={formData.duracion_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="descripcion_tour"
            label="Descripción"
            value={formData.descripcion_tour}
            onChange={handleInputChange}
            multiline
            rows={4}
            className="w-full md:w-auto"
          />
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="estado">Estado</label>
            <Select
              id="estado"
              name="estado_tour"
              label="Estado"
              value={formData.estado_tour}
              onChange={handleInputChange}
              className="w-full md:w-auto h-14"
              defaultValue="onw"
            >
              <MenuItem value="onw">--Selecciona una opción--</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="no disponible">No disponible</MenuItem>
              <MenuItem value="retirado">Retirado</MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col md-12">
          <h2 className="text-lg font-bold">Detalles del Tour</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TextField
            name="atractivo_tour"
            label="Atractivo"
            value={formData.atractivo_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <div className="w-full flex flex-col gap-3 ">
            <label htmlFor="transporte">
              Seleccione un medio de transporte:
            </label>
            <Select
              id="transporte"
              name="id_transporte"
              label="Medio de Transporte"
              value={formData.id_transporte}
              onChange={handleInputChange}
              className="w-full md:w-auto"
              defaultValue="default"
            >
              <MenuItem value="default" className="text-gray-200">
                --Seleccione una opción--
              </MenuItem>
              {transportes.map((transporte) => (
                <MenuItem
                  key={transporte.id_transporte}
                  value={transporte.id_transporte}
                >
                  {transporte.nombre_transporte}
                </MenuItem>
              ))}
            </Select>
          </div>

          <TextField
            name="tipo_transporte"
            label="Medio de Transporte"
            value={formData.tipo_transporte}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="duracion_viaje"
            label="Duración del viaje"
            value={formData.duracion_viaje}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="distancia_recorrido"
            label="Distancia del recorrido"
            value={formData.distancia_recorrido}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col md-12 mt-6">
          <h2 className="text-lg font-bold">Imagenes del Tour</h2>
        </div>
        <div>
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Seleccionar imágenes
            </Button>
          </label>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            name="images"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div className="flex flex-wrap gap-2 mt-5 mb-5 ">
            {images.map((image, index) => (
              <div key={index} className="w-52 h-auto ">
                <img src={URL.createObjectURL(image)} alt="Preview" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto mb-4">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="w-full md:w-auto"
          >
            Grabar Datos
          </Button>
        </div>
      </form>
    </>
  );
}
