import { obtemLeiloes } from "../../repositorio/leilao";
import apiLeiloes from '../../servicos/apiLeiloes';

jest.mock('../../servicos/apiLeiloes');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno
      });
    }, 200);
  });
}

const mockRequisicaoError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
}

describe('repositorio/leilao', () => {

  beforeEach(() => {
    apiLeiloes.get.mockClear();
  });

  describe('obtemLeiloes', () => {

    test('Mut return a leiloes list', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
      
      const leiloes = await obtemLeiloes();
      
      expect(leiloes).toEqual(mockLeiloes);

      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    test('Mut return a empty leiloes list when the request failed', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoError());
      
      const leiloes = await obtemLeiloes();
      
      expect(leiloes).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

  });

});