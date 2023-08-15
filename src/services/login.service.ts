import bcrypt from 'bcryptjs';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtUtils from '../utils/jwtUtils';
import { Login } from '../types/Login';
import UserModel from '../database/models/user.model';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const host = await UserModel.findOne({ where: { username: login.username } });

  if (!host || !bcrypt.compareSync(login.password, host.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { id, username } = host.dataValues;
  const token = jwtUtils.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};