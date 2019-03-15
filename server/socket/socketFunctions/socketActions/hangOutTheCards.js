const Cards = require('../../../databases/mongo/models/Cards');
const client = require('../../../databases/redis/client');

module.exports = (io, cards, socketRoom) => {
  return new Promise(resolve => {
    const hangOutCards = () => {
      const num = Math.ceil(Math.random() * 10);
      console.log(num);
      let count = 0;
      while (count < num) {
        count += 1;
        cards.sort(() => {
          return 0.5 - Math.random();
        });
      }
    };

    Cards.find({})
      .sort({ field: 'desc' })
      .then(data => {
        data.map(element => cards.push(element.url));
        hangOutCards();
        // eslint-disable-next-line prettier/prettier
        client.lrange(`socketsId${socketRoom.split('')[4]}`, 0, -1, (err, value) => {
            console.log('socketsId', value);
            const readyCards = [];
            value.forEach(() => {
              readyCards.push({
                type: 'HANG_OUT_THE_CARDS',
                playerCards: []
              });
            });
            let count = 0;
            while (count < 5) {
              value.forEach((element, index) =>
                readyCards[index].playerCards.push(cards.shift())
              );
              count += 1;
            }
            console.log('readyCards', readyCards);
            console.log('cards after', cards);
            value.forEach((element, index) =>
              io.to(value[index]).emit('action', readyCards[index])
            );
            resolve(cards);
          }
        );
      })
      .catch(error => console.log(error));
  });
};
