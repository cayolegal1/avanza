import {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

// Layouts
import {BaseLayout} from '../../layouts/baseLayout';

// @mui components
import {Box, Button, TextField} from '@mui/material';
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
    {Header: 'Nombre Completo', accesor: 'nombrecompleto'},
    {Header: 'Número de Documento', accesor: 'nrodocumento'},
    {Header: 'Correo', accesor: 'correo'},
    {Header: 'Teléfono', accesor: 'telefono'},
    {Header: '', accesor: 'actions'},
  ], 
  rows: []
};

export const PeoplePage = () => {
  const [data, setData] = useState(dataTableData);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const formik = useFormik({
    initialValues: {
      nombrecompleto: selectedPerson ? selectedPerson.nombrecompleto : "",
      nrodocumento: selectedPerson ? selectedPerson.nrodocumento : "",
      correo: selectedPerson ? selectedPerson.correo : "",
      telefono: selectedPerson ? selectedPerson.telefono : "",
    },
    validationSchema: Yup.object().shape({
        nombrecompleto: Yup.string().required('Campo requerido'),
        nrodocumento: Yup.string().required('Campo requerido'),
        correo: Yup.string().email('Email no válido').required('Campo requerido'),
        telefono: Yup.string().required('Campo requerido'),
    }),
    onSubmit: (values) => {
        Services.createPerson(values)
        .then((res) => {
            getPeople();
            formik.resetForm();
            setOpenModal(false);
            Toast.fire({
                icon: "success",
                title: "Persona creada!",
            });
        }).catch((error) => Toast.fire({ icon: "warning", title: error.message }));
    },
    enableReinitialize: true,
  })
  
  const getPeople = () => {
    return Services.getAllPeople().then(response => {
      const response_data = response.data.map((r) => ({
        ...r,
        actions: (
          <Box display="flex" gap={pxToRem(14)}>
            <Button variant="contained" color="primary" onClick={() => handleEditOpen(r)}>
              <EditOutlinedIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ background: "red", "&:hover": {background: "#e80b0b" }}}
              onClick={() => handleDeleteOpen(r)}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </Box>
        ),
      })).sort((prev, next) => prev.id < next.id ? 1 : -1 );
      setData({...data, rows: response_data})
    }).catch((error) => Toast.fire({icon: 'warning', title: error.message}))
  }

  const handleEditOpen = (person) => {
    setOpenModal(true);
    setSelectedPerson(person);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    setSelectedPerson(null);
  }

  const handleDeleteOpen = (person) => {
    setOpenDeleteModal(true);
    setSelectedPerson(person)
  }

  const editPerson = () => {
    const updatedData = {...formik.values, id: selectedPerson.id};
    Services.updatePerson(updatedData).then((res) => {
        formik.resetForm();
        setOpenModal(false);
        setSelectedPerson(null);
        getPeople();
        Toast.fire({ icon: "success", title: "Persona actualizada!" });
      }).catch((error) => Toast.fire({ icon: "warning", title: error.message }));
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPerson(null);
  }

  const deletePerson = () => {
    console.log(selectedPerson.id)
    Services.deletePerson(selectedPerson.id).then(res => {
        handleCloseDeleteModal();
        Toast.fire({
            icon: "success",
            title: "Persona eliminada!",
        });
        getPeople();
    }).catch((error) => Toast.fire({ icon: "warning", title: error.message}));
  }

  useEffect(() => {
    getPeople();
  }, [])

  return (
    <Box>
      <BaseLayout>
        <Box display="flex" justifyContent="flex-end" my={1}>
          <Button variant="contained" color="success" onClick={() => setOpenModal(true)}>
            Crear +
          </Button>
        </Box>
        <BaseTable tableData={data} />
      </BaseLayout>
      <BaseModal 
        open={openModal} 
        onClose={handleCloseModal} 
        title={!selectedPerson ? 'Crear Nueva Persona' : 'Editar Persona'}
        onSubmit={!selectedPerson ? formik.handleSubmit : editPerson}
        errors={formik.errors}
      >
        <TextField 
          label='Nombre completo'
          name='nombrecompleto'
          onChange={formik.handleChange}
          error={formik.errors.nombrecompleto && formik.touched.nombrecompleto}
          value={formik.values.nombrecompleto}
          helperText={formik.touched.nombrecompleto && formik.errors.nombrecompleto}
          variant='outlined'
        />
        <TextField 
          type='number'
          label='Número de documento'
          name='nrodocumento'
          onChange={formik.handleChange}
          error={formik.errors.nrodocumento && formik.touched.nrodocumento}
          value={formik.values.nrodocumento}
          helperText={formik.touched.nrodocumento && formik.errors.nrodocumento}
          variant='outlined'
        />
        <TextField 
          type='email'
          label='Correo'
          name='correo'
          onChange={formik.handleChange}
          error={formik.errors.correo && formik.touched.correo}
          value={formik.values.correo}
          helperText={formik.touched.correo && formik.errors.correo}
          variant='outlined'
        />
        <TextField 
          type='tel'
          label='Teléfono'
          name='telefono'
          onChange={formik.handleChange}
          error={formik.errors.telefono && formik.touched.telefono}
          value={formik.values.telefono}
          helperText={formik.touched.telefono && formik.errors.telefono}
          variant='outlined'
        />
      </BaseModal>
      <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} onDelete={deletePerson} />
    </Box>
  );
}