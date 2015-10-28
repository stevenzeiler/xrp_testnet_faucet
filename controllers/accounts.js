import {fundNewAccount} from '../lib/RippleAccountCreator'
import Config from '../lib/Config'

module.exports = function(models, lib) {

  return {
    create: function(req, res, next) {

      fundNewAccount().then(account => {
        res.status(201).send({
          account: account,
          balances: `${Config.get('RIPPLED_SERVER_REST')}/v1/accounts/${account.address}/balances`
        })
      }) 
      .catch(error => {
        res.status(500).send({
          error: error
        })
      })
    }
  }
}

