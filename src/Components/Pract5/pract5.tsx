import { useState } from "react";
import { INode, IStudent } from "../../DataStructures/Node";
import DecisionTreeGraph from "./graph-tree";
import Pract5Form from "./pract5-form";
import { decisionTree } from './../../DataStructures/Node';



function Pract5() {

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [result, setResult] = useState('');

  const onGetDecision = (student: IStudent) => {


    let currentNode: INode = decisionTree;

    const newNodes = [];

    while (true) {

      newNodes.push(currentNode.id);

      console.log(newNodes)

      if (currentNode.isList) {
        setResult(currentNode?.question);
        setSelectedNodes(newNodes);
        break;
      }

      const defenition = currentNode.definitionFunction(student);

      currentNode = defenition? currentNode?.trueNode : currentNode?.falseNode;
    }


  };
  
    return (
      <div className="pract5-container">
        <div className="form-section">
        <Pract5Form onGetDecision={onGetDecision} result={result}/>
        </div>
        <div className="graph-section">
            <DecisionTreeGraph selectedNodes={selectedNodes}/>
        </div>
      </div>
    );
  }
  
 

  
export default Pract5;
