const Usuario = require('../models/Usuario.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { security } = require('../utils/constants')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        const newUser = new Usuario(data)
        const savedUser = await newUser.save()
        if (!savedUser) {
            throw new Error('O usuário não foi salvo!')
        }
        res.status(201).json({
            message: 'Novo usuário criado! :)'
        })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await Usuario.find()
        for(let user of users){
            user.password = undefined
        }
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Usuario.findById(id)
        if (!user) {
            throw new Error(`O usuário com o ID: ${id} não foi encontrado`)
        } 
        user.password = undefined
        res.status(200).json(Usuario)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const user = await Usuario.findById(id)
        if(!user) {
            throw new Error(`O usuário com o ID: ${id} não foi encontrado`)
        }
        data.password = user.password
        const newUser = await Usuario.findByIdAndUpdate(id, data, {new: true})
        newUser.password = undefined
        res.status(200).json(newUser)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Usuario.findById(id)
        if(!user) {
            throw new Error(`O usuário com o ID: ${id} não foi encontrado`)
        }
        await Usuario.findByIdAndDelete(id)
        res.status(200).json({
            message: `O usuário com o ID: ${id} foi deletado`
        })
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const {username, password} = req.body
        if (!(username && password)) {
            throw new Error('Por favor insira seu Usuário e sua Senha')
        }

        const user = await Usuario.findOne({username: username,})
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                sub: user._id,
                iss: security.iss,
                username: user.username,
                name: user.name
            }, security.secret, {
                expiresIn: security.expires
            })
            res.status(200).json(token)
        } else {
            throw new Error('Usuário ou senha inválido')
        }
    } catch (err) {
        next(err)
    } 
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove,
    authenticate
}