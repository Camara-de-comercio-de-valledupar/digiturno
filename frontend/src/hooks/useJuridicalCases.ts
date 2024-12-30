import { useState, useCallback } from 'react';
import {
  fetchCases,
  createCase,
  deleteCase,
  fetchCaseHistory,
} from '@/services/juridical-case-service';

export const useJuridicalCases = () => {
  const [cases, setCases] = useState<JuridicalCase[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Obtener la lista de casos
  const loadCases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCases();
      setCases(data);
    } catch (err) {
      setError('Error al cargar los casos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear un nuevo caso
  const addCase = async (subject: string, observation: string) => {
    setError(null);
    try {
      const newCase = await createCase(subject, observation);
      setCases((prevCases) => [...prevCases, newCase]);
      setSuccessMessage('¡Caso creado con éxito!');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      setError('Error al crear el caso.');
      console.error(err);
    }
  };

  // Eliminar un caso
  const removeCase = async (id: number) => {
    setError(null);
    try {
      await deleteCase(id);
      setCases((prevCases) => prevCases.filter((c) => c.id !== id));
      setSuccessMessage('¡Caso eliminado con éxito!');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      setError('Error al eliminar el caso.');
      console.error(err);
    }
  };

  // Obtener el historial de un caso
  const loadCaseHistory = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCaseHistory(id);
      setHistory(data);
    } catch (err) {
      setError('Error al cargar el historial del caso.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cases,
    history,
    loading,
    error,
    successMessage,
    loadCases,
    addCase,
    removeCase,
    loadCaseHistory,
  };
};
