export default class UserDto {
  constructor(data) {
    if (data) {
      this.nickname = data.nickname;
      this.email = data.email;
      this.password = data.password;
      this.introduction = data.introduction;
    }
  }
}
