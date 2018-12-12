module.exports = {
  'GET /api/profile': {
    name: 'Demo',
    department: '',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    userid: 10001,
  },

  'POST /api/login': (req, res) => {
    const { password, username } = req.body;
    if (username === 'admin' && password === 'admin') {
      res.send({
        status: 200,
        statusText: 'ok',
        currentAuthority: 'admin',
      });
    } else if (username === 'user' && password === 'user') {
      res.send({
        status: 200,
        statusText: 'ok',
        currentAuthority: 'user',
      });
    } else {
      res.send({
        status: 401,
        statusText: 'unauthorized',
        currentAuthority: 'guest',
      });
    }
  },

  'POST /api/register': (req, res) => {
    res.send({
      status: 200,
      statusText: 'ok',
      currentAuthority: 'user',
    });
  },

  'POST /api/logout': (req, res) => {
    res.send({
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    });
  },

  'GET /api/transactions': (req, res) => {
    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    const getData = () => {
      return Array.from({ length: 20 }).map((item, index) => {
        var amount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        return {
          transactionID: `T${uuidv4()}`,
          transactionDate: `2018-12-${index + 7}`,
          transactionType: 'Payment',
          paymentMethod: 'Card',
          amount: amount,
          currency: 'MYR',
          amountText: `RM ${amount}.00`,
          statusCode: 1,
          status: 'OK',
          description: 'Ride',
          createdAt: 1544235050
        }
      });
    };
    res.send({
      status: 200,
      statusText: 'ok',
      data: getData()
    });
  },

  'POST /api/transactions/:transactionId/refund': (req, res) => {
    res.send({
      status: 200,
      statusText: 'ok',
      data: {
        transactionID: req.params.transactionId
      }
    });
  }
};
