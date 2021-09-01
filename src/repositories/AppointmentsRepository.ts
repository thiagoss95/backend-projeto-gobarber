import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// Define o repositorio e a entidade que ele pertence
// A classe extende Repository para receber todos os métodos prontos que existem
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Procura se ja existe algum appointment com a data informada
    const findAppointment = await this.findOne({ where: { date } });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
