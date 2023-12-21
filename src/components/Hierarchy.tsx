import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TreeView from './TreeNode';

interface HierarchyNode {
    id: number;
    name: string;
    level: string;
    children?: HierarchyNode[];
}

interface PlantInfo {
    id: number;
    plantname: string;
    plantdescription: string;
    genus: string;
    species: string;
    level: string;
    image_name: string;
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

interface OpenParents {
    [key: string]: boolean;
}

const Hierarchy = (props: any) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [newDescription, setNewDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([]);
    const [openParents, setOpenParents] = useState<OpenParents>({});

    const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null);
    const { plantName } = useParams<{ plantName: string }>();

    // const handleParentClick = (parentId: number) => {
    //     setOpenParents((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
    // };
    // const renderHierarchy = (node: HierarchyNode) => (
    //     <ul key={node.id}>
    //         <li>
    //             <div onClick={() => handleParentClick(node.id)} style={{ cursor: 'pointer' }}>
    //                 <strong>
    //                     <i className={`bi ${openParents[node.id] ? 'bi-caret-down' : 'bi-caret-right'}`}></i>
    //                     {`${node.name}`}
    //                 </strong>
    //             </div>
    //             {openParents[node.id] && node.children && (
    //                 <ul>
    //                     {node.children.map((child: HierarchyNode) => (
    //                         <li key={child.id} onClick={() => handleNodeClick(child.name)} style={{ cursor: 'pointer' }}>
    //                             <i className="bi bi-record-circle"></i>
    //                             {`${child.name}`}
    //                             {child.children && renderHierarchy(child)}
    //                         </li>
    //                     ))}
    //                 </ul>
    //             )}

    //         </li>
    //     </ul>

    // );



    useEffect(() => {
        axios
            .get<HierarchyNode[]>('http://localhost:8080/api/nodes/getAllHierarchy')
            .then((response) => {
                setHierarchy(response.data);
                console.log("api data", response.data);
            })
            .catch((error) => {
                console.error('Error fetching hierarchy:', error);
            });
    }, []);
    useEffect(() => {
        console.log('plant name', plantName)
        if (plantName) {
            axios
                .get<PlantInfo[]>(`http://localhost:8080/api/nodes/getHierarchy/${plantName}`)
                .then((response) => {
                    const plantInfo = response.data[0];
                    console.log(plantInfo)
                    setSelectedPlant(plantInfo);
                })
                .catch((error) => {
                    console.error('Error fetching plant info:', error);
                });
        }
    }, [plantName]);

    // const handleNodeClick = (plantName: string) => {
    //     axios
    //         .get<PlantInfo[]>(`http://localhost:8080/api/nodes/getHierarchy/${plantName}`)
    //         .then((response) => {
    //             const plantInfo = response.data[0];
    //             console.log('image name', plantInfo)
    //             setSelectedPlant(plantInfo);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching plant info:', error);
    //         });
    // };
    const handleNodeClick = (node: HierarchyNode) => {
        console.log('inside function')
        if (node.level === 'plant') {
            axios
                .get<PlantInfo[]>(`http://localhost:8080/api/nodes/getHierarchy/${node.name}`)
                .then((response) => {
                    const plantInfo = response.data[0];
                    console.log('image name', plantInfo);
                    setSelectedPlant(plantInfo);
                })
                .catch((error) => {
                    console.error('Error fetching plant info:', error);
                });
        }
    };





    const handleEditDescription = (id: number) => {
        // Open the modal
        setShowModal(true);
    };

    const handleModalClose = () => {
        // Close the modal
        setShowModal(false);
        // Clear the description input
        setNewDescription('');
    };

    const handleModalSave = () => {
        // Perform the axios PUT request with the new description
        axios
            .put('http://localhost:8080/api/nodes/editDescription', {
                id: selectedPlant?.id,
                plantdescription: newDescription,
            })
            .then((response) => {
                // Handle success
                alert('Description updated successfully');
                setSelectedPlant(null);
                // Refresh the table by fetching the updated data
                // fetchData();
            })
            .catch((error) => {
                console.error('Error updating description:', error);
            })
            .finally(() => {
                // Close the modal and clear the description input
                handleModalClose();
            });
    };

    const handleDeleteNode = (id: number, name: String) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this node?');
        if (confirmDelete) {
            axios
                .delete(`http://localhost:8080/api/nodes/deleteNode/${id}/${name}`)
                .then((response) => {
                    // Handle success, update the UI or show a notification
                })
                .catch((error) => {
                    console.error('Error deleting node:', error);
                });
        }
    };
    return (
        <>
            <Navbar username={props.username} />
            <div className="container-fluid vh-100 d-flex mt-3 mb-3">
                <div className="row w-100 p-4 shadow rounded bg-white">
                    {/* <div className="col-md-4">
                        <h2>Hierarchy</h2>
                        {hierarchy.map((node) => renderHierarchy(node))}
                    </div> */}
                    <div className="col-md-4">
                        <h2>Hierarchy</h2>
                        <TreeView data={hierarchy} onNodeClick={handleNodeClick} />
                    </div>
                    <div className="col-md-8">
                        <h2>Plant Information</h2>

                        {selectedPlant && (
                            <>

                                <img src={`/images/${selectedPlant.image_name}`} alt="plant image" style={{ width: '200px', height: '200px' }} />
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
                                                <th>Actions</th>
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
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleEditDescription(selectedPlant.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm "
                                                        onClick={() => handleDeleteNode(selectedPlant.id, selectedPlant.image_name)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Description</h5>
                                    <button type="button" className="close" onClick={handleModalClose} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <label htmlFor="newDescription">New Description:</label>
                                    <textarea
                                        name="newDescription"
                                        className="form-control"
                                        id="newDescription"
                                        rows={3}
                                        placeholder="Enter new description"
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleModalSave}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Hierarchy;

