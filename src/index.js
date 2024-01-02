import express from "express";
import "dotenv/config"
import { PrismaClient } from "@prisma/client";
const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

app.use(express.json());

// CREATE
app.post('/users', async(req, res)=> {
    try{
        const { name, address, email } = req.body; // menggunakan desctructiring object 

        if (!name || !email || !address) {
            res.status(404).json({
                message: "Created User Failed",
            })
        }
        const result = await prisma.users.create({
            data: {
                name: name,
                address: address,
                email: email
            }
        })

        res.status(201).json({
            message: "Created User Successfully",
            data: result
        })

    }catch(error) {
        res.status(500).json({
            message: "Created User Failed..",
            serverMesage: error
        })
    }
})

// READ
app.get('/users', async(req, res)=> {
    try {
        const result = await prisma.users.findMany({
            select: {
                idUser: true,
                name: true,
                address: true,
                email: true,
            }
        });

        res.json({
            message: "Get List user Successfully",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            message: "Get list user failed.."
        })
    }
});

// UPDATE
app.patch('/users/:idUser', async(req, res)=> {
    try {
        const { idUser } = req.params;
        const { name, email, address } = req.body;

        if (!name || !email || address) {
            res.status(400).json({
                message: "Updated User Failed..",
            })
        }

        const result = await prisma.users.update({
            data: {
                name: name,
                email: email,
                address: address,
            },
            where: {
                idUser: Number(idUser),
            }
        })

        res.status(201).json({
            message: "Updated User Successfully",
        })
        
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            message: "Internal Server ERROR.."
        })
    }
})
// DELETE
app.delete('/users/:idUser', async(req, res)=> {
    try {
        const { idUser } = req.params;
        await prisma.users.delete({
            where: {
                idUser: Number(idUser)
            }
        })
        
        res.json({
            message: "Deleted User Successfully",
            data: null
        })
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/comments', async(req, res)=> {
    try {
        const result = await prisma.comments.findMany({
            select: {
                id: true,
                body: true,
            }
        })

        res.json({
            message: "Get List user Successfully", 
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Eror"

        })
    }
})

// CREATE-COMMENT
app.post('/comments', async(req, res)=> {
    try {
        const {body} = req.body;
        if(!body) {
            res.json(400).json({
                message: "Created Comment Faild",
            })
        }
       
        const result = await prisma.comments.create({
            data: {
                body: body
            }
        })

        res.status(201).json({
            message: "Created Comment Succesfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// UPDATE-COMMENT
app.patch('/comments/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const {body} = req.body;
        if (!body) {
            res.status(400).json({
                message: "UPDATED Comment Failed"
            })
        }
        const result = await prisma.comments.update({
            data: {
                body: body
            },
            where: {
                id: Number(id)
            }
        })

        res.json({
            message: "Updated Comment Successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// DELETE-COMMENT
app.delete('/comments/:id', async(req, res)=> {
    try {
        const { id } = req.params;

        const result = await prisma.comments.delete({
            where:{
                id: Number(id)
            }
        })

        res.status(201).json({
            message: "Deleted Comment Suscessfully.."
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.listen(PORT, ()=> { 
    console.log(`Server runing on ${PORT}`)
})

