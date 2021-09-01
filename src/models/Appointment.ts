import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

/** Criação da Entidade que será utilizada pelo typeorm */

// Define a tabela que pertence essa entidade
@Entity('appointments')
class Appointment {
  // Define o tipo do dado dessa coluna
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Configurações da ForeignKey
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Propriedade existente no postgres 'with local timezone'
  @Column('timestamp with time zone')
  date: Date;

  // Decorator do Typeorm para definição da data de criação do registro
  @CreateDateColumn()
  created_at: Date;

  // Decorator do Typeorm para definição da data de alteração do registro
  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
