import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

interface HierarchyNode {
    id: number;
    name: string;
    children?: HierarchyNode[];
}

interface PlantInfo {
    id: number;
    plantname: string;
    plantdescription: string;
    genus: string;
    species: string;
    parent: {
        id: number;
        kingdomname: string;
        kingdomdescription: string;
        division: string;
        plantClass: string;
        orderValue: string;
        family: string;
    };
}

const Hierarchy = (props: any) => {
    const [error, setError] = useState<string | null>(null);
    const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([]);
    const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null);

    const renderHierarchy = (node: HierarchyNode) => (
        <ul key={node.id}>
            <li>
                <strong>
                    <i className="bi bi-play-fill"></i>
                    {`${node.name}`}
                </strong>
                {node.children && (
                    <ul>
                        {node.children.map((child) => (
                            <li key={child.id} onClick={() => handleNodeClick(child.name)}>
                                <i className="bi bi-record-circle"></i>
                                {`${child.name}`}
                                {child.children && renderHierarchy(child)}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );

    useEffect(() => {
        axios
            .get<HierarchyNode[]>('http://localhost:8080/api/nodes/getAllHierarchy')
            .then((response) => {
                setHierarchy(response.data);
            })
            .catch((error) => {
                console.error('Error fetching hierarchy:', error);
            });
    }, []);

    const handleNodeClick = (plantName: string) => {
        axios
            .get<PlantInfo[]>(`http://localhost:8080/api/nodes/getHierarchy/${plantName}`)
            .then((response) => {
                const plantInfo = response.data[0];
                setSelectedPlant(plantInfo);
            })
            .catch((error) => {
                console.error('Error fetching plant info:', error);
            });
    };

    return (
        <>
            <Navbar username={props.username} />
            <div className="container-fluid vh-100 d-flex mt-3 mb-3">
                <div className="row w-100 p-4 shadow rounded bg-white">
                    <div className="col-md-3">
                        <h2>Hierarchy</h2>
                        {hierarchy.map((node) => renderHierarchy(node))}
                    </div>
                    <div className="col-md-9">
                        <h2>Plant Information</h2>
                        {selectedPlant && (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Plant Name</th>
                                            <th>Plant Description</th>
                                            <th>Kingdom Name</th>
                                            <th>Kingdom Description</th>
                                            <th>Division</th>
                                            <th>Order</th>
                                            <th>Class</th>
                                            <th>Family</th>
                                            <th>Genus</th>
                                            <th>Species</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedPlant.plantname}</td>
                                            <td>{selectedPlant.plantdescription}</td>
                                            <td>{selectedPlant.parent.kingdomname}</td>
                                            <td>{selectedPlant.parent.kingdomdescription}</td>
                                            <td>{selectedPlant.parent.division}</td>
                                            <td>{selectedPlant.parent.orderValue}</td>
                                            <td>{selectedPlant.parent.plantClass}</td>
                                            <td>{selectedPlant.parent.family}</td>
                                            <td>{selectedPlant.genus}</td>
                                            <td>{selectedPlant.species}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Hierarchy;
