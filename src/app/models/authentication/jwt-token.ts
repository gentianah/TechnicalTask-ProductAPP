export interface JwtToken {
    sub: string;
    jti: string;
    email: string;
    role: string;
    username: string; 
    password: string;
    fullName: string;
    id: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
  }
  