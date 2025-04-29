const { Club } = require('../models/Club'); 
const ClubRepository = require('../repositories/ClubRepository');
const ClubResource = require('../resources/ClubResource');

module.exports = {
  async getAllClubs() {
    const clubs = await ClubRepository.findAll();
    return clubs.map(club => ClubResource.toJson(club));
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
    if (clubData.email) {
      const existingClub = await ClubRepository.findByEmail(clubData.email);
      if (existingClub && existingClub.id !== id) {
        throw new Error('Email já está em uso');
      }
    }
    await ClubRepository.update(id, clubData);
    return this.getClubById(id);
  },

  async deleteClub(id) {
    return ClubRepository.delete(id);
  }
};