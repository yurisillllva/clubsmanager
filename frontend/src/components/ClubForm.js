import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { createClub, updateClub } from '../services/api';

function ClubForm({ show, onHide, club, refreshList }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade_sede: ''
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (club) { 
      const rawPhone = club.telefone || '';
      const formattedPhone = rawPhone 
        ? `+55 ${rawPhone.slice(0, 2)} ${rawPhone.slice(2, 7)}-${rawPhone.slice(7)}`
        : '';
        
      setFormData({
        nome: club.nome,
        email: club.email,
        telefone: formattedPhone,
        cidade_sede: club.cidade_sede
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cidade_sede: ''
      });
    }
  }, [club]);
  

  useEffect(() => {
    if (!show) {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cidade_sede: ''
      });
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError('');

    try {
      if (club) {
        await updateClub(club.id, formData);
      } else {
        await createClub(formData);
      }
      refreshList();
      onHide();
    } catch (error) {
      if (error.message.includes('Email')) {
        setErrors({ email: error.message });
      } else if (error.message.includes('obrigatório')) {
        const fieldErrors = {};
        error.message.split(',').forEach(err => {
          const [field] = err.split(' ');
          fieldErrors[field] = err;
        });
        setErrors(fieldErrors);
      } else {
        setFormError(error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{club ? 'Editar Clube' : 'Novo Clube'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nome do Clube *</Form.Label>
            <Form.Control
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              isInvalid={!!errors.nome}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefone *</Form.Label>
            <InputMask
              mask="+55 99 99999-9999"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="+55 71 98765-4321"
                  isInvalid={!!errors.telefone}
                  required
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cidade Sede *</Form.Label>
            <Form.Control
              type="text"
              value={formData.cidade_sede}
              onChange={(e) => setFormData({ ...formData, cidade_sede: e.target.value })}
              isInvalid={!!errors.cidade_sede}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.cidade_sede}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancelar</Button>
          <Button variant="primary" type="submit">
            {club ? 'Salvar Alterações' : 'Criar Clube'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ClubForm;