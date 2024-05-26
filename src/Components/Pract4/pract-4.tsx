import { useState } from 'react';
import { ICompletedRemovedNode, IParentChild, NaryTree } from '../../DataStructures/NaryTree';
import AddVertexForm from './add-vertex-form';
import './pract4.scss';
import RemoveVertexForm, { RemovedVertex } from './remove-vertex-form';
import TableVertex from './table-vertex';
import { IAddedVertex } from '../../interfaces/pract4';
import { INaryNode } from '../../DataStructures/NaryNode';


function Pract4() {

  const [ matrix, setMatrix] = useState<number[][]>([]);
  const [naryTrees, setNaryTrees] = useState<NaryTree[]>([]); 
  const [vertexes, setVertexes] = useState<string[]>([]);
  const [rootVertexes, setRootVertexes] = useState<string[]>([]);



  const onAddedVertex = (vertexInfo: IAddedVertex) => {
    vertexes.push(vertexInfo.vertex);
    setVertexes([...vertexes]);

    if (vertexInfo?.parent) {
      const tree = naryTrees.find(naryTree => naryTree.findNodeByName(vertexInfo?.parent));

      if (tree) {
        tree.addChildrenToNode(vertexInfo.parent, [{
          value: vertexInfo.vertex,
          children: []
        }]);
      }
    } else {
      const newTree: NaryTree = new NaryTree({
        value: vertexInfo.vertex,
        children: []
      });
      naryTrees.push(newTree);
    }

    setNaryTrees([...naryTrees]);
    setMatrix(getMatrixConnects(naryTrees, vertexes));
    setRootVertexes(
      naryTrees.map(naryTree => naryTree.rootNode.value)
    );
  };

  const onRemoveVertex = (removedVertex: RemovedVertex) => {

    debugger

    let removedNode: INaryNode = null;
    let searchedTree: NaryTree = null;
    let treeIndex = null;

    for (let index = 0; index < naryTrees.length; index++) {
      removedNode = naryTrees[index].findNodeByName(removedVertex.vertex);

      if (removedNode) {
        searchedTree = naryTrees[index];
        treeIndex = index;
        break;
      }
    }

    if (treeIndex !== null && removedNode) {
      const removedNodeCompleted: ICompletedRemovedNode = searchedTree.removeNodeByName(removedVertex.vertex);

    
      if (removedVertex.saveConnection) {
        if (removedNodeCompleted.parent) {
          searchedTree.addChildrenToNode(removedNodeCompleted.parent.value, removedNodeCompleted.children);

          setNaryTrees([...naryTrees]);
          const updatedVertexes = vertexes.filter(vertex => vertex !== removedVertex.vertex);

          setVertexes(updatedVertexes);
          setMatrix(getMatrixConnects(naryTrees, updatedVertexes));

        } else {
          const newTrees: NaryTree[] = removedNodeCompleted.children.map(node => new NaryTree( { value: node.value, children: node.children }));
         let updatedTrees = naryTrees.slice(treeIndex, 1);
         updatedTrees.push(...newTrees);

         updatedTrees = updatedTrees.filter(tr => tr.rootNode?.value);
         setNaryTrees(updatedTrees);

         setRootVertexes(updatedTrees.map(tr => tr.rootNode.value));

         const updatedVertexes = vertexes.filter(vertex => vertex !== removedVertex.vertex);

         setVertexes(updatedVertexes);
     
         setMatrix(getMatrixConnects(updatedTrees, updatedVertexes));
        }
      } else {
        
         debugger 
        const newTrees: NaryTree[] = removedNodeCompleted.children.map(node => new NaryTree( { value: node.value, children:  node.children }));

        let updatedTrees: NaryTree[] = naryTrees;

        if (!removedNodeCompleted.parent) {
    
         updatedTrees = naryTrees.slice(treeIndex, 1);
        }

        updatedTrees.push(...newTrees);

        updatedTrees = updatedTrees.filter(tr => tr.rootNode?.value);

        setNaryTrees(updatedTrees);

        
    setRootVertexes(updatedTrees.map(tr => tr.rootNode.value));

    const updatedVertexes = vertexes.filter(vertex => vertex !== removedVertex.vertex);

    setVertexes(updatedVertexes);

    setMatrix(getMatrixConnects(updatedTrees, updatedVertexes));

        

      }



      searchedTree.displayTree();
    }

    
    
    


  };

  return (
    <div className="pract4-container">
      <div className="form-section">
        <AddVertexForm onAddedVertex={onAddedVertex} vertexes={vertexes} />
        <RemoveVertexForm vertexes={vertexes} onRemoveVertex={onRemoveVertex} />
      </div>
      <div className="table-section">
        <TableVertex rootVertexes={rootVertexes} vertexes={vertexes} matrix={matrix} />
      </div>
    </div>
  );
}

function getMatrixConnects(trees: NaryTree[], vertexes: string[]): number[][] {

  const matrix: number[][] = []

  const parentChildValues: IParentChild[] = [];

for (const tree of trees) {
  const treeParentChildValues = tree.getArrayParentChildValueFromTree();
  parentChildValues.push(...treeParentChildValues);
} 


  for (let index = 0; index < vertexes.length; index++) {

    const row: number[] = new Array(vertexes.length).fill(0);

    const parentVertex = vertexes[index];
    const filteredParents = parentChildValues.filter(pc => pc.parentValue === parentVertex);

    if (filteredParents.length) {
      for (const childVertex of filteredParents) {
        const findIndex = vertexes.findIndex(v => v === childVertex.childValue);
        row[findIndex] = 1;
      }
    }

    matrix.push(row);
  }

  return matrix;
}

export default Pract4;