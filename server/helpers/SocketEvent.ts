enum SocketEvent {
  FROM_CLIENT_JOIN_GAME = 'FROM_CLIENT_JOIN_GAME',
  FROM_SERVER_JOIN_GAME = 'FROM_SERVER_JOIN_GAME',
  FROM_CLIENT_START_GAME = 'FROM_CLIENT_START_GAME',

  FROM_SERVER_PAUSE_GAME = 'FROM_SERVER_PAUSE_GAME',
  FROM_CLIENT_REQUEST_JOIN_IN_PROGRESS = 'FROM_CLIENT_REQUEST_JOIN_IN_PROGRESS',
  FROM_SERVER_REQUEST_JOIN_IN_PROGRESS = 'FROM_SERVER_REQUEST_JOIN_IN_PROGRESS',
  FROM_CLIENT_CONFIRM_JOIN_IN_PROGRESS = 'FROM_CLIENT_CONFIRM_JOIN_IN_PROGRESS',
  FROM_SERVER_UNPAUSE_GAME = 'FROM_SERVER_UNPAUSE_GAME',

  FROM_SERVER_REFRESH_CLIENT_DATA = 'FROM_SERVER_REFRESH_CLIENT_DATA',
  FROM_SERVER_REFRESH_GAME_STATE = 'FROM_SERVER_REFRESH_GAME_STATE',

  FROM_CLIENT_PLAY_MONEY = 'FROM_CLIENT_PLAY_MONEY',
  FROM_CLIENT_PLAY_PROPERTY = 'FROM_CLIENT_PLAY_PROPERTY',
  FROM_CLIENT_PLAY_PROPERTY_WILDCARD = 'FROM_CLIENT_PLAY_PROPERTY_WILDCARD',
  FROM_CLIENT_PLAY_PROPERTY_WILDCARD_ALL = 'FROM_CLIENT_PLAY_PROPERTY_WILDCARD_ALL',
  FROM_CLIENT_PLAY_ACTION = 'FROM_CLIENT_PLAY_ACTION',
  FROM_CLIENT_END_TURN = 'FROM_CLIENT_END_TURN',

  FROM_SERVER_ACTION_PENDING = 'FROM_SERVER_ACTION_PENDING',
  FROM_SERVER_ACTION_END_ALL = 'FROM_SERVER_ACTION_END_ALL',

  FROM_SERVER_ACTOR_QUESTION_RENT = 'FROM_SERVER_ACTOR_QUESTION_RENT',
  FROM_CLIENT_ACTOR_RESPONSE_RENT = 'FROM_CLIENT_ACTOR_RESPONSE_RENT',
  FROM_SERVER_TARGET_QUESTION_RENT = 'FROM_SERVER_TARGET_QUESTION_RENT',
  FROM_CLIENT_TARGET_RESPONSE_RENT = 'FROM_CLIENT_TARGET_RESPONSE_RENT',

  FROM_SERVER_ACTOR_QUESTION_RENT_SINGLE = 'FROM_SERVER_ACTOR_QUESTION_RENT_SINGLE',
  FROM_CLIENT_ACTOR_RESPONSE_RENT_SINGLE = 'FROM_CLIENT_ACTOR_RESPONSE_RENT_SINGLE',

  FROM_SERVER_TARGET_QUESTION_IMB = 'FROM_SERVER_TARGET_QUESTION_IMB',
  FROM_CLIENT_TARGET_RESPONSE_IMB = 'FROM_CLIENT_TARGET_RESPONSE_IMB',

  FROM_SERVER_ACTOR_QUESTION_DEBT_COLLECTOR = 'FROM_SERVER_ACTOR_QUESTION_DEBT_COLLECTOR',
  FROM_CLIENT_ACTOR_RESPONSE_DEBT_COLLECTOR = 'FROM_CLIENT_ACTOR_RESPONSE_DEBT_COLLECTOR',
  FROM_SERVER_TARGET_QUESTION_DEBT_COLLECTOR = 'FROM_SERVER_TARGET_QUESTION_DEBT_COLLECTOR',
  FROM_CLIENT_TARGET_RESPONSE_DEBT_COLLECTOR = 'FROM_CLIENT_TARGET_RESPONSE_DEBT_COLLECTOR',

  FROM_SERVER_ACTOR_QUESTION_FORCED_DEAL = 'FROM_SERVER_ACTOR_QUESTION_FORCED_DEAL',
  FROM_CLIENT_ACTOR_RESPONSE_FORCED_DEAL = 'FROM_CLIENT_ACTOR_RESPONSE_FORCED_DEAL',
  FROM_SERVER_TARGET_QUESTION_FORCED_DEAL = 'FROM_SERVER_TARGET_QUESTION_FORCED_DEAL',
  FROM_CLIENT_TARGET_RESPONSE_FORCED_DEAL = 'FROM_CLIENT_TARGET_RESPONSE_FORCED_DEAL',

  FROM_SERVER_ACTOR_QUESTION_SLY_DEAL = 'FROM_SERVER_ACTOR_QUESTION_SLY_DEAL',
  FROM_CLIENT_ACTOR_RESPONSE_SLY_DEAL = 'FROM_CLIENT_ACTOR_RESPONSE_SLY_DEAL',
  FROM_SERVER_TARGET_QUESTION_SLY_DEAL = 'FROM_SERVER_TARGET_QUESTION_SLY_DEAL',
  FROM_CLIENT_TARGET_RESPONSE_SLY_DEAL = 'FROM_CLIENT_TARGET_RESPONSE_SLY_DEAL',

  FROM_SERVER_ACTOR_QUESTION_HOUSE = 'FROM_SERVER_ACTOR_QUESTION_HOUSE',
  FROM_CLIENT_ACTOR_RESPONSE_HOUSE = 'FROM_CLIENT_ACTOR_RESPONSE_HOUSE',

  FROM_SERVER_ACTOR_QUESTION_HOTEL = 'FROM_SERVER_ACTOR_QUESTION_HOTEL',
  FROM_CLIENT_ACTOR_RESPONSE_HOTEL = 'FROM_CLIENT_ACTOR_RESPONSE_HOTEL',

  FROM_SERVER_ACTOR_QUESTION_DEAL_BREAKER = 'FROM_SERVER_ACTOR_QUESTION_DEAL_BREAKER',
  FROM_CLIENT_ACTOR_RESPONSE_DEAL_BREAKER = 'FROM_CLIENT_ACTOR_RESPONSE_DEAL_BREAKER',
  FROM_SERVER_TARGET_QUESTION_DEAL_BREAKER = 'FROM_SERVER_TARGET_QUESTION_DEAL_BREAKER',
  FROM_CLIENT_TARGET_RESPONSE_DEAL_BREAKER = 'FROM_CLIENT_TARGET_RESPONSE_DEAL_BREAKER',

  FROM_SERVER_TARGET_QUESTION_JUST_SAY_NO = 'FROM_SERVER_TARGET_QUESTION_JUST_SAY_NO',
  FROM_CLIENT_TARGET_RESPONSE_JUST_SAY_NO = 'FROM_CLIENT_TARGET_RESPONSE_JUST_SAY_NO',
  FROM_CLIENT_END_JUST_SAY_NO = 'FROM_CLIENT_END_JUST_SAY_NO',

  SWAP_WILDCARDS = 'SWAP_WILDCARDS'
}

export default SocketEvent;
