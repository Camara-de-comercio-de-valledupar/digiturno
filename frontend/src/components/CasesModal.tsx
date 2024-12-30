import React, { useEffect, useState } from 'react';
import { useJuridicalCases } from '@/hooks/useJuridicalCases';
import FormCreateJuridicalCase from './FormCreateJuridicalCase';

type CasesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CasesModal: React.FC<CasesModalProps> = ({ isOpen, onClose }) => {
  const {
    cases,
    history,
    loading,
    error,
    successMessage,
    loadCases,
    addCase,
    removeCase,
    loadCaseHistory,
  } = useJuridicalCases();

  const [isEditing, setIsEditing] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCases();
    }
  }, [isOpen, loadCases]);

  const handleSave = (data: { subject: string; observation: string }) => {
    addCase(data.subject, data.observation);
    setIsEditing(false);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {!viewHistory && !isEditing && (
        <div>
          <button onClick={() => setIsEditing(true)}>Crear Caso</button>
          <table>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>{c.subject}</td>
                <td>
                  <button onClick={() => loadCaseHistory(c.id)}>Ver Historial</button>
                  <button onClick={() => removeCase(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}

      {isEditing && (
        <FormCreateJuridicalCase
          handleSave={handleSave}
          handleBack={() => setIsEditing(false)}
        />
      )}

      {viewHistory && (
        <div>
          <button onClick={() => setViewHistory(false)}>Volver</button>
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                {entry.date}: {entry.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CasesModal;
