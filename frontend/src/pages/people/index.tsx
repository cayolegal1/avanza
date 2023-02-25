import {useState, useEffect} from 'react';
import {Services} from '../../services/api';
import {BasePerson, DataTableData} from '../types';
import Toast from '../../utils/helpers';
import { BaseLayout } from '../../layouts/baseLayout';

const dataTableData = {
  columns: [
    {Header: 'Nombre Completo', accesor: 'nombrecompleto'},
    {Header: 'Número de Documento', accesor: 'nrodocumento'},
    {Header: 'Correo', accesor: 'correo'},
    {Header: 'Teléfono', accesor: 'telefono'},
  ], 
  rows: []
}

export const PeoplePage = () => {
  
  const [data, setData] = useState<DataTableData>(dataTableData)
  const getPeople = () => {
    return Services.getAllPeople().then(response => {
      setData({...data, rows: response.data})
      Toast.fire({
        icon: 'success',
        title: 'hello!',
      })
    }).catch((error: Error) => {
      console.log(error.message)
    })
  }

  useEffect(() => {
    getPeople();
  }, [])
  
  return (
    <div>
      <BaseLayout data={data} />
    </div>
  )
}
