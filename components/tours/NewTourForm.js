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
function ImagePreview({ url, onClick }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 100,
        width: 100,
        border: "1px solid black",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
      }}
      onClick={onClick}
    >
      {url ? (
        <div style={{
            maxwidth: "100",
            maxheight: "100",
            backgroundColor: "red",
        }}>
          <img
            src={url}
            alt="preview"
            style={{ width: "50%", height: "50%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <p style={{ fontSize: 24 }}>Selecciona una imagen</p>
      )}
    </div>
  );
}

export default function NewTourFrom() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    termsAccepted: false,
  });
  const [transportes, setTransportes] = useState([
    "Problemas al obtener datos",
  ]);
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
    // Obtener los registros de la tabla de transportes
    axios.get("http://localhost:3000/api/conveyance").then((response) => {
      setTransportes(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "termsAccepted" ? checked : value,
    }));
  };

  return (
    <>
      <div>
        <p className="text-gray-700 text-3xl mb-4 font-bold">Nuevo Tour</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            value={formData.name}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="precio_promo_tour"
            label="Precio promoción"
            type="number"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="duracion_tour"
            label="Duración"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="descripcion_tour"
            label="Descripción"
            value={formData.name}
            onChange={handleInputChange}
            multiline
            rows={4}
            className="w-full md:w-auto"
          />
          <TextField
            name="estado_tour"
            label="Estado"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
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

          <Select
            name="id_transporte"
            label="Medio de Transporte"
            value={formData.id_transporte}
            onChange={handleInputChange}
            className="w-full md:w-auto"
            defaultValue=""
          >
            <MenuItem value="">--Seleccione--</MenuItem>
            {transportes.map((transporte) => (
              <MenuItem
                key={transporte.id_transporte}
                value={transporte.id_transporte}
              >
                {transporte.nombre_transporte}
              </MenuItem>
            ))}
          </Select>

          <TextField
            name="tipo_transporte"
            label="Medio de Transporte"
            value={formData.atractivo_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="duracion_viaje"
            label="Duración del viaje"
            value={formData.atractivo_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
          <TextField
            name="distancia_recorrido"
            label="Distancia del recorrido"
            value={formData.atractivo_tour}
            onChange={handleInputChange}
            className="w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col md-12">
          <h2 className="text-lg font-bold">Imagenes del Tour</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            name="image"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
                handleInputChange(e);
              }
            }}
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className="w-full md:w-auto"
            >
              {formData.image ? "Cambiar imagen" : "Seleccionar imagen"}
            </Button>
          </label>
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Vista previa de la imagen" />
            </div>
          )}
        </div>
        {/* <FormControlLabel
          control={
            <Checkbox
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
          }
          label="I accept the terms and conditions"
          className="w-full md:w-auto"
        /> */}
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
