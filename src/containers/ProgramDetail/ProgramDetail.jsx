import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProgramDetail.css";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { useSelector } from "react-redux";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const ProgramDetail = () => {
    const token = useSelector((state) => state.user.credentials.token);
    const navigate = useNavigate();
    //GET THE ID VALUE FROM THE URL
    let { id } = useParams();
    const parsedId = parseInt(id);
    const programs = useFetchPrograms();
    const [programDetail, setProgramDetail] = useState('');

    useEffect(() => {
        // FOUND THE PROGRAM WITH THE ID GET IT FROM THE ARRAY
        const foundProduct = programs.find((item) => item.id === parsedId);
        if (foundProduct) {
            setProgramDetail(foundProduct);
        } else {
            setProgramDetail('');
        }
    }, [parsedId, programs]);

    //CHECK IF THE USER IS REGISTERED
    const handleClick = () => {
        if (!token) {
            navigate('/register');
        } else {
            navigate('/inscription');
        }
    };

    // GET THE CURRENT INDEX & DIRECTION TO SHOW THE NEXT DETAIL PROGRAM
    const handleNavigateProgram = (direction) => {
        const currentIndex = programs.findIndex((program) => program.id === parsedId);
        const nextIndex = (currentIndex + direction + programs.length) % programs.length;
        const nextProgramId = programs[nextIndex].id;
        navigate(`/programDetail/${nextProgramId}`);
    };

    return (
        //RENDER DETAIL VIEW

        <div className="detailProgram">
            {programDetail ? (
                <>
                    <h2>{programDetail.name}</h2>
                    <img src={`https://laravel-akdemyproject-production.up.railway.app/${programDetail.image}`} alt="" />
                    <h4>{programDetail.description}</h4>
                    <h5>Precio: {programDetail.price}</h5>

                    {/* BUTTON TO GO TO REQUEST INSCRIPTION */}
                    <div className="mt-3 buttonsDetailPage">
                        <div className="arrowButtonDetail" onClick={() => handleNavigateProgram(-1)}>◁</div>
                        <AkdemyButton onClick={handleClick} text={"Solicitar Inscripción"} />
                        <div className="arrowButtonDetail" onClick={() => handleNavigateProgram(1)}>▷</div>
                    </div>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};