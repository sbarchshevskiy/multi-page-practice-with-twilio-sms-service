module.exports = db => {
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
