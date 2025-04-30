const request = require('supertest');
const app = require('../app');
const ClubService = require('../services/ClubService');

jest.mock('../services/ClubService');

describe('ClubController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /clubs', () => {
    it('deve retornar lista de clubes com paginação', async () => {
      const mockData = {
        data: [{ id: 1, nome: 'Clube Teste' }],
        meta: { total: 1, page: 1, totalPages: 1 }
      };

      ClubService.getAllClubs.mockResolvedValue(mockData);

      const res = await request(app)
        .get('/api/clubs?page=1&search=teste')
        .expect(200);

      expect(res.body).toEqual(mockData);
    });
  });

  describe('POST /clubs', () => {
    it('deve criar um novo clube com dados válidos', async () => {
      const mockClub = {
        id: 1,
        nome: 'Novo Clube',
        email: 'novo@clube.com'
      };

      ClubService.createClub.mockResolvedValue(mockClub);

      const res = await request(app)
        .post('/api/clubs')
        .send({
          nome: 'Novo Clube',
          email: 'novo@clube.com',
          telefone: '21999999999',
          cidade_sede: 'Rio de Janeiro'
        })
        .expect(201);

      expect(res.body).toEqual(mockClub);
    });

    it('deve retornar erro 422 para dados inválidos', async () => {
      const res = await request(app)
        .post('/api/clubs')
        .send({ nome: '' })
        .expect(422);

      expect(res.body.error).toMatch(/is not allowed to be empty/);
    });
  });

  describe('PUT /clubs/:id', () => {
    it('deve atualizar um clube existente', async () => {
      const updatedClub = {
        id: 1,
        nome: 'Clube Atualizado',
        email: 'atualizado@clube.com'
      };

      ClubService.updateClub.mockResolvedValue(updatedClub);

      const res = await request(app)
        .put('/api/clubs/1')
        .send({ nome: 'Clube Atualizado' })
        .expect(200);

      expect(res.body.nome).toBe('Clube Atualizado');
    });
  });

  describe('DELETE /clubs/:id', () => {
    it('deve deletar um clube existente', async () => {
      ClubService.deleteClub.mockResolvedValue(true);

      await request(app)
        .delete('/api/clubs/1')
        .expect(204);
    });
  });
});