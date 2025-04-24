declare namespace Express {
  export interface Request {
    user: UserDto;
    cookies: object;
  }
  export interface Response {
    user: UserDto;
  }
}
