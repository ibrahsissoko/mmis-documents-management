import * as moment from 'moment';
import Knex = require('knex');
export class LoginModel {
  doLogin(knex: Knex, username: string, password: string) {
    return knex('users')
      .select('fullname')
      .where({
        username: username,
        password: password
      });
  }
}
