import { renderHook, act } from '@testing-library/react-hooks';
import useListaLeiloes from "../../hooks/useListaLeiloes";

import { obtemLeiloes } from '../../repositorio/leilao';

jest.mock('../../repositorio/leilao');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
];

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  },
  {
    id: 2,
    nome: 'Leilão 2',
    descricao: 'Descrição do leilão 2'
  }
];

describe('hooks/useListaLeiloes', () => {

  test('Must return a leiloes list and a function to update', async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes);

    const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());
    expect(result.current[0]).toEqual([]);
    console.log(result.current[0]);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual(mockLeiloes);
    console.log(result.current[0]);

    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);

    await act(() => result.current[1]());
    expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });

});