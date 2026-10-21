import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Livro from "./Livros.js";


dotenv.config();

const app = express();
const PORT = 2000;
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB")
    } catch (error) {
        console.log("Erro ao conectar o MongoDB", error)
    }
}

connectDB()

app.post("/livros", async (req, res) => {
    try {
        const novoLivro = await Livro.create(req.body)
        res.json(novoLivro)
    } catch (error) {
        res.json({ error: error.message })
    }
})


app.get("/livros", async (req, res) => {
    try {
        const livros = await Livro.find()
        res.json(livros)
    } catch (error) {
        ({ error: error.message })

    }
})

app.get("/livros/:id", async (req, res) => {
    try {
        const livroId = await Livro.findById(req.params.id)

        res.json(livroId)
    } catch (error) {
        ({ error: error.message })
    }
})

app.put("/livros/:id/update", async (req, res) => {
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(livroAtualizado)
    } catch (error) {
        ({ error: error.message })
    }
})

app.delete("/livros/:id", async (req, res) => {
    try {
        const livroDeletado = await Livro.findOneAndDelete(req.params.id)
        res.json(livroDeletado)
    } catch (error) {
        ({ error: error.message })
    }
})


app.get("/livros/available/disponivel", async (req, res) => {
    try {
        const livros = await Livro.find({
            disponivel: true
        })
        res.json(livros)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/livros/genero/:genero", async (req, res) => {

    try {
        const livros = await Livro.find({
            genero: req.params.genero
        })
        res.json(livros)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/livros/before/:ano", async (req, res) => {
    try {
        const ano = Number(req.params.ano)

        if (ano < 0) {
            res.json({ error: "Ano inválido" })
        }
        const livros = await Livro.find({
            anoPublicacao: { $lt: ano }
        })

        res.json(livros)

    } catch (error) {
        res.json({ error: error.message })
    }
})


app.patch("/livros/:id/availability", async (req, res) => {
    try {
        const livro = await Livro.findByIdAndUpdate(
            req.params.id,
            { disponivel: req.body.disponivel },
            { returnDocument: 'after' }
        )

        res.json(livro)
    } catch (error) {
        res.json({ error: error.message })
    }
})


app.get("/livros/paginas/long", async (req, res) => {
    try {
        const livros = await Livro.find({
            paginas: { $gt: 300 }
        })
        res.json(livros)

    } catch (error) {
        res.json({ error: error.message })
    }
})


app.get("/livros/autor/:autor", async (req, res) => {

    try {
        const livros = await Livro.find({
            autor: req.params.autor
        })
        res.json(livros)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/livros/count/livros", async (req, res) => {
    try {
        const total =await Livro.countDocuments()

        res.json ({ totalLivros : total })

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.listen(PORT, () =>
    console.log("O servidor está rotando na porta:", PORT)
)

