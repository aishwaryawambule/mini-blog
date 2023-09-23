import { connect } from 'mongoose'
import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } from '../config'
import { log } from '../utils/log';

export function initDb() {
  try {
    //for localhost
    const URI = `mongodb://${DB_HOST}:27017/${DB_NAME}`;

    //for instance besides localhost
    // `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&readPreference=secondaryPreferred`

    return connect(URI, { maxPoolSize: 100 });
  } catch (error) {
    log.info('ERROR WHILE CONNECTING MONGODB:', error);
  }
}