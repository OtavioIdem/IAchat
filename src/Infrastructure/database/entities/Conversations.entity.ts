import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";
import { Logs } from "./Logs.entity";
import { Messages } from "./Messages.entity";

@Index("conversations_pkey", ["id"], { unique: true })
@Index("idx_conversations_userid", ["userid"], {})
@Entity("conversations", { schema: "public" })
export class Conversations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "userid", nullable: true })
  userid: number | null;

  @Column("character varying", { name: "title", length: 255 })
  title: string;

  @Column("timestamp without time zone", {
    name: "conversainiciada",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  conversainiciada: Date | null;

  @ManyToOne(() => Users, (users) => users.conversations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Logs, (logs) => logs.conv)
  logs: Logs[];

  @OneToMany(() => Messages, (messages) => messages.conv)
  messages: Messages[];
}
