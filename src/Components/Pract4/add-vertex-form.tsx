
import { FC, useState } from 'react';
import { IAddedVertex } from '../../interfaces/pract4';
import './pract4-form.scss';

export interface AddedVertexProps {
    vertexes: string[];
    onAddedVertex: (addedVertex: IAddedVertex) => void;
}

const AddVertexForm: FC<AddedVertexProps> = ({ onAddedVertex, vertexes } ) => {
   
    const [newVertex, setNewVertex] = useState<string>('');
    const [connectedVertex, setConnectedVertex] = useState<string>(null);
    
    const onAddClick = () => {
        const addedVertex: IAddedVertex = {
            vertex: newVertex,
            parent: connectedVertex
        };

        onAddedVertex(addedVertex);

        setNewVertex('');
        setConnectedVertex("");
    };

    const handleNewVertex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewVertex(event.target.value);
      };

      const handleonnectedVertex = (event: React.ChangeEvent<HTMLSelectElement>) => {
        debugger
        setConnectedVertex(event.target.value);
      };
   
   
    return (
      <div className="form-container">
        
          <h2>Додати вершину</h2>
          
            <div className="characteristic-row">
              <label className="characteristic-label">
                Нова вершина:
              </label>
              <input className="select-characteristic" value={newVertex} onChange={handleNewVertex} />
            </div>

            <div className="characteristic-row">
              <label className="characteristic-label">
                Батьківська вершина:
              </label>
              <select value={connectedVertex} className="select-characteristic"  onChange={handleonnectedVertex}>
              <option value={''} ></option>
                {
                    vertexes.map(v => <option value={v} key={v}>{v}</option>)
                }
              </select>
            </div>

            <button onClick={onAddClick} className="recognize-button"> Додати вершину </button>
      </div>
    );
  }
  
  export default AddVertexForm;