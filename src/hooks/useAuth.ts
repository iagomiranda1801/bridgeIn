import { useCallback, useState, useEffect, useRef } from 'react';
import { useAsyncStorage } from './useAsyncStorage';

// Chave para armazenar os dados de autenticação no AsyncStorage
const AUTH_STORAGE_KEY = '@BridgeIn:auth';

// Interface para a resposta do endpoint de login
export interface LoginResponse {
  Status: number;
  Menssage: string;
  Token: string;
  hierarchy: string;
  id: string;
}

// Interface para os dados de autenticação armazenados
export interface AuthData {
  token: string;
  userId: string;
  hierarchy: string;
  isAuthenticated: boolean;
}

/**
 * Hook para gerenciar autenticação e dados do usuário
 */
export const useAuth = () => {
  const { getData, saveData, removeData } = useAsyncStorage();
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Usar useRef para evitar loops infinitos
  const isInitialized = useRef(false);

  /**
   * Carrega os dados de autenticação do AsyncStorage
   */
  const loadAuthData = useCallback(async () => {
    try {
      setInitialLoading(true);
      const data = await getData<AuthData>(AUTH_STORAGE_KEY);
      setAuthData(data);
      return data;
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
      return null;
    } finally {
      setInitialLoading(false);
    }
  }, [getData]);

  /**
   * Processa a resposta do login e salva os dados de autenticação
   */
  const signIn = useCallback(async (loginResponse: LoginResponse): Promise<void> => {
    try {
      setLoading(true);
      // Verifica se o login foi bem-sucedido
      if (loginResponse.Status !== 1) {
        throw new Error(loginResponse.Menssage || 'Falha na autenticação');
      }
      
      // Cria o objeto de autenticação a partir da resposta
      const authData: AuthData = {
        token: loginResponse.Token,
        userId: loginResponse.id,
        hierarchy: loginResponse.hierarchy,
        isAuthenticated: true,
      };
      
      // Salva no AsyncStorage
      await saveData(AUTH_STORAGE_KEY, authData);
      setAuthData(authData);
    } catch (error) {
      console.error('Erro ao processar login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [saveData]);

  /**
   * Remove os dados de autenticação e faz logout
   */
  const signOut = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      await removeData(AUTH_STORAGE_KEY);
      setAuthData(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [removeData]);

  /**
   * Atualiza o token de autenticação
   */
  const updateToken = useCallback(async (newToken: string): Promise<void> => {
    try {
      if (!authData) {
        throw new Error('Não há dados de autenticação para atualizar');
      }

      const updatedAuthData = {
        ...authData,
        token: newToken,
      };

      await saveData(AUTH_STORAGE_KEY, updatedAuthData);
      setAuthData(updatedAuthData);
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      throw error;
    }
  }, [authData, saveData]);

  // Carrega os dados de autenticação ao inicializar o hook apenas uma vez
  useEffect(() => {
    // Evita execução múltipla do efeito
    if (isInitialized.current) {
      return;
    }
    
    const fetchAuthData = async () => {
      try {
        setInitialLoading(true);
        const data = await getData<AuthData>(AUTH_STORAGE_KEY);
        if (data) {
          setAuthData(data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
      } finally {
        setInitialLoading(false);
        // Marca como inicializado após a primeira execução
        isInitialized.current = true;
      }
    };
    
    fetchAuthData();
    // getData é estável e não deve causar re-renders
  }, []);

  return {
    signIn,
    loading,
    signOut,
    authData,
    updateToken,
    loadAuthData,
    initialLoading,
    token: authData?.token,
    userId: authData?.userId,
    hierarchy: authData?.hierarchy,
    isAuthenticated: authData?.isAuthenticated || false,
  };
};
