var crypto = require('crypto')
    algorithm ="aes-256-ctr"
    secret = "sshhhhh!!!!!!!!!!"

module.exports = {
  encrypt:(pwd)=>{
    var cipher = crypto.createCipher(algorithm,secret);
    var crypted = cipher.update(pwd,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: (encryptedpwd)=>{
    var decipher = crypto.createDecipher(algorithm,secret)
    var dec = decipher.update(encryptedpwd,'hex','utf8')
    dec += decipher.final('utf8')
    return dec;
  }
}
