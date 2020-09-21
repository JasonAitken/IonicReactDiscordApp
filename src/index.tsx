import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Discord from 'discord.js';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


//const Discord = require('discord.js');
/*const {token } = require('./config.json');
const bot = new Discord.Client();


bot.login(token); // Enter token in config.json

bot.on('message', message => {

    



});*/
serviceWorker.unregister(); 