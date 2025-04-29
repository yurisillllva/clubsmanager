const ClubService = require('../services/ClubService');
const ClubRequest = require('../requests/ClubRequest');
const UpdateClubRequest = require('../requests/UpdateClubRequest');

module.exports = {
  async index(req, res) {
    try {
      const clubs = await ClubService.getAllClubs();
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const club = await ClubService.getClubById(req.params.id);
      club ? res.json(club) : res.status(404).json({ error: 'Clube não encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async store(req, res) {
    try {
      await ClubRequest.validateAsync(req.body);
      const newClub = await ClubService.createClub(req.body);
      res.status(201).json(newClub);
    } catch (error) {
      error.isJoi ? 
        res.status(422).json({ error: error.details[0].message }) :
        res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      await UpdateClubRequest.validateAsync(req.body);
      const updatedClub = await ClubService.updateClub(req.params.id, req.body);
      updatedClub ? res.json(updatedClub) : res.status(404).json({ error: 'Clube não encontrado' });
    } catch (error) {
      error.isJoi ? 
        res.status(422).json({ error: error.details[0].message }) :
        res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await ClubService.deleteClub(req.params.id);
      result ? res.status(204).end() : res.status(404).json({ error: 'Clube não encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};