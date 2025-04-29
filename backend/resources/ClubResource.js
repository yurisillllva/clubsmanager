module.exports = {
    toJson(club) {
      return {
        id: club.id,
        nome: club.nome,
        email: club.email,
        telefone: club.telefone,
        cidade_sede: club.cidade_sede,
        data_criacao: club.data_criacao
      };
    }
  };