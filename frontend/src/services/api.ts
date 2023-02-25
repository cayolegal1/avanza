import axios, { Axios, AxiosInstance, AxiosResponse } from 'axios';
import {BasePerson, Person, BaseRoom, Room, BaseBooking, Booking} from '../pages/types';

class ApiServices {

    private api: AxiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        headers: {
            Accept: 'application/json',
        }
    });

    public async getAllPeople(): Promise<AxiosResponse<BasePerson[]>>{
        return this.api.get('/personas');
    }

    public async getPersonById(id: number): Promise<AxiosResponse<BasePerson>>{
        return this.api.get(`/persona/${id}`);
    }

    public async createPerson(data: Person): Promise<AxiosResponse>{
        return this.api.post('/persona/new', data);
    }

    public async updatePerson(data: BasePerson): Promise<AxiosResponse>{
        return this.api.patch(`/persona/${data.id}`, data);
    }

    public async deletePerson(id: number): Promise<AxiosResponse>{
        return this.api.delete(`/persona/${id}`);
    }

    public async getAllRooms(): Promise<AxiosResponse<BaseRoom[]>>{
        return this.api.get('/habitaciones');
    }

    public async getRoomById(id: number):  Promise<AxiosResponse<BaseRoom>>{
        return this.api.get(`/habitacion/${id}`)
    }

    public async createRoom(data: Room): Promise<AxiosResponse>{
        return this.api.post('/habitacion/new', data)
    }

    public async updateRoom(data: BaseRoom): Promise<AxiosResponse>{
        return this.api.patch(`/habitacion/${data.id}`, data)
    }

    public async deleteRoom(id: number): Promise<AxiosResponse>{
        return this.api.delete(`/habitacion/${id}`)
    }

    public async getAllBookings(): Promise<AxiosResponse<BaseBooking[]>>{
        return this.api.get('/reservas')
    }

    public async getBookingById(id: number): Promise<AxiosResponse<BaseBooking>>{
        return this.api.get(`/reserva/${id}`);
    }

    public async createBooking(data: Booking): Promise<AxiosResponse>{
        return this.api.post('/reserva/new', data)
    }

    public async updateReserva(data: BaseBooking): Promise<AxiosResponse>{
        return this.api.patch(`/reserva/${data.id}`, data)
    }

    public async deleteBooking(id: number): Promise<AxiosResponse>{
        return this.api.delete(`/reserva/${id}`)
    }
}

export const Services = new ApiServices();