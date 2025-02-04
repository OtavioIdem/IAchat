import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversations } from "./Conversations.entity";
import { Logs } from "./Logs.entity";

@Index("users_pkey", ["id"], { unique: true })
@Index("idx_users_sisid", ["sisid"], {})
@Index("users_username_key", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "sisid" })
  sisid: number;

  @Column("character varying", { name: "username", unique: true, length: 250 })
  username: string;

  @Column("timestamp without time zone", {
    name: "primeiroacesso",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  primeiroacesso: Date | null;

  @Column("timestamp without time zone", {
    name: "ultimoacesso",
    nullable: true,
  })
  ultimoacesso: Date | null;

  @Column("boolean", { name: "ativo", nullable: true, default: () => "true" })
  ativo: boolean | null;

  @OneToMany(() => Conversations, (conversations) => conversations.user)
  conversations: Conversations[];

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];
}
