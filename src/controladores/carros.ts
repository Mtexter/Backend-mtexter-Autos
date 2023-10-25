import { Request, Response } from 'express'
import { knex } from '../bancoDeDados/conexao'
import { Carro } from '../tipos'

export const listarCarros = async (req: Request, res: Response) => {
    try {
        const data = await knex<Carro>('carros')
        return res.json(data)
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

export const detalharCarro = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await knex<Carro>('carros').where({ id: Number(id) }).first()
        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' })
        }
        return res.json(data)
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

export const cadastrarCarro = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body
    try {
        const data = await knex<Omit<Carro, 'id'>>('carros').insert({ marca, modelo, cor, ano, valor }).returning('*')

        return res.status(201).json(data[0])
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

export const atualizarCarro = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body
    const { id } = req.params
    try {
        const data = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' })
        }

        await knex<Carro>('carros').where({ id: Number(id) }).update({ ano, cor, marca, modelo, valor })

        return res.status(204).send()

    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

export const excluirCarro = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' })
        }

        await knex<Carro>('carros').where({ id: Number(id) }).del()

        return res.status(204).send()
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}