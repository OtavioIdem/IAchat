import { Module } from '@nestjs/common';
import { databaseChatBotProviders } from 'src/Infrastructure/database.chatbot.providers';


@Module({
    providers: [
        ...databaseChatBotProviders
    ],
    exports: [
        ...databaseChatBotProviders
    ]
})
export class DatabaseModule {}
