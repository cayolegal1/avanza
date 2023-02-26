import {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

// Layouts
import {BaseLayout} from '../../layouts/baseLayout';

// @mui components
import {Box, Button, TextField, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


// Components
import {BaseTable} from '../../components/Table';
import { BaseModal } from '../../components/BaseModal';
import { DeleteModal } from '../../components/DeleteModal';

// Utils
import {Services} from '../../services/api';
import Toast, {pxToRem} from '../../services/helpers';

const dataTableData = {
  columns: [
    {Header: 'Habitación Piso', accesor: 'habitacionpiso'},
    {Header: 'Habitación Número', accesor: 'habitacionnro'},
    {Header: 'Cantidad Camas', accesor: 'cantcamas'},
    {Header: 'Tiene Television', accesor: 'tienetelevision'},
    {Header: 'Tiene Frigobar', accesor: 'tienefrigobar'},
    {Header: '', accesor: 'actions'},
  ], 
  rows: []
};

export const RoomsPage = () => {
  const [data, setData] = useState(dataTableData);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const formik = useFormik({
    initialValues: {
      habitacionpiso: selectedRoom ? selectedRoom.habitacionpiso : "",
      habitacionnro: selectedRoom ? selectedRoom.habitacionnro : "",
      cantcamas: selectedRoom ? selectedRoom.cantcamas : "",
      tienetelevision: selectedRoom ? selectedRoom.tienetelevision : false,
      tienefrigobar: selectedRoom ? selectedRoom.tienefrigobar : false,
    },
    validationSchema: Yup.object().shape({
        habitacionpiso: Yup.number().min(1).max(10).required(),
        habitacionnro: Yup.number().min(1).max(20).required(),
        cantcamas: Yup.number().min(1).max(4).required(),
        tienetelevision: Yup.boolean(),
        tienefrigobar: Yup.boolean(),
    }),
    onSubmit: (values) => {
        Services.createRoom(values)
        .then((res) => {
            setData({ ...data, rows: [values, ...data.rows] });
            formik.resetForm();
            setOpenModal(false);
            Toast.fire({
                icon: "success",
                title: "Habitacion creada!",
            });
        })
        .catch((error) =>
        Toast.fire({ icon: "warning", title: error.message })
        );
    },
    enableReinitialize: true,
  })

  const getRooms = () => {
    return Services.getAllRooms()
      .then((response) => {
        const response_data = response.data.map((r) => ({
          ...r,
          actions: (
            <Box display="flex" gap={pxToRem(14)}>
              <Button variant="contained" color="primary" onClick={() => handleEditOpen(r)}>
                <EditOutlinedIcon />
              </Button>
              <Button
                variant="contained"
                sx={{ background: "red", "&:hover": { background: "#e80b0b" } }}
                onClick={() => handleDeleteOpen(r)}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </Box>
          ),
        })).sort((prev, next) => prev.id < next.id ? 1 : -1 );
        setData({ ...data, rows: response_data });
      })
      .catch((error) => {
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
      });
  }

  const handleEditOpen = (room) => {
    setOpenModal(true);
    setSelectedRoom(room);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRoom(null);
    formik.resetForm();
  }

  const handleDeleteOpen = (room) => {
    setOpenDeleteModal(true);
    setSelectedRoom(room)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedRoom(null);
  }

  const editRoom = () => {
    const updatedData = {...formik.values, id: selectedRoom.id};
    Services.updateRoom(updatedData).then((res) => {
        formik.resetForm();
        setOpenModal(false);
        setSelectedRoom(null);
        getRooms();
        Toast.fire({ icon: "success", title: "Habitacion actualizada!" });
      })
      .catch((error) => Toast.fire({ icon: "warning", title: error.message }));
  }

  const deleteRoom = () => {
    Services.deleteRoom(selectedRoom.id).then(res => {
        handleCloseDeleteModal();
        Toast.fire({
            icon: "success",
            title: "Habitacion eliminada!",
        });
        getRooms();
    }).catch((error) => Toast.fire({ icon: "warning", title: error.message}));
  }

  useEffect(() => {
    getRooms();
  }, [])
  return (
    <Box>
      <BaseLayout>
        <Box display="flex" justifyContent="flex-end" my={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenModal(true)}
          >
            Crear +
          </Button>
        </Box>
        <BaseTable tableData={data} />
      </BaseLayout>
      <BaseModal
        open={openModal}
        onClose={handleCloseModal}
        title={!selectedRoom ? 'Create New Room' : 'Edit Room' }
        onSubmit={!selectedRoom ? formik.handleSubmit : editRoom}
        errors={formik.errors}
      >
        <TextField
          type="number"
          label="Habitacion Piso"
          name="habitacionpiso"
          onChange={formik.handleChange}
          error={formik.errors.habitacionpiso}
          value={formik.values.habitacionpiso}
          helperText={formik.errors.habitacionpiso}
          variant="outlined"
        />
        <TextField
          type="number"
          label="Habitacion Número"
          name="habitacionnro"
          onChange={formik.handleChange}
          error={formik.errors.habitacionnro}
          value={formik.values.habitacionnro}
          helperText={formik.errors.habitacionnro}
          variant="outlined"
        />
        <TextField
          type="number"
          label="Cantidad Camas"
          name="cantcamas"
          onChange={formik.handleChange}
          error={formik.errors.cantcamas}
          value={formik.values.cantcamas}
          helperText={formik.errors.cantcamas}
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel >Tiene Television</InputLabel>
          <Select
            value={formik.values.tienetelevision}
            label="Tiene Television"
            name='tienetelevision'
            onChange={formik.handleChange}
          >
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel >Tiene Frigobar</InputLabel>
          <Select
            value={formik.values.tienefrigobar}
            label="Tiene Frigobar"
            name='tienefrigobar'
            onChange={formik.handleChange}
          >
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </BaseModal>
      <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} onDelete={deleteRoom} />
    </Box>
  );
}