var jwt   = require('jwt-simple'),
    users = require('../users/users.schema');

module.exports = {
  login: login
};

function login (req, res) {
  var email = req.body.email || '';
  var password = req.body.password || '';

  if (email == '' || password == '') {
    res.status(401);
    res.json({
      "status": 401,
      "message": "이메일과 비밀번호를 입력해주세요"
    });
    return ;
  }

  // email을 통해 user 객체를 들고 온다.
  // 없다면, 등록된 email이 없다고 한다.
  // 있다면,
  //   password 가 같은지 본다.
  //   같다면, genToken 을 통해 암호화된 token 으로 응답한다.
  //   다르다면, 비밀번호가 틀렸다고 한다.

  users.findOne( { "email": email }, function(err, item) {
    if (err) {
      console.error(err);
      return ;
    } else {
      console.log(item);
      res.json(item);
    }
    return ;
  });

  /*
  if (dbUserObj) {
    res.json(genToken(dbUserObj));
  }
  */
}
