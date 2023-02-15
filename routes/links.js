const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const [ links ] = await pool.query('SELECT * FROM links')
  console.log(links)
  res.render('links/list', { links })
  
});

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {

  const { title, url, description } = req.body
  const newLink = {
    title,
    url,
    description
  }
  await pool.query('INSERT INTO links SET ?', [newLink])
  req.flash('success', 'Link saved successfully')
  res.redirect('/links')
})


router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [id])
  req.flash('success', 'Link removed successfully')
  res.redirect('/links')
}
)
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  const [ link ] = await pool.query('SELECT * FROM links WHERE id = ?', [id])
  
  res.render('links/edit', {link:link[0]})
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, url, description} = req.body
  const newLink = {
    title,
    url,
    description
  }
  await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id])
  req.flash('success', 'Link updated successfully')
  res.redirect('/links')
})

module.exports = router;
