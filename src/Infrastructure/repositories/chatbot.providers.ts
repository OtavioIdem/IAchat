import { Connection } from 'typeorm';
import { Conversations } from '../database/entities/Conversations.entity';
import { Logs } from '../database/entities/Logs.entity';
import { Messages } from '../database/entities/Messages.entity';
import { Users } from '../database/entities/Users.entity';

export const chatbotProviders = [
  {
    provide: 'CHATBOT_REPOSITORY',
    useFactory: (connection: Connection) => ({
        convRepository: connection.getRepository(Conversations),
        logsRepository: connection.getRepository(Logs),
        msmRepository:  connection.getRepository(Messages),
        usrsRepository: connection.getRepository(Users)
    }),
    inject: ['DATABASE_CONNECTION'],
  },
];
