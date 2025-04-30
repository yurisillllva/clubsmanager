import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Table, Pagination, Form } from 'react-bootstrap';
import { getClubs, deleteClub } from '../services/api';
import ClubForm from './ClubForm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function ClubList() {
  const [apiResponse, setApiResponse] = useState({
    data: [],
    meta: { total: 0, page: 1, totalPages: 1 }
  });

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const loadClubs = async () => {
    try {
      const response = await getClubs(page, search);
      console.log("Dados recebidos:", response);

      setApiResponse({
        data: response?.data, // Array de clubes
        meta: response?.meta  // Objeto de paginação
      });

    } catch (error) {
      console.error('Erro ao carregar clubes:', error);
      setApiResponse({
        data: [],
        meta: { total: 0, page: 1, totalPages: 1 }
      });
    }
  };

  useEffect(() => {
    loadClubs();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este clube?')) {
      await deleteClub(id);
      await loadClubs();
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return "Data inválida";
    }
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clubes de Futebol</h1>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedClub(null);
            setShowModal(true);
          }}
        >
          Novo Clube
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Pesquisar por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Criação</th>
            <th>Telefone</th>
            <th>Cidade Sede</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse.data?.length > 0 ? (
            apiResponse.data.map(club => (
              <tr key={club.id}>
                <td>{club.nome}</td>
                <td>{club.email}</td>
                <td>{formatDate(club.data_criacao)}</td>
                <td>
                  {club.telefone
                    ? `${club.telefone.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3")}`
                    : 'Não informado'}
                </td>
                <td>{club.cidade_sede}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => {
                      setSelectedClub(club);
                      setShowModal(true);
                    }}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(club.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum clube encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {apiResponse.meta?.totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          />

          {Array.from({ length: apiResponse.meta.totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={page === apiResponse.meta.totalPages}
            onClick={() => setPage(p => p + 1)}
          />
        </Pagination>
      )}

      {showModal && (
        <ClubForm
          key={selectedClub?.id || "new"}
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setSelectedClub(null);
          }}
          club={selectedClub}
          refreshList={loadClubs}
        />
      )}
    </div>
  );
}

export default ClubList;