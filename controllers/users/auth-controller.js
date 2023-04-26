import * as usersDao from "./users-dao.js";
import {findUserByUsername} from "./users-dao.js";

const AuthController = (app) => {
    const register = async (req, res) => {
            console.log("Request: ", req.body);
            const username = req.body.username;
            const user = await usersDao.findUserByUsername(username);
            if (user) {
                res.sendStatus(409);
                return;
            }
            const postedUser = {...req.body,
                avatar:"",
                bannerPicture:"",
                bio:"",
                website:"",
                location:"",
                dateJoined:(new Date()).toDateString(),
                reviewNum:"0"}
            const newUser = await usersDao.createUser(postedUser);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao.findUserByCredentials(username, password);
        console.log(user);
        if (user) {
            console.log("User exists!");
            req.session["currentUser"] = user;
            console.log(req.session["currentUser"]); // This prints
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        //console.log("AuthController Profile currentUser: ", currentUser)
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const uid = req.body.id;
        const result = await usersDao.updateUser(uid, req.body);
        res.json(result);                            // Not sure if this is the correct thing to return here
    };



    const checkUsername = async (req, res) => {
        const username = req.body;
        const user = await usersDao.findUserByUsername(username);
        if(user){
            res.send("That username is taken");
        }
        res.sendStatus(200);
    }

    const deleteCurrentUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const result = await usersDao.deleteUser(currentUser.uid);
        res.json(result);
    };

    const deleteUser = async (req, res) => {
        const userID = req.body;
        const result = await usersDao.deleteUser(userID);
        res.json(result);
    }

    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
    app.post("api/users/check",     checkUsername);
    app.post("/api/users/delete", deleteUser);
};
export default AuthController;