export interface RefreshToken {
  tokenId: string;
  userId: string;

  // JWT
  iat: number;
  exp: number;
}
