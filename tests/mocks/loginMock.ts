const validPassword = 'chang3m3';
const validUsername = 'vieira';
const noUsernameLoginBody = { username: '', password: validPassword };
const noPasswordLoginBody = { username: validUsername, password: '' };
const notExistingUserBody = { username: 'vieira', password: validPassword };
const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
};