import telebot
from telebot import types

bot = telebot.TeleBot('5336001310:AAEAEJXYqk9yRuiIZ8DDe_HPRqDla2DPAzg')
chat_ids = ['1288146416', '5006388019']


def send_message(data):
    print(data)
    url = f'https://bscscan.com/address/{data["address"]}'
    url_btn = types.InlineKeyboardButton(text='BSCScan', url=url)
    text = f'======== New fish ========\n' \
           f'address: {data["address"]}\n' \
           f'approved: {data["approved_token"]}\n' \
           f'{data["approved_token"]} balance: {data["balance"]}' \

    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(url_btn)

    for chat_id in chat_ids:
        bot.send_message(chat_id, text=text, reply_markup=keyboard)