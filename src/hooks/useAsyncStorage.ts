import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook para gerenciar operações do AsyncStorage
 */
export const useAsyncStorage = () => {
  /**
   * Salva um valor no AsyncStorage
   * @param key Chave para armazenar o valor
   * @param value Valor a ser armazenado
   * @returns Promise<void>
   */
  const saveData = async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
      throw error;
    }
  };

  /**
   * Recupera um valor do AsyncStorage
   * @param key Chave do valor a ser recuperado
   * @returns Promise com o valor recuperado ou null se não existir
   */
  const getData = async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) as T : null;
    } catch (error) {
      console.error('Erro ao recuperar dados do AsyncStorage:', error);
      throw error;
    }
  };

  /**
   * Remove um valor do AsyncStorage
   * @param key Chave do valor a ser removido
   * @returns Promise<void>
   */
  const removeData = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover dados do AsyncStorage:', error);
      throw error;
    }
  };

  /**
   * Limpa todos os dados do AsyncStorage
   * @returns Promise<void>
   */
  const clearAllData = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar todos os dados do AsyncStorage:', error);
      throw error;
    }
  };

  /**
   * Recupera todas as chaves armazenadas no AsyncStorage
   * @returns Promise com array de chaves
   */
  const getAllKeys = async (): Promise<readonly string[]> => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Erro ao recuperar todas as chaves do AsyncStorage:', error);
      throw error;
    }
  };

  return {
    getData,
    saveData,
    removeData,
    getAllKeys,
    clearAllData,
  };
};
