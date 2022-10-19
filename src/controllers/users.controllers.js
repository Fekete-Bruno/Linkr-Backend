import * as usersRepository from '../repositories/users.repositories.js';

async function searchUser (req, res) {

    const { word } = req.body;

    try {

        const users = await usersRepository.searchUser(word);

        if (users.rowCount > 0) {
            res.status(200).send(users.rows);
        } else {
            return res.sendStatus(404);
        }  
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);       
    }
};

export { searchUser };