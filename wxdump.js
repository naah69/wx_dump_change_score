var CryptoJS = require('crypto-js');
var http = require('http');
var querystring = require('querystring');

function encrypt (text, originKey) {
    var originKey = originKey.slice(0, 16),
        key = CryptoJS.enc.Utf8.parse(originKey),
        iv = CryptoJS.enc.Utf8.parse(originKey),
        msg = JSON.stringify(text)
    var ciphertext = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return ciphertext.toString()
}

function decrypt (text, originKey) {
    var originKey = originKey.slice(0, 16),
        key = CryptoJS.enc.Utf8.parse(originKey),
        iv = CryptoJS.enc.Utf8.parse(originKey)
    var bytes = CryptoJS.AES.decrypt(text, key, {
        iv: iv
    })
    var plaintext = CryptoJS.enc.Utf8.stringify(bytes)
    return plaintext
}


module.exports = {
  
   *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf('https://mp.weixin.qq.com/wxagame/wxagame_settlement') === 0) {
	   var data=JSON.parse(requestDetail.requestData.toString());
	   var sessionid=data['base_req']['session_id'];
	   var actiondata=data['action_data'];
	   actiondata=JSON.parse(decrypt(actiondata,sessionid));
	   actiondata['score']=Math.round(8000+Math.random()*2000);
	   
	     var action = [],
            musicList = [],
            touchList = []
		actiondata['game_data']=JSON.stringify({
                seed: Date.now(),
                action: action,
                musicList: musicList,
                touchList: touchList,
                version: 1
            });
	   console.log(actiondata);
	   var senddata='{"base_req":{"session_id":"'+sessionid+'","fast":1},"action_data":"'+encrypt(actiondata, sessionid)+'"}';
	   
	   console.log(senddata);
	   return {
        requestData: senddata
      };
	   
    }
  },
};
