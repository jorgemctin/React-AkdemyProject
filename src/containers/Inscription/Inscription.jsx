import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { createUserConvocation } from '../../services/apiCalls';
import { useFetchConvocations } from '../../../hooks/useFetchConvocation';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';


export const Inscription = () => {
    const [convocationData, setConvocationData] = useState({});
    const datosCredencialesRedux = useSelector(userData);
    const [selectedConvocationId, setSelectedConvocationId] = useState({});

    const userToken = datosCredencialesRedux?.credentials?.token;
    const userId = datosCredencialesRedux?.data?.userId;
    

    const convocations = useFetchConvocations(); // Fetch convocations from the API

    const handleConvocationChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedConvocation = convocations.find((convocation) => convocation.id === selectedId);

        setConvocationData({
            ...convocationData,
            convocation_id: selectedId,
            beginning: selectedConvocation ? selectedConvocation.beginning : '',
            schedule: selectedConvocation ? selectedConvocation.schedule : '',
            program: {
                price: selectedConvocation && selectedConvocation.program ? selectedConvocation.program.price : ''
            }
        });

        setSelectedConvocationId(selectedId); // Update the selectedConvocationId state
    };

    const handleInscription = async () => {
        const body = {
            convocation_id: selectedConvocationId,
            user_id: userId,
        };
        const result = await createUserConvocation(body, userToken);
        console.log("User-Convocation created:", result);
    };
    const upcomingConvocations = convocations ? convocations.filter(convocation => new Date(convocation.beginning) > new Date()) : [];
    return (
        <Container>
            <Card style={{ maxWidth: '25em', margin: '0 auto' }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Solicitar Inscripción</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Convocatorias:</td>
                                <td>
                                <select
                                        value={convocationData.convocation_id}
                                        onChange={handleConvocationChange}
                                    >
                                        <option value={0}>Seleccione una convocatoria</option>
                                        {upcomingConvocations.length > 0 ? (
                                            upcomingConvocations.map((convocation) => (
                                                <option key={convocation.id} value={convocation.id}>
                                                    {convocation.program.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No hay convocatorias próximas</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Inicio:</td>
                                <td>
                                    {/* Display the beginning date */}
                                    <span>{convocationData.beginning}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Horarios:</td>
                                <td>
                                    {/* Display the schedule */}
                                    <span>{convocationData.schedule}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>
                                    {/* Display the price of the program */}
                                    <span>{convocationData.program && convocationData.program.price}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Button
                            onClick={handleInscription}
                            style={{ backgroundColor: '#13326fba' }}
                            className="w-50"
                        >
                            Inscribirme!
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};