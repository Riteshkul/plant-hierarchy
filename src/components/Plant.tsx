import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const Plant = (props: any) => {
    interface PlantData {
        id: number;
        kingdomname: string;
        kingdomdescription: string;
        division: string;
        plantClass: string;
        orderValue: string;
        family: string;
    }
    const [error, setError] = useState<string | null>(null);
    const [kingdoms, setKingdoms] = useState<string[]>([]);
    const [divisions, setDivisions] = useState<string[]>([]);
    const [classes, setClasses] = useState<string[]>([]);
    const [orders, setOrders] = useState<string[]>([]);
    const [families, setFamilies] = useState<string[]>([]);
    const [plantData, setPlantData] = useState<PlantData[]>([]);


    const [selectedKingdom, setSelectedKingdom] = useState<string>('');
    const [selectedDivision, setSelectedDivision] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const [selectedFamily, setSelectedFamily] = useState<string>('');


    const [description, setDescription] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const maxWordLimit = 200;

    const fetchData = async () => {
        try {
            const response = await axios.get<PlantData[]>('http://localhost:8080/api/parent');
            if (response.status === 200) {
                setPlantData(response.data);
                const uniqueKingdoms = Array.from(new Set(response.data.map((item) => item.kingdomname)));
                setKingdoms(uniqueKingdoms);
            }
        } catch (error) {
            console.error('Error fetching kingdoms:', error);
        }
    };

    const handleKingdomChange = (selectedKingdom: string) => {
        // Filter divisions based on the selected kingdom
        const filteredDivisions = plantData
            .filter((item) => item.kingdomname === selectedKingdom)
            .map((item) => item.division);
        setDivisions(Array.from(new Set(filteredDivisions)));
        setSelectedKingdom(selectedKingdom)
        // Reset classes, orders, and families
        setClasses([]);
        setOrders([]);
        setFamilies([]);
    };

    const handleDivisionChange = (selectedDivision: string) => {
        // Filter classes based on the selected division
        const filteredClasses = plantData
            .filter((item) => item.division === selectedDivision)
            .map((item) => item.plantClass);
        setClasses(Array.from(new Set(filteredClasses)));
        setSelectedDivision(selectedDivision)
        // Reset orders and families
        setOrders([]);
        setFamilies([]);
    };

    const handleClassChange = (selectedClass: string) => {
        // Filter orders based on the selected class
        const filteredOrders = plantData
            .filter((item) => item.plantClass === selectedClass)
            .map((item) => item.orderValue);
        setOrders(Array.from(new Set(filteredOrders)));
        setSelectedClass(selectedClass)

        // Reset families
        setFamilies([]);
    };

    const handleOrderChange = (selectedOrder: string) => {
        // Filter families based on the selected order
        const filteredFamilies = plantData
            .filter((item) => item.orderValue === selectedOrder)
            .map((item) => item.family);
        setSelectedOrder(selectedOrder)
        setFamilies(Array.from(new Set(filteredFamilies)));
    };
    const handleFamilyChange = (selectedFamily: string) => {
        setSelectedFamily(selectedFamily)
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = event.target.value;
        const words = inputText.split(/\s+/);
        const currentWordCount = words.length - 1; // Subtracting 1 to exclude empty string after last space

        if (currentWordCount <= maxWordLimit) {
            setDescription(inputText);
            setWordCount(currentWordCount);
        }
    };

    const handleonsubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        const Kingdom = selectedKingdom;
        const Division = selectedDivision;
        const Class = selectedClass;
        const Order = selectedOrder;
        const Family = selectedFamily;
        const selectedRecord = plantData.find((item) =>
            item.kingdomname === Kingdom &&
            item.division === Division &&
            item.plantClass === Class &&
            item.orderValue === Order &&
            item.family === Family
        );

        if (selectedRecord) {
            formData.append('parentNodeId', selectedRecord.id.toString());
            // formData.append('childNode', JSON.stringify({
            //     plantname: e.target.elements.name.value,
            //     plantdescription: e.target.elements.description.value,
            //     genus: e.target.elements.genus.value,
            //     species: e.target.elements.species.value,
            // }));
            formData.append('plantname', e.target.elements.name.value);
            formData.append('plantdescription', e.target.elements.description.value);
            formData.append('genus', e.target.elements.genus.value);
            formData.append('species', e.target.elements.species.value);
            const imageInput = e.target.elements.image;
            if (imageInput.files.length > 0) {
                formData.append('imageFile', imageInput.files[0]);
            }
            // const data = {
            //     parentNodeId: selectedRecord.id,
            //     childNode: {
            //         plantname: e.target.elements.name.value,
            //         plantdescription: e.target.elements.description.value,
            //         genus: e.target.elements.genus.value,
            //         species: e.target.elements.species.value,
            //     },
            // }
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/nodes/addChild',
                    formData,
                    {
                        headers: {
                            'Content-Type': `multipart/form-data;`,
                        },
                    }
                );

                window.alert('Plant added successfully!');
                if (response.status === 200) {
                    window.alert('Plant added successfully!');
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
            } catch (error: any) {
                if (error.response.status === 403) {
                    setError('An error occurred during adding the Plant. Please try again.');
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
                else if (error.response.status === 409) {
                    setError('An error occurred plant already exists');
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
                else {
                    setError(error.message);
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
            }
        }

    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Navbar username={props.username} />
            <div className="container-fluid d-flex align-items-center justify-content-center bg-light mb-3">
                <div className='row w-75 p-4 shadow rounded bg-white'>
                    <h2 className='mb-3 mt-5' style={{ textAlign: 'center' }}>Add Plant </h2>
                    <form onSubmit={handleonsubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control" id="name" placeholder="Enter name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description (Max 200 words)</label>
                            <textarea
                                name="description"
                                className="form-control"
                                id="description"
                                rows={3}
                                placeholder="Enter description of kingdom"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            ></textarea>
                            <div className="mt-2">
                                {wordCount}/{maxWordLimit} words remaining
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="kingdom">Kingdom</label>
                            <select
                                name="kingdom"
                                className="form-control"
                                id="kingdom"
                                onChange={(e) => handleKingdomChange(e.target.value)}
                                required
                            >
                                <option value="" >Select Kingdom</option>
                                {kingdoms.map((kingdom) => (
                                    <option key={kingdom} value={kingdom}>{kingdom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="division">Division</label>
                            <select
                                name="division"
                                className="form-control"
                                id="division"
                                onChange={(e) => handleDivisionChange(e.target.value)}
                                required
                            >
                                <option value="" >Select Division</option>
                                {divisions.map((division) => (
                                    <option key={division} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="class">Class</label>
                            <select
                                name="plantClass"
                                className="form-control"
                                id="plantClass"
                                onChange={(e) => handleClassChange(e.target.value)}
                                required
                            >
                                <option value="" >Select Class</option>
                                {classes.map((plantClass) => (
                                    <option key={plantClass} value={plantClass}>{plantClass}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="order">Order</label>
                            <select
                                name="order"
                                className="form-control"
                                id="order"
                                onChange={(e) => handleOrderChange(e.target.value)}
                                required
                            >
                                <option value="" >Select Order</option>
                                {orders.map((order) => (
                                    <option key={order} value={order}>{order}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="family">Family</label>
                            <select
                                name="family"
                                className="form-control"
                                id="family"
                                onChange={(e) => handleFamilyChange(e.target.value)}
                                required
                            >
                                <option value="" >Select Family</option>
                                {families.map((family) => (
                                    <option key={family} value={family}>{family}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="genus">Genus</label>
                            <input type="text" name="genus" className="form-control" id="genus" placeholder="Enter Genus" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="species">Species</label>
                            <input type="text" name="species" className="form-control" id="species" placeholder="Enter Species" required />
                        </div>
                        <div className="form-group mb-3">
                            {/* <label htmlFor="image">Image</label> */}
                            <input type="file" name="image" className="form-control" id="image" required />
                        </div>

                        <button type="submit" className="btn btn-primary">ADD</button>
                    </form>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Plant;
