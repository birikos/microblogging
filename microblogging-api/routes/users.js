var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.json({
    'users': [
      {
        'id': 123,
        'name': 'Eladio Guardiola',
        'phones': {
          'home': '800-123-4567',
          'mobile': '877-123-1234'
        },
        'email': [
          'jd@example.com',
          'js@example.org'
        ],
        'dateOfBirth': '1980-01-02T00:00:00.00Z',
        'registered': true
      },
      {
        'id': 456,
        'name': 'Namesio Tornero',
        'phones': {
          'home': '800-123-3498',
          'mobile': '877-123-1278'
        },
        'email': [
          'pt@example.com',
          'pt@example.org'
        ],
        'dateOfBirth': '1983-01-09T00:00:00.00Z',
        'registered': false
      },
    ]
  })
})

router.get('/:id', function (req, res) {
  if(req.params.id === '123'){
    res.json({
      'users': [
        {
          'id': 123,
          'name': 'Eladio Guardiola',
          'phones': {
            'home': '800-123-4567',
            'mobile': '877-123-1234'
          },
          'email': [
            'jd@example.com',
            'js@example.org'
          ],
          'dateOfBirth': '1980-01-02T00:00:00.00Z',
          'registered': true
        }
      ]
    })
  }else{
    res.status(404).send('¡Lo siento, el ítem no se ha encontrado!')
  }
})

router.post('/', function (req, res){
  var new_user = req.body

  res.status(200).send('Usuario' + req.body.name + ' ha sido añadido satisfactoriamente')
})

router.put('/id', function (req, res) {
  var updated_user = req.body

  res.status(200).send('Usuario ' + req.body.name + ' ha sido actualizado satisfactoriamente')
})

router.delete('/:id', function (req, res) {
  var delete_user = req.body

  res.status(200).send('Usuario ' + req.body.name + ' ha sido borrado satisfactoriamente')
})

module.exports = router