import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface Food {
  id: number;
  description: string;
  available: boolean;
  image: string;
  name: string;
  price: string;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void; 
  editingFood: Food;
  handleUpdateFood: (food: Food) => Promise<void>;
}

export const ModalEditFood: React.FC<ModalEditFoodProps> = ({ editingFood, handleUpdateFood, isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  
  const handleSubmit = useCallback (async (data) => {  
    handleUpdateFood(data);
    setIsOpen();
  }, [handleUpdateFood, setIsOpen ]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );  
};