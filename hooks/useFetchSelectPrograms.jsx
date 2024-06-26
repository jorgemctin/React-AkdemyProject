import { useEffect, useState } from "react";

//SELECTING SERVICES FOR THE APPOINTMENT
export const SelectPrograms = ({ handleChange, value }) => {

    //USER SELECTED SERVICE FROM THE FATHER COMPONENT
    const [selectedService, setSelectedService] = useState(value);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("https://laravel-akdemyproject-production.up.railway.app/api/program/getAll")
            .then((res) => res.json())
            .then((res) => {
                setServices(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <select
                id={"programSelect"}
                className="inputConvocation"
                value={selectedService}
                onChange={(e) => {
                    handleChange(e.target.value);
                    setSelectedService(e.target.value)
                }}>
                <option value="">Cursos</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
        </>
    );
};

