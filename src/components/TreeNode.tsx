import React, { useState } from 'react';

interface HierarchyNode {
    id: number;
    name: string;
    level: string;
    children?: HierarchyNode[];
}

interface TreeViewProps {
    data: HierarchyNode[];
    onNodeClick: (node: HierarchyNode) => void;
}

const TreeNode: React.FC<{ node: HierarchyNode; onNodeClick: (node: HierarchyNode) => void }> = ({
    node,
    onNodeClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        if (node.level === 'plant') {
            onNodeClick(node);
        } else {
            handleToggle(); // Toggle the state for non-plant levels
        }
    };

    return (
        <div>
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                <strong>
                    {`${node.name} - ${node.level}`}
                </strong>
            </div>
            {isOpen && node.children && (
                <div style={{ marginLeft: '20px' }}>
                    {node.children.map((child) => (
                        <TreeNode key={child.id || child.name} node={child} onNodeClick={onNodeClick} />
                    ))}
                </div>
            )}
        </div>
    );
};


const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick }) => {
    return (
        <div>
            {data.map((node) => (
                <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
            ))}
        </div>
    );
};

export default TreeView;
