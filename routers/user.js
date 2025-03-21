const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const prisma = require("../prismaClient");

const { auth } = require("../middlewares/auth");

router.get("/users", async (req, res) => {
    try {
        const data = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true,
                followers: true,
                following: true,
            },
            orderBy: { id: "desc" },
            take: 20,
        });

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.user.findFirst({
            where: { id: Number(id) },
            include: {
                posts: true,
                comments: true,
                followers: true,
                following: true,
            },
        });

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/users", async (req, res) => {
    const { name, username, bio, password } = req.body;

    // ! should use express validator
    if (!name || !username || !password) {
        return res.status(400)
            .json({ msg: "name, username and password required" });
    }

    const hash = await bcryptjs.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, username, password: hash, bio, },
        });
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password required" });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (user) {
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ token, user });
        }
    }

    res.status(401).json({ msg: "incorrect username or password" });
});


router.get("/verify", auth, async (req, res) => {
    const user = res.locals.user;
    res.json(user);
});

router.post("/follow/:id", auth, async (req, res) => {
    const user = res.locals.user;
    const { id } = req.params;

    const data = await prisma.follow.create({
        data: {
            followerId: Number(user.id),
            followingId: Number(id),
        },
    });

    res.json(data);
});

router.delete("/unfollow/:id", auth, async (req, res) => {
    const user = res.locals.user;
    const { id } = req.params;

    await prisma.follow.deleteMany({
        where: {
            followerId: Number(user.id),
            followingId: Number(id),
        }
    });

    res.json({ msg: `Unfollow user ${id}` });
});

router.get("/search", async (req, res) => {
    const { q } = req.query;

    const data = await prisma.user.findMany({
        where: {
            name: {
                contains: q,
            },
        },
        include: {
            followers: true,
            following: true,
        },
        take: 20,
    });

    res.json(data);
});


module.exports = { userRouter: router }