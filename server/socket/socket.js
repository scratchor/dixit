const client = require('../databases/redis/client');

global.permission = true;

const {
  sendJoinRoomInfo,
  sendChatRoomInfo,
  deleteFromDatabase,
  writeJoinRoomSocketInfo
} = require('./socketFunctions/socketRedis');

const authentification = require('./socketFunctions/socketActions/authentification');
const reporAssosiation = require('./socketFunctions/socketActions/reporAssosiation');
const chatMessage = require('./socketFunctions/socketActions/chatMessage');
const hangOutTheCards = require('./socketFunctions/socketActions/hangOutTheCards');
const AddOneCardAction = require('./socketFunctions/socketActions/AddOneCardAction');

// initial prepare
const rooms = ['game1'];

client.del('avatar1');
client.del('username1');
client.del('socketsId1');
client.del('playersNumber1');
client.del('associations1');
client.del('chatMessages1');
client.del('chatAvatars1');
client.del('chatUserNames1');
client.del('chatSocketsId1');
client.del('chatDates1');
client.del('ifGameStarted1');
client.del('score1');

const roomArrays = [
  `avatar${rooms[0].split('')[4]}`,
  `username${rooms[0].split('')[4]}`,
  `socketsId${rooms[0].split('')[4]}`,
  `associations${rooms[0].split('')[4]}`,
  `chatMessages${rooms[0].split('')[4]}`,
  `chatAvatars${rooms[0].split('')[4]}`,
  `chatUserNames${rooms[0].split('')[4]}`,
  `chatSocketsId${rooms[0].split('')[4]}`,
  `chatDates${rooms[0].split('')[4]}`,
  `score${rooms[0].split('')[4]}`
];

const roomArraysDelete = [
  `avatar${rooms[0].split('')[4]}`,
  `username${rooms[0].split('')[4]}`,
  `score${rooms[0].split('')[4]}`,
  `socketsId${rooms[0].split('')[4]}`
];
client.set(`playersNumber${rooms[0].split('')[4]}`, 0);
client.set(`ifGameStarted${rooms[0].split('')[4]}`, false);

let playersNumber = 0;

let cards = [];

const socketConnect = io => {
  io.on('connection', socket => {
    // if you put token to localStorage (otherwise - for sesionStorage the next to line is false)
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    let { user } = socket.request;
    // room name for current scope
    let socketRoom;

    console.log(socket.id);

    const joinRoom = async room => {
      console.log('joinRoom permission', permission);
      if (permission) {
        permission = false;
        if (rooms.includes(room) && playersNumber < 10) {
          playersNumber += 1;
          console.log('playersNumber', playersNumber);
          socket.join(room);
          socketRoom = room;
          await sendJoinRoomInfo(socket, room);
          await sendChatRoomInfo(socket, room);
          await io.in(room).emit('action', {
            type: 'ADD_PLAYER',
            avatar: user.avatar,
            username: user.name,
            score: user.score,
            socketsId: socket.id
          });
          await writeJoinRoomSocketInfo(user, room, socket);

          socket.to(room).emit('newUser', {
            message: `New player has joined to the room ${room}`
          });
          permission = true;
          // eslint-disable-next-line no-console
          console.log(
            `New player has joined to the room ${room} with id`,
            socket.id
          );
        } else {
          socket.emit('error', 'Error, no room with such name existed');
          socket.disconnect();
        }
      } else {
        setTimeout(() => joinRoom(room), 1000);
      }
    };

    // eslint-disable-next-line prettier/prettier
    socket.on('joinRoom', room => {                                          // joinRoom
      joinRoom(room);
    });

    // eslint-disable-next-line prettier/prettier
    socket.emit('success', {                                                  // success
      message: 'success logged in!'
    });

    socket.on('action', async action => {
      switch (action.type) {
        // eslint-disable-next-line prettier/prettier
        case 'GET_AVATAR':                                                  // GET_AVATAR
          return socket.emit('action', {
            type: 'GET_AVATAR',
            avatar: user.avatar
          });

        // eslint-disable-next-line prettier/prettier
        case 'Authentification':                                           //  Authentification
          user = await authentification(socket, action);
          await socket.emit('joinRoom', { isAuthenticated: true });
          break;
        // eslint-disable-next-line prettier/prettier
        case 'INFO_ABOUT_START':                                           // INFO_ABOUT_START

          socket.to(socketRoom).emit('action', {
            type: 'INFO_ABOUT_START',
            startGameInfo: action.startGameInfo,
            message: action.message
          });
          break;

        // eslint-disable-next-line prettier/prettier
        case 'REPORT_ASSOCIATION':                                        // REPORT_ASSOCIATION
          reporAssosiation(io, action, socketRoom);
          break;

        // eslint-disable-next-line prettier/prettier
        case 'CHAT_MESSAGE':                                              // CHAT_MESSAGE
          chatMessage(socketRoom, action, socket);
          break;

        // eslint-disable-next-line prettier/prettier
        case 'HANG_OUT_THE_CARDS_SERVER':                            // HANG_OUT_THE_CARDS_SERVER
          cards = await hangOutTheCards(io, cards, socketRoom);
          break;

        // eslint-disable-next-line prettier/prettier
        case 'CHANGE_GAME_STATUS':                                        // CHANGE_GAME_STATUS
          return socket.to(socketRoom).emit('action', {
            type: 'CHANGE_GAME_STATUS',
            status: action.status
          });

        // eslint-disable-next-line prettier/prettier
        case 'START_GAME':                                                     // START_GAME
          client.set(`ifGameStarted${rooms[0].split('')[4]}`, true);
          return socket.to(socketRoom).emit('action', {
            type: 'START_GAME',
            ifGameStarted: action.ifGameStarted
          });

        // eslint-disable-next-line prettier/prettier
        case 'TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS':        // TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS
          return socket.to(socketRoom).emit('action', {
            type: 'TRANSPORT_PLAYERCARD_TO_EXPOSEDCARDS',
            src: action.src
          });

        // eslint-disable-next-line prettier/prettier
        case 'GUESS_NARRATOR_CARD':                                      // GUESS_NARRATOR_CARD
          return socket.to(socketRoom).emit('action', {
            type: 'GUESS_NARRATOR_CARD',
            master: action.master,
            src: action.src,
            socketId: action.socketId
          });

        // eslint-disable-next-line prettier/prettier
        case 'ADD_SCORE_HIGHLITER':                                      // ADD_SCORE_HIGHLITER
          console.log('ADD_SCORE_HIGHLITER', action.socketId, action.addScore);
          return socket.to(socketRoom).emit('action', {
            type: 'ADD_SCORE_HIGHLITER',
            socketId: action.socketId,
            addScore: action.addScore
          });
        // eslint-disable-next-line prettier/prettier
        case 'ADD_ONE_CARD_ACTION':                                       // ADD_ONE_CARD_ACTION(          ()
          cards = await AddOneCardAction(
            io,
            socketRoom,
            action,
            cards,
            roomArraysDelete
          );
          break;
        default:
          io.in(socketRoom).emit('action', {
            error: 'No such subscribe in Socket on server'
          });
          break;
      }
    });

    console.log('a user connected');

    // eslint-disable-next-line prettier/prettier
    socket.on('disconnecting', () => {                                        // disconnecting
      if (
        io.sockets.adapter.rooms[socketRoom] !== undefined &&
        io.sockets.adapter.rooms[socketRoom].sockets[socket.id]
      ) {
        socket.leave(socketRoom);
        io.in(socketRoom).emit('action', {
          type: 'DELETE_PLAYER',
          socketId: socket.id
        });
        playersNumber -= 1;
        deleteFromDatabase(socketRoom, socket, roomArraysDelete, io);
      }
    });

    // eslint-disable-next-line prettier/prettier
    socket.on('disconnect', () => {                                       // disconnect
      console.log('user disconnected');
      // number of all connections
      // console.log(io.engine.clientsCount);
    });
  });
};

module.exports = {
  socketConnect
};
