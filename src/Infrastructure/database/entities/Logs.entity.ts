import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversations } from "./Conversations.entity";
import { Users } from "./Users.entity";

@Index("idx_logs_convid", ["convid"], {})
@Index("logs_pkey", ["id"], { unique: true })
@Index("idx_logs_userid", ["userid"], {})
@Entity("logs", { schema: "public" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "userid", nullable: true })
  userid: number | null;

  @Column("integer", { name: "convid", nullable: true })
  convid: number | null;

  @Column("text", { name: "action" })
  action: string;

  @Column("date", {
    name: "data",
    nullable: true,
    default: () => "CURRENT_DATE",
  })
  data: string | null;

  @Column("time without time zone", {
    name: "hora",
    nullable: true,
    default: () => "CURRENT_TIME",
  })
  hora: string | null;

  @Column("character varying", { name: "ip", length: 45 })
  ip: string;

  @ManyToOne(() => Conversations, (conversations) => conversations.logs, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "convid", referencedColumnName: "id" }])
  conv: Conversations;

  @ManyToOne(() => Users, (users) => users.logs, { onDelete: "SET NULL" })
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: Users;
}
