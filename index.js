const TelegramAPI = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = '5805726389:AAFgNXqypSLpJyidor3wEAgqPaYjSft4ibg'

const bot = new TelegramAPI(token, {polling: true})
const chats = {}

const startGame = async (chatID) => {
    chats[chatID] = Math.floor(Math.random() * 10);

    // console.log(chats)
    await bot.sendMessage(chatID, `Guess the number from 0 to 9`, gameOptions);
    // await bot.sendMessage(chatID, chats[chatID], gameOptions);
}
const start = () => {

    bot.setMyCommands(
        [
            {command: '/start', description: `You're gay`},
            {command: '/info', description: `sosi`},
            {command: '/game', description: `gay`},
        ]
    )

    bot.on('message', async msg => {
        const text = msg.text;
        const chatID = msg.chat.id;
        // console.log(msg)
        if(text === '/start'){
            return  bot.sendSticker(chatID,'CAACAgIAAxkBAAMMY6rR27TAAuV4XS3ewflH9oL_iEcAAmcAA7zdTxE_r5hacV4s0SwE')
        }
        if(text === '/info'){
            return bot.sendMessage(chatID, `ты ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if(text === '/game'){
            return startGame(chatID)
        }
        return bot.sendMessage(chatID, `Ты пидор!`)
    })

    bot.on('callback_query', async msg => {
        // console.log(msg)
        const data = msg.data;
        const chatID = msg.message.chat.id;
        // console.log((`data: ${data},\n chatID: ${chatID},\n number:${chats[chatID]}`))
        // console.log(typeof data, typeof chats[chatID]);
        if (data === '/again'){
            return startGame(chatID);
        }
        if (data == chats[chatID]){
            return bot.sendMessage(chatID, `You're right. Your number is ${data}, and bot guessed ${chats[chatID]}`, againOptions);
        }else {
            return bot.sendMessage(chatID, `You're wrong. Your number is ${data}, and bot guessed ${chats[chatID]}`, againOptions);
        }
    })
}

start();