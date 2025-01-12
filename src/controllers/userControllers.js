const database = require("../../database");
const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([Users]) => {
            res.json(Users); // use res.json instead of console.log
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from Users where id = ?", [id])
        .then(([Users]) => {
            if (Users[0] != null) {
                res.json(Users[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
module.exports = {
    getUsers,
    getUserById,
};