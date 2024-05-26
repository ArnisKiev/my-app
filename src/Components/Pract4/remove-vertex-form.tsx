import { FC, useState } from 'react';
import { ICompletedRemovedNode } from '../../DataStructures/NaryTree';
import './pract4-form.scss';

export interface RemovedVertex {
    vertex: string;
    saveConnection: boolean;
}

export interface RemoveVertexProps {
    onRemoveVertex: (removedertex: RemovedVertex) => void;
    vertexes: string[];
}

const RemoveVertexForm: FC<RemoveVertexProps> = ( {
    vertexes, 
    onRemoveVertex
} ) => {

    const [vertex, setVertex] = useState<string>('');
    const [saveConnection, setSaveConnection] = useState<boolean>(false);
    
    const onRemoveClick = () => {
        const removedVertex: RemovedVertex = {
            vertex,
            saveConnection
        };

        onRemoveVertex(removedVertex);

        setVertex('');
        setSaveConnection(false);
    };

    const handleSaveConnectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaveConnection(event.target.checked);
      };

      const handleVertex = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVertex(event.target.value);
      };

    return (
        <div className="form-container">
          
            <h2>Видалити вершину</h2>
            
              <div className="characteristic-row">
                <label className="characteristic-label">
                  Вершина:
                </label>
                <select onChange={handleVertex} value={vertex} className="select-characteristic" >
                <option value={''}></option>
                {vertexes.map(vert => <option key={vert} value={vert}>{vert}</option>)}
                </select>
              </div>
  
                <label className="checkbox-wrapper">
                  <span>Зберегти зв'язки:</span>
                  <input checked={saveConnection} onChange={handleSaveConnectionChange}  type='checkbox' />
                </label> 
             
  
              <button className="recognize-button" onClick={onRemoveClick}> Видалити вершину </button>
        </div>
      );
  }
  
  export default RemoveVertexForm;