const { Club } = require('../models/Club'); 
const ClubRepository = require('../repositories/ClubRepository');
const ClubResource = require('../resources/ClubResource');

module.exports = {
  async getAllClubs(page = 1, search = '') {
    const { count, rows } = await ClubRepository.findAll(page, search);
    return {
      data: rows.map(club => ClubResource.toJson(club)),
      meta: {
        total: count,
        page,
        totalPages: Math.ceil(count / 7)
      }
    };
  },

  async getClubById(id) {
    const club = await ClubRepository.findById(id);
    return club ? ClubResource.toJson(club) : null;
  },

  async createClub(clubData) {
    const existingClub = await ClubRepository.findByEmail(clubData.email);
    if (existingClub) {
      throw new Error('Email já está em uso');
    }
    const newClub = await ClubRepository.create(clubData);
    return ClubResource.toJson(newClub);
  },

  async updateClub(id, clubData) {
    const existingClub = await ClubRepository.findById(id);
    if (clubData.email && clubData.email !== existingClub.email) {
      const clubWithSameEmail = await ClubRepository.findByEmail(clubData.email);
      if (clubWithSameEmail) {
        throw new Error('Email já está em uso por outro clube');
      }
    }
    await ClubRepository.update(id, clubData);
    return this.getClubById(id);
  },

  async deleteClub(id) {
    return ClubRepository.delete(id);
  },

  async checkEmailUnique(email) {
    const existingClub = await ClubRepository.findByEmail(email);
    if (existingClub) {
      throw new Error('Email já está em uso');
    }
  }
};