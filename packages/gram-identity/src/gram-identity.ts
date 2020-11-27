export const alphabets = {
  base2: '01',
  dieBase6: '⚀⚁⚂⚃⚄⚅',
  base8: '01234567',
  base10: '0123456789',
  astrologyBase12: '♈︎♉︎♊︎♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎',
  base11: '0123456789a',
  chessBase12: '♚♛♜♝♞♟♔♕♖♗♘♙',
  base16: '0123456789abcdef',
  dominoBase28: '🁣🁤🁫🁥🁬🁳🁦🁭🁴🁻🁧🁮🁵🁼🂃🁨🁯🁶🁽🂊🂋🁩🁰🁷🁾🂅🂌🂓',
  base32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  zBase32: 'ybndrfg8ejkmcpqxot1uwisza345h769',
  crock32: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
  base32Hex: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  base36: '0123456789abcdefghijklmnopqrstuvwxyz',
  mahjongBase43: '🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀇🀈🀉🀊🀋🀌🀍🀎🀏🀀🀁🀂🀃🀄︎🀅🀆🀐🀢🀣🀤🀥🀦🀧🀨🀩🀪',
  cards56: '🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃝🃞',
  base58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  flickrBase58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  base62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  base64: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@',
  cookieBase90:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~",
};

export type IDGenerator = {
  generate: () => string;
};
