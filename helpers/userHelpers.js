module.exports = db => {
<<<<<<< HEAD
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
=======
const getUsers = () => {
  const query = {
   text: `SELECT * FROM users;`
  }
  return db.query(query).then(result => result.rows)
}
 return getUsers();
}
>>>>>>> 95501503969b5cf431bd8e6bf4ef3f72ce27be14
