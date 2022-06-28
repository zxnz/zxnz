var node_crypto = require('crypto');

module.exports = zn.Class({
    static: true,
    properties: {
        
    },
    methods: {
        init: function (){
            
        },
        decode: function (key, iv, secretdata){
            var cryptkey = node_crypto.createHash('sha256').update(key).digest();
            var decipher = node_crypto.createDecipheriv('aes-256-cbc', cryptkey, iv);
            var decoded  = decipher.update(secretdata, 'base64', 'utf8');
            decoded += decipher.final('utf8');
            
            return decoded;
        },
        encode: function (key, iv, cleardata){
            var cryptkey = node_crypto.createHash('sha256').update(key).digest();
            var encipher = node_crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
            var encoded  = encipher.update(cleardata, 'utf8', 'base64');
            encoded += encipher.final('base64');
    
            return encoded;
        },
        md5: function (value){
            var _md5sum = node_crypto.createHash('md5');
            _md5sum.update(value);
    
            return _md5sum.digest('hex');
        }
    }
});