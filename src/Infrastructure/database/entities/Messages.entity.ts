import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversations } from "./Conversations.entity";

@Index("idx_messages_convid", ["convid"], {})
@Index("messages_pkey", ["id"], { unique: true })
@Entity("messages", { schema: "public" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "convid", nullable: true })
  convid: number | null;

  @Column("character varying", { name: "sender", nullable: true, length: 10 })
  sender: string | null;

  @Column("text", { name: "message" })
  message: string;

  @Column("timestamp without time zone", {
    name: "datasend",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  datasend: Date | null;

  @ManyToOne(() => Conversations, (conversations) => conversations.messages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "convid", referencedColumnName: "id" }])
  conv: Conversations;
}
