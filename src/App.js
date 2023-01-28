import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import './App.css';
import api from './services/api';

function App() {

  const [veiculos, setVeiculos] = useState([]);

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState();


  useEffect(() => {
    buscarVeiculosTable()
  }, []);

  async function buscarVeiculosTable() {
    await api.get('/veiculo').then((response) => {
      setVeiculos(response.data)
    })
  }

  async function cadastrarVeiculo() {
    const veiculo = {
      placa,
      modelo,
      marca,
      ano: parseInt(ano)
    }

    await api.post('/veiculo', veiculo).then((response) => {
      setVeiculos([...veiculos, response.data])
      alert('Veiculo cadastrado com sucesso!')
      limparForm()
    }).catch(() => {
      alert('Veiculo ja cadastrado ')
    })
  }

  function limparForm() {
    setPlaca('')
    setMarca('')
    setModelo('')
    setAno('')
  }

  async function excluirVeiculo(placa) {
    await api.delete(`/veiculo/${placa}`).then(() => {
      buscarVeiculosTable()
      alert("Veiculo excluido com sucesso ")
    })
  }

  return (
    <div className='container'>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Placa"
          value={placa}
          onChange={(e) => { setPlaca(e.target.value) }}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => { setModelo(e.target.value) }}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Marca"
          value={marca}
          onChange={(e) => { setMarca(e.target.value) }}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ano"
          type='number'
          value={ano}
          onChange={(e) => { setAno(e.target.value) }}
        />
      </InputGroup>
      <Button onClick={cadastrarVeiculo}> Salvar </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {
            veiculos.map((v) => {
              return (
                <tr>
                  <td>{v.id}</td>
                  <td>{v.placa}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.ano}</td>
                  <td><Button onClick={() => { excluirVeiculo(v.placa) }}>X</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default App;
