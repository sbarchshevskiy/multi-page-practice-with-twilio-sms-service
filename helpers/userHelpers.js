module.exports = db => {
<<<<<<< HEAD
const getUsers = () => {
  const query = {
   text: `SELECT * FROM users;`
  }
  return db.query(query).then(result => result.rows)
}
 return getUsers();
}
=======
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users;`
    };
    return db.query(query);
  };
  return {
    getUsers
  };
};
>>>>>>> master
