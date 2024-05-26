import { FC } from "react";
import './table-vertex.scss';

export interface IVertexTableProps {
    matrix?: number[][];
    vertexes?: string[];
    rootVertexes: string[];
}

const TableVertex: FC<IVertexTableProps> = ({
    matrix, 
    vertexes,
    rootVertexes
}) => {

    console.log(vertexes)

    if (!vertexes.length) {
        return <></>
    }

    return (
      <div className="table" key={vertexes.length}>
        
        <div className="table__row">
        <div className="table__cell" > <span style={{'visibility': 'hidden' }}>{vertexes[0]}</span>  </div>
           { vertexes.map((vertex , index)=> <div key={vertex + index} className={`table__cell ${ rootVertexes.some(v => v === vertex)? 'table__cell--root': '' }`}
           
           >{vertex}</div>) }
        </div>
       
        
           { matrix.map((row, index) =>  {
            return <div className="table__row">
                 <div className={`table__cell ${ rootVertexes.some(v => v === vertexes[index])? 'table__cell--root': '' }`}   key={vertexes[index]}>{vertexes[index]}</div>
                 { row.map((value, jindex) => <div key={index + jindex}  className="table__cell">{value}</div>) }
                 </div>
           })
           }
       

      </div>
    );
  }
  
  export default TableVertex;