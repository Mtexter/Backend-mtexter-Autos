"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCarro = exports.atualizarCarro = exports.cadastrarCarro = exports.detalharCarro = exports.listarCarros = void 0;
const conexao_1 = require("../bancoDeDados/conexao");
const listarCarros = async (req, res) => {
    try {
        const data = await (0, conexao_1.knex)('carros');
        return res.json(data);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
exports.listarCarros = listarCarros;
const detalharCarro = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        return res.json(data);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
exports.detalharCarro = detalharCarro;
const cadastrarCarro = async (req, res) => {
    const { marca, modelo, cor, ano, valor } = req.body;
    try {
        const data = await (0, conexao_1.knex)('carros').insert({ marca, modelo, cor, ano, valor }).returning('*');
        return res.status(201).json(data[0]);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
exports.cadastrarCarro = cadastrarCarro;
const atualizarCarro = async (req, res) => {
    const { marca, modelo, cor, ano, valor } = req.body;
    const { id } = req.params;
    try {
        const data = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        await (0, conexao_1.knex)('carros').where({ id: Number(id) }).update({ ano, cor, marca, modelo, valor });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
exports.atualizarCarro = atualizarCarro;
const excluirCarro = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!data) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        await (0, conexao_1.knex)('carros').where({ id: Number(id) }).del();
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
exports.excluirCarro = excluirCarro;
