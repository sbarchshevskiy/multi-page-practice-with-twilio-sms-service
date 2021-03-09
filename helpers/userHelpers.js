module.exports = db => {
const getUsers = () => {
  const query = {
   text: `SELECT * FROM users;`
  }
  return db.query(query).then(result => result.rows)
}
 return getUsers();
}
