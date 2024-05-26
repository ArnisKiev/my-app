import Tree from "react-d3-tree";
import { INode, decisionTree } from "../../DataStructures/Node";
import './pract5.scss';
import { FC } from "react";


 
  const convertToTreeData = (node: INode): any => {
    const result: any = {
        name: node?.question || '',
        children: [],
        id: node.id
    };

    if (node.trueNode) {
        result.children.push(convertToTreeData(node.trueNode));
    }

    if (node.falseNode) {
        result.children.push(convertToTreeData(node.falseNode));
    }

    return result;
};


const treeData = convertToTreeData(decisionTree);


export interface DecisionTreeGraphProps {
    selectedNodes: string[];
}

const DecisionTreeGraph: FC<DecisionTreeGraphProps> = ({selectedNodes}) => {
    const containerStyles = {
        width: '100%',
        height: '600px'
    };

    console.log(selectedNodes)

    const renderCustomNode = ({ nodeDatum }: any) => (
        <g>
           <text
            className="text-white"
            fill="white"
            color="white"
            x="0"
            dy="-20"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontWeight: '100', fontSize: '8px' }} 
        >
        {nodeDatum.name} + {nodeDatum?.id}
        </text>
            <circle r="15" fill={` ${selectedNodes.some(sn => sn == nodeDatum.id)? "blue" : "lightblue"}`}></circle>
        </g>
    );

    return (
        <div style={containerStyles}>
            <Tree data={treeData} orientation="vertical" renderCustomNodeElement={renderCustomNode} />
        </div>
    );
};

export default DecisionTreeGraph;
