import React from "react";
import axios from "axios";
import { Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#F97316",
  color: "#333",
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#FAA631",
  border: "0",
  fontWeight: "bold",
  color: "#333",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
}));

const ToursTable = ({ data, loadData }) => {
  // esto es para el boton de eliminar tour setTour viene de tours.js y debo pasarlo como props en tours.js

  const [page, setPage] = React.useState(0); // esto es para la paginacion
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // esto es para la paginacion
  console.log(page);

  const handleChangePage = (event, newPage, loadData) => {
    // esto es para la paginacion
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // esto es para la paginacion
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // esto es para la paginacion
  };
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/api/tour/${id}`)
      .then((response) => {
        // const updatedTours = data.filter((tour) => tour.id !== id);
        // setData(updatedTours);
        loadData();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <TableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell2>ID</StyledTableCell2>
            <StyledTableCell2>Nombre</StyledTableCell2>
            <StyledTableCell2>Precio</StyledTableCell2>
            <StyledTableCell2>Descripción</StyledTableCell2>
            <StyledTableCell2>Estado</StyledTableCell2>
            <StyledTableCell2>Acciones</StyledTableCell2>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((tour, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{tour.id_tour}</StyledTableCell>
                <StyledTableCell>{tour.nombre_tour}</StyledTableCell>
                <StyledTableCell>{tour.precio_tour}</StyledTableCell>
                <StyledTableCell>{tour.descripcion_tour}</StyledTableCell>
                <StyledTableCell>{tour.estado_tour}</StyledTableCell>
                <StyledTableCell>
                  <div className="flex flex-row gap-1">
                    <Tooltip title="Detalles" arrow>
                      <Button variant="contained" color="info">
                        <VisibilityIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Editar" arrow>
                      <Button variant="contained" color="success">
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar" arrow>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(tour.id_tour)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ToursTable;
