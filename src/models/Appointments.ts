import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/** Criação da Entidade que será utilizada pelo typeorm */

// Define a tabela que pertence essa entidade
@Entity('appointments')
class Appointment {
  // Define o tipo do dado dessa coluna
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  // Propriedade existente no postgres 'with local timezone'
  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
