var jwt   = require('jwt-simple'),
    users = require('../users/users.schema');

module.exports = {
  login: login,
  validateUser: validateUser
};

function login (req, res) {
  var userid = req.body.userid || '';
  var password = req.body.password || '';

  if (userid == '' || password == '') {
    res.status(401);
    res.json({
      "status": 401,
      "message": "이메일과 비밀번호를 입력해주세요"
    });
    return ;
  }

  // userid 통해 user 객체를 들고 온다.
  // 없다면, 등록된 userid가 없다고 한다.
  // 있다면,
  //   password 가 같은지 본다.
  //   같다면, genToken 을 통해 암호화된 token 으로 응답한다.
  //   다르다면, 비밀번호가 틀렸다고 한다.

  console.log(userid, password);
  users.findOne( {"userid" : userid})
    .then((user) => {
      if (user === null) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "입력하신 ID 가 존재하지 않습니다."
        });
      } else {
        res.json(genToken(userid));
      }
    })
    .catch((err) => {
      res.status(500);
      res.json({
        "status": 500,
        "message": "서버에 문제가 발생하였습니다. 관리자에게 문의해주세요."
      })
    });
}

function validateUser(userid) {
  users.findOne({"userid": userid})
    .then((user) => {
      return {
        userid: user.userid
      };
    })
    .catch((err) => {
      console.error("ValidateUser find error : " + err);
      return null;
    });
}

function genToken(userid) {
  let expires = expiresIn(365);
  var token = jwt.encode({
    exp: expires
  }, require(global.__base + "config").token.secret);

  return {
    token: token,
    expires: expires,
    userid: userid
  }
}

function expiresIn(numDays) {
  let dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() * numDays);
}