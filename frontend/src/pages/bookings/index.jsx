import {useState, useEffect} from 'react';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';

// Layouts
import {BaseLayout} from '../../layouts/baseLayout';

// @mui components
import {Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


// Components
import {BaseTable} from '../../components/Table';
import { BaseModal } from '../../components/BaseModal';
import { DeleteModal } from '../../components/DeleteModal';

// Utils
import {Services} from '../../services/api';
import Toast, { pxToRem } from '../../services/helpers';

const dataTableData = {
  columns: [
    {Header: 'Fecha de reserva', accesor: 'fechareserva'},
    {Header: 'Fecha de entrada', accesor: 'fechaentrada'},
    {Header: 'Fecha de salida', accesor: 'fechasalida'},
    {Header: 'Habitacion Id', accesor: 'habitacionid', link: true},
    {Header: 'Persona Id', accesor: 'personaid', link: true},
    {Header: 'Monto', accesor: 'montoreserva'},
    {Header: '', accesor: 'actions'}
  ], 
  rows: []
};

export const BookingsPage = () => {
  const [data, setData] = useState(dataTableData);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showApologizeMessage, setShowApologizeMessage] = useState(false);
  const [people, setPeople] = useState([]);
  const [allRooms, setAllRoms] = useState([]);
  const [rooms, setRooms] = useState([]);

  const formik = useFormik({
    initialValues: {
      fechareserva: selectedBooking ? selectedBooking.fechareserva : "",
      fechaentrada: selectedBooking ? selectedBooking.fechaentrada : "",
      fechasalida: selectedBooking ? selectedBooking.fechasalida : "",
      habitacionid: selectedBooking ? selectedBooking.habitacionid : "",
      personaid: selectedBooking ? selectedBooking.personaid : "",
    },
    validationSchema: Yup.object().shape({
      fechareserva: Yup.date()
        .min(
          moment().add(1, "day").format("YYYY/MM/DD"),
          "La fecha de reserva debe ser mayor al día actual"
        )
        .required(),
      fechaentrada: Yup.date()
        .min(moment().add(2, "day").format("YYYY/MM/DD"), 'La fecha de entrada debe ser mayor al día de reserva')
        .required(),
      fechasalida: Yup.date()
        .min(moment().add(2, "day").format("YYYY/MM/DD"), 'La fecha de salida debe ser mayor o igual al día de entrada')
        .required(),
      habitacionId: Yup.number(),
      personaId: Yup.number(),
    }),
    onSubmit: (values) => {
    
      Services.createBooking(values)
      .then((res) => {
          getBookings();
          formik.resetForm();
          setOpenModal(false);
          Toast.fire({
            icon: "success",
            title: "Reserva creada!",
          });
        })
        .catch((error) =>{
          Toast.fire({
            icon: "warning", 
            title: error.message
          })
        });
    },
    enableReinitialize: true,
  });

  const getBookings = () => {
    return Services.getAllBookings().then(response => {
      const response_data = response.data.map((d) => ({
        ...d,
        fechareserva: moment(d.fechareserva).format('YYYY/MM/DD'),
        fechaentrada: moment(d.fechaentrada).format('YYYY/MM/DD'),
        fechasalida: moment(d.fechasalida).format('YYYY/MM/DD'),
        montoreserva: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'PYG'}).format(d.montoreserva),
        actions: <Box display="flex" gap={pxToRem(14)}>
        <Button variant="contained" color="primary" onClick={() => handleEditOpen(d)}>
          <EditOutlinedIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ background: "red", "&:hover": { background: "#e80b0b" } }}
          onClick={() => handleDeleteOpen(d)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
      })).sort((prev, next) => prev.id < next.id ? 1 : -1 )
      setData({...data, rows: response_data})
    }).catch((error) => {
      Toast.fire({
        icon: 'warning', 
        title: error.message
      })
    })
  }

  const getRooms = () => {
    return Services.getAllRooms()
      .then((response) => {
        const response_data = response.data.map((r) => r.id)
        setRooms(response_data);
        setAllRoms(response_data);
      })
      .catch((error) => {
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
      });
  }

  const getPeople = () => {
    return Services.getAllPeople().then(response => {
      const response_data = response.data.map((r) => ({id: r.id, nombrecompleto: r.nombrecompleto}));
      setPeople(response_data);
    }).catch((error) => Toast.fire({icon: 'warning', title: error.message}))
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    setSelectedBooking(null);
    setShowApologizeMessage(false);
    setRooms(allRooms);
  }

  const handleEditOpen = (booking) => {
    setOpenModal(true);
    const selected = {
      ...booking,
      fechareserva: new Date(booking.fechareserva),
      fechaentrada: moment(booking.fechaentrada).format('YYYY/MM/DD'),
      fechasalida: moment(booking.fechasalida).format('YYYY/MM/DD'),
    }
    setSelectedBooking(selected);
  }

  const handleDeleteOpen = (booking) => {
    setOpenDeleteModal(true);
    setSelectedRoom(booking)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedRoom(null);
  }

  const editBooking = () => {
    const updated_data = {
      ...formik.values,
      id: selectedBooking.id,
    }
    Services.updateReserva(updated_data).then(res => {
      formik.resetForm();
      setOpenModal(false);
      setSelectedBooking(null);
      getBookings();
      Toast.fire({ icon: "success", title: "Reserva actualizada!" });
    }).catch((error) => Toast.fire({ icon: "warning", title: error.message }));
  }

  const deleteBooking = () => {
    Services.deleteBooking(selectedRoom.id).then(res => {
        handleCloseDeleteModal();
        setOpenModal(false);
        Toast.fire({
            icon: "success",
            title: "Reserva eliminada!",
        });
        getRooms();
    }).catch((error) => Toast.fire({ icon: "warning", title: error.message}));
  }

  const filterAvailableRooms = () => {
    setShowApologizeMessage(false)
    let roomsNotAvailable = 0
    for(let booking of data.rows) {
      if(
        moment(formik.values.fechaentrada).isBetween(
          booking.fechaentrada,
          booking.fechasalida,
          null,
          "[]"
        ) ||
        moment(formik.values.fechasalida).isBetween(
          booking.fechaentrada,
          booking.fechasalida,
          null,
          "[]"
        )
      ) {
        roomsNotAvailable += 1;
        setRooms((prev) => prev.filter((p) => p !== booking.habitacionid));
      } 
    }
    if(roomsNotAvailable === 0) {
      setRooms(allRooms)
    }
    if(roomsNotAvailable === allRooms.length) setShowApologizeMessage(true);
    if(selectedBooking) setRooms(allRooms)
  }

  useEffect(() => {
    if(formik.values.fechaentrada !== '' || formik.values.fechasalida !== '') {
      filterAvailableRooms()
    }
  }, [formik.values.fechaentrada, formik.values.fechasalida])

  useEffect(() => {
    getBookings();
    getPeople();
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
        title={!selectedBooking ? "Crear nueva reserva" : "Editar reserva"}
        errors={formik.errors}
        onSubmit={!selectedBooking ? formik.handleSubmit : editBooking}
        disabled={showApologizeMessage}
      >
        <Box display="flex" flexDirection="column">
          <Typography>Fecha reserva</Typography>
          <TextField
            type="date"
            name="fechareserva"
            onChange={formik.handleChange}
            error={
              formik.errors.fechareserva !== undefined &&
              formik.touched.fechareserva
            }
            value={formik.values.fechareserva}
            helperText={
              formik.touched.fechareserva && formik.errors.fechareserva
            }
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography>Fecha entrada</Typography>
          <TextField
            type="date"
            name="fechaentrada"
            onChange={formik.handleChange}
            error={
              formik.errors.fechaentrada !== undefined &&
              formik.touched.fechaentrada
            }
            value={formik.values.fechaentrada}
            helperText={
              formik.touched.fechaentrada && formik.errors.fechaentrada
            }
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography>Fecha salida</Typography>
          <TextField
            type="date"
            name="fechasalida"
            onChange={formik.handleChange}
            error={
              formik.errors.fechasalida !== undefined &&
              formik.touched.fechasalida
            }
            value={formik.values.fechasalida}
            helperText={formik.touched.fechasalida && formik.errors.fechasalida}
            variant="outlined"
          />
        </Box>
        <FormControl fullWidth>
          <InputLabel>Habitacion Id</InputLabel>
          <Select
            value={formik.values.habitacionid}
            label="Habitacion Id"
            name="habitacionid"
            onChange={formik.handleChange}
            defaultValue={1}
            error={formik.errors.habitacionid !== undefined}
          >
            {rooms.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Persona</InputLabel>
          <Select
            value={formik.values.personaid}
            label="Persona"
            name="personaid"
            onChange={formik.handleChange}
            defaultValue={1}
            error={formik.errors.personaid !== undefined}
          >
            {people.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nombrecompleto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {showApologizeMessage && (
          <Typography variant="button">
            Lo sentimos, no contamos con habitaciones disponibles en las fechas
            seleccionadas
          </Typography>
        )}
      </BaseModal>
      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={deleteBooking}
      />
    </Box>
  );
}