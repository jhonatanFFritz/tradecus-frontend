import React from "react";
import axios from "axios";

import { useRouter } from 'next/router';

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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
  const [openModal, setOpenModal] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  const [page, setPage] = React.useState(0); // esto es para la paginacion
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // esto es para la paginacion
  console.log(page);
  const router = useRouter();
  
  const handleChangePage = (event, newPage) => {
    const newPageIndex =
      newPage < page && data.length <= newPage * rowsPerPage
        ? newPage - 1
        : newPage;
    setPage(newPageIndex);
  };

  const handleChangeRowsPerPage = (event) => {
    // esto es para la paginacion
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // esto es para la paginacion
  };
  const handleOpenModal = (id) => {
    setTourToDelete(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:3000/api/tour/${id}`)
      .then((res) => {
        console.log(res);
        loadData();
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell2>ID</StyledTableCell2>
              <StyledTableCell2>Nombre</StyledTableCell2>
              <StyledTableCell2>Precio</StyledTableCell2>
              <StyledTableCell2>Precio Promo</StyledTableCell2>
              <StyledTableCell2>Descripción</StyledTableCell2>
              <StyledTableCell2>Estado</StyledTableCell2>
              <StyledTableCell2>Acciones</StyledTableCell2>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tour, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{tour.id_tour}</StyledTableCell>
                    <StyledTableCell>{tour.nombre_tour}</StyledTableCell>
                    <StyledTableCell>{tour.precio_tour}</StyledTableCell>
                    <StyledTableCell>{tour.precio_promo_tour}</StyledTableCell>
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
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => router.push("/tour/editar/"+tour.id_tour)}
                          >
                            <EditIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Eliminar" arrow>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOpenModal(tour.id_tour)}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={6} align="center">
                  No hay tours para mostrar
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length > 0 ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Está seguro de que desea eliminar este tour?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={() => handleConfirmDelete(tourToDelete)}
            variant="contained"
            color="error"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToursTable;
