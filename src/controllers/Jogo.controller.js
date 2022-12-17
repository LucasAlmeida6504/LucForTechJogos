const Jogo = require('../models/jogo.model')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const novoJogo = new Jogo(data)
        const jogoSalvo = await novoJogo.save()
        if (!jogoSalvo) {
            throw new Error('O jogo não pode ser savo!')
        }
        res.status(201).json({
            message: 'Novo jogo criado :)'
        })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const jogos = await Jogo.find()
        res.status(200).json(jogos)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const jogo = await Jogo.findById(id)
        if (!jogo) {
            throw new Error(`O jogo com o id: ${id} não foi encontrado`)
        } 
        res.status(200).json(jogo)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const jogo = await Jogo.findById(id)
        if(!jogo) {
            throw new Error(`O jogo com o id: ${id} não foi encontrado`)
        }
        const novoJogo = await Jogo.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(novoJogo)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const jogo = await Jogo.findById(id)
        if(!jogo) {
            throw new Error(`O jogo com o id: ${id} não foi encontrado`)
        }
        await Jogo.findByIdAndDelete(id)
        res.status(200).json({
            message: `O jogo com o id: ${id} foi deletado`
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