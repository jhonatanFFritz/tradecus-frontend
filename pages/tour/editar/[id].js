import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TourDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTourDetails() {
      try {
        
        const res = await axios.get(`http://localhost:3000/api/tour/details/${id}`);
        setTour(res.data[0]);
        setLoading(false);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
      
    }
    
    if (id) {
      fetchTourDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!tour) {
    return <p>No se encontró el tour</p>;
  }
  

  return (
    <div>
      <h1>Detalles del Tour:  {tour.id_tour}</h1>
      <p>Nombre: {tour.nombre_tour ?? 'Nombre no disponible'}</p>
      <p>Descripción: {tour.descripcion_tour ?? 'Descripción no disponible'}</p>
      <p>Precio: {tour.precio_tour ?? 'Precio no disponible'}</p>
      <Link href={`/tour/edit/${tour.id}`} passHref>
        <Button variant="contained" color="primary" >Editar</Button>
      </Link>
    </div>
  );
}
