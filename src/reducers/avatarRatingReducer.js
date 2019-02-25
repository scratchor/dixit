import { GET_AVATAR } from '../actions/types';

const initialState = {
  avatar: {
    url: 'http://pravda-team.ru/pravda/image/article/3/8/5/300385.jpeg'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AVATAR:
      console.log(action);
      return {
        ...state,
        avatar: { url: `${action.avatar}` }
      };
    default:
      return state;
  }
}
