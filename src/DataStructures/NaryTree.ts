import { INaryNode } from "./NaryNode";

export interface ICompletedRemovedNode {
    parent?: INaryNode;
    children?: INaryNode[];
}

export interface IParentChild {
    parentValue: string;
    childValue: string;
}

export class NaryTree {

    private _rootNode: INaryNode = null;

    get rootNode() {
        return this._rootNode;
    }
   
    constructor(node: INaryNode) {
        this._rootNode = node;
    }

    getArrayParentChildValueFromTree(): IParentChild[] {

        const parentChild: IParentChild[] = [];

        const stack = [this._rootNode];

    
        while (stack.length > 0) {
            const node = stack.shift();

            node?.children?.forEach(child => {
                parentChild.push({
                    parentValue: node.value,
                    childValue: child.value
                });
            });
        
            if (node?.children) {
                stack.push(...node.children);
            }

        }

        return parentChild;
    }




    findParentByValueOfChild(value: string) {
        const stack = [ this._rootNode];

        while(stack.length > 0) {
            const node = stack.shift(); 

            if (node.children.some(child => child.value === value)) {
                return node;
            }

            stack.push(...node.children);
        }
        
        return null;
    }

    removeNodeByName(name: string): ICompletedRemovedNode {
        let completedNode: ICompletedRemovedNode = null;
        const removedNode = this.findNodeByName(name);

        if (removedNode) {
            const parent = this.findParentByValueOfChild(name);

            if (parent) {
                parent.children = parent.children.filter(child => child.value !== name);
            } else {
                this._rootNode = null;
            }

            completedNode = {
                parent,
                children: removedNode.children
            };
        }

        return completedNode;
    }

    addChildrenToNode(name: string, children: INaryNode[]): INaryNode {
        const node = this.findNodeByName(name);

        if (node) {
            node.children.push(...children);
        }

        return node;
    }

    findNodeByName(name: string): INaryNode {
        const stack = [ this._rootNode];

        while(stack.length > 0) {
            const node = stack.shift();

            if (node?.value === name) {
                return node;
            }

            if (node) {
                 stack.push(...node.children);
            }
        }
        
        return null;
    }

    displayTree() {
        console.log(this._rootNode);
    }
}