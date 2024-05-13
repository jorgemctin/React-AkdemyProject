import { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Container } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { AdminButton } from "../../components/AdminButton/AdminButton";
import { PageButton } from "../../components/PageButton/PageButton";

export const Convocation = () => {
    const convocations = useFetchConvocations();
    const [filteredConvocations, setFilteredConvocations] = useState([]);
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.user.data.role);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    // GET THE RECENT CONVOCATION FIRST
    useEffect(() => {
        if (!Array.isArray(convocations)) {
            return;
        }
        setFilteredConvocations(convocations.reverse());
    }, [convocations]);

    //GO TO FIRST PAGE WHEN SEARCH START
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    //HANDLE SEARCH BASED ON THE GIVEN TEXT
    const handleSearch = (text) => {
        if (text) {
            setSearchText(text.toLowerCase());
            const filtered = convocations.filter(
                (convocation) =>
                    convocation.program.name.toLowerCase().includes(searchText) ||
                    convocation.beginning.toLowerCase().includes(searchText) ||
                    convocation.schedule.toLowerCase().includes(searchText) ||
                    convocation.id.toString().includes(searchText)
            );
            setFilteredConvocations(filtered);
        } else {
            setFilteredConvocations(convocations);
        };
    };

    // CALCULATE START AND END INDEX FOR CURRENT PAGE
    const startIndex = (currentPage - 1) * 7;
    const endIndex = currentPage * 7;

    //IF THE API DONT WORK SHOW CARGANDO...
    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }

    return (
        // RENDER THE CONVOCATIONS
        <Container className="containerData">
            <div className="containerDataScroll">
                {/* TITLE */}
                <div className="dataBorder">
                    <div className="dataTitle">Convocatorias</div>
                </div>

                {/* INPUT SEARCH */}
                <InputSearch onSearch={handleSearch} />

                {/* TABLE HEADER */}
                <div className="tableContainerData mt-4">
                    <div className="tableDataRow">
                        <div className="tableDataHeader">Programa</div>
                        <div className="tableDataHeader">Inicio</div>
                        <div className="tableDataHeader">Horarios</div>

                        {/* ONLY SHOW DETAIL IF IS ADMIN */}
                        {userRole === 1 && (
                            <div className="tableDataHeader">Detalle</div>
                        )}
                    </div>

                    {/* MAPPING THE CONVOCATIONS */}
                    {filteredConvocations.slice(startIndex, endIndex).map((convocation) => {
                        return (
                            <div className="tableDataRow" key={convocation.id}>
                                <div className="tableDataData">{convocation.program.name}</div>
                                <div className="tableDataData">{convocation.beginning}</div>
                                <div className="tableDataData">{convocation.schedule}</div>

                                {/* ONLY SHOW DETAIL BUTTON IF IS ADMIN */}
                                {userRole === 1 && (
                                    <div className="tableDataData">
                                        <div className="d-flex justify-content-center align-items mt-1 buttonsConvocations">
                                            <AdminButton
                                                onClick={() => navigate(`/convodetail/${convocation.id}`)}
                                                text={"VER"}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                {filteredConvocations.length > 7 ? (
                    <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
                        <PageButton
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            text={'◁'}
                            design="left"
                        />
                        <div className="numberPage">{currentPage}</div>
                        <PageButton
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={endIndex >= filteredConvocations.length}
                            text={'▷'}
                            design="right"
                        />
                    </div>
                ) : ''}
            </div>
        </Container>
    );
};
