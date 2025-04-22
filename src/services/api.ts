import EventSource from 'react-native-sse';
import api from '../config';
import { getToken } from './auth';

export const sendBettor = async (nome: string): Promise<any> => {

  try {
    const token = await getToken();
    const response = await api.post(`mobile/aposta`, {id_sala : 3, token:token});
    console.log("response",response)  
    return await response
  } catch (error) {
    console.error('Erro ao enviar apostador:', error);
    throw error;
  }
};

export const sendEvent = async (token: string): Promise<any> => {
  try {
    const token = await getToken();
    console.log("token", token);
    const response = await api.post(`/mobile/event.php?id_sala=+${3}+&token=+${token}`,);
    console.log("response",response)
    return await response;
  } catch (error) {
    console.error('Erro ao enviar evento:', error);
    throw error;
  }
};

export const createEventSource = async (
  onMessage: (data: any) => void,
  onError: (error: any) => void
): Promise<() => void> => {
  const token = await getToken();
  const idSala = 3;

  const url = new URL(`https://homolog.lastclick.com.br/api/mobile/event.php?id_sala=+${3}+&token=+${token}`);
  url.searchParams.append('id_sala', idSala.toString());
  url.searchParams.append('token', token);
  url.searchParams.append('sala', 'sala123');

  const es = new EventSource(url.toString());

  es.addEventListener('open', () => {
    console.log('Conexão SSE aberta');
  });

  es.addEventListener('message', (event) => {
    if (event.data) {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Erro ao processar mensagem SSE:', error);
      }
    }
  });

  es.addEventListener('error', (event) => {
    console.error('Erro na conexão SSE:', event);
    onError(event);
  });

  // Função para fechar a conexão
  return () => {
    es.close();
    console.log('Conexão SSE fechada');
  };
};
