import {ReactNode} from "react"

export type BaseRoute = {
    page: ReactNode,
    path: string, 
    key: string,
};

export interface BasePerson  {
    id: number,
    nombrecompleto: string,
    nrodocumento: number,
    correo: string,
    telefono: number,
}

export type Person = Omit<BasePerson, 'id'>

export interface BaseRoom {
    id: number,
    habitacionpiso: number,
    habitacionnro: number,
    cantcamas: number, 
    tienetelevision: boolean,
    tienefrigobar: boolean,
}

export type Room = Omit<BaseRoom, 'id'>

export interface BaseBooking {
    id: number,
    fechareserva: string | Date,
    fechaentrada: string | Date,
    fechasalida: string | Date,
    habitacionid: number,
    personaid: number,
}

export type Booking = Omit<BaseBooking, 'id'>

type Column = {
    Header: string, 
    accesor: string,
}

export type DataTableData = {
    columns: Column[],
    rows: BasePerson[] | BaseRoom[] | BaseBooking[]
}