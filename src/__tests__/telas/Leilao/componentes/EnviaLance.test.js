import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ENVIADO, NAO_ENVIADO } from '../../../../negocio/constantes/estadosLance';

import EnviaLance from "../../../../telas/Leilao/componentes/EnviaLance";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/leilao/components/EnviaLance', () => {

  test('Must to send lance when button is pressed', async () => {

    const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)));

    const {
      getByPlaceholderText,
      getByAccessibilityHint,
      getByText
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor='blue'
      />
    )

    const input = getByPlaceholderText('R$');
    const botao = getByAccessibilityHint('Enviar lance');

    fireEvent.changeText(input, '10');
    fireEvent.press(botao);

    expect(enviaLance).toHaveBeenCalledWith('10');
    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

});