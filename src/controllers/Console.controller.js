const Console = require('../models/Console.model')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const newConsole = new Console(data)
        const savedConsole = await newConsole.save()
        if (!savedConsole) {
            throw new Error('O console não pode ser salvo')
        }
        res.status(201).json({
            message: 'Novo console criado'
        })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const Consoles = await Console.find()
        res.status(200).json(Consoles)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const Console = await Console.findById(id)
        if (!Console) {
            throw new Error(`O console cujo o id é: ${id} Não foi encontrado`)
        } 
        res.status(200).json(Console)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const Console = await Console.findById(id)
        if(!Console) {
            throw new Error(`O console com o id: ${id} não foi encontrado`)
        }
        const newConsole = await Console.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newConsole)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const Console = await Console.findById(id)
        if(!Console) {
            throw new Error(`o console com o id:  ${id} nao foi encontrado`)
        }
        await Console.findByIdAndDelete(id)
        res.status(200).json({
            message: `o console com o id: ${id} foi deletado`
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}