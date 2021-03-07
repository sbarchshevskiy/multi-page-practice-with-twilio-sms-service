module.exports = db => {
const getUsers = () => {
  const query = {
   text: `SELECT * FROM users;`
  }
  return db.query(query).then(res => res.rows)
}
  return {
    getUsers
  }
}
