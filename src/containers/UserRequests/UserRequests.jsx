import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
import "../../App.css";
import { AdminButton } from "../../components/AdminButton/AdminButton";
import { PageButton } from "../../components/PageButton/PageButton";
import { InputSearch } from "../../components/InputSearch/InputSearch";

export const UserRequests = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [filteredRequestUsers, setFilteredRequestUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    //GO TO FIRST PAGE WHEN SEARCH START
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    //HANDLER SEARCH
    const handleSearch = (text) => {
        if (text) {
            setSearchText(text.toLowerCase());
            const filtered = usersReq.filter(request => {
                return (
                    request.user.name.toLowerCase().includes(searchText) ||
                    request.user.surname.toLowerCase().includes(searchText) ||
                    request.user.email.toLowerCase().includes(searchText) ||
                    request.user.id.toString().includes(searchText) ||
                    request.program.name.toLowerCase().includes(searchText) ||
                    request.convocation.beginning.includes(searchText)
                );
            });
            setFilteredRequestUsers(filtered);
        } else {
            setFilteredRequestUsers(usersReq);
        };
    };

    // ACCEPT REQUEST HANDLER
    const handleAcceptRequest = (id) => {
        acceptUserRequest(id)
            .then(() => {
                setRequestAccepted(true);

                // FEAT THE ACCEPT REQUEST TO STATE acceptedRequests
                setAcceptedRequests(prevRequests => [...prevRequests, id]);
            })
            .catch((error) => {
                console.error("Error al aceptar la solicitud:", error);
            });
    };

    // CALCULATE START AND END INDEX FOR CURRENT PAGE
    const startIndex = (currentPage - 1) * 7;
    const endIndex = currentPage * 7;

    if (!usersReq) {
        return <div>Loading...</div>;
    };

    return (
        <Container className="containerData">
            <div className="containerDataScroll">
                {/* TITLE */}
                <div className="dataBorder">
                    <div className="dataTitle">Solicitudes</div>
                </div>

                {/* INPUT SEARCH */}
                <InputSearch onSearch={handleSearch} />

                {/* DATA REQUEST */}
                <div className="tableContainerData mt-4">
                    <div className="tableDataRow">
                        <div className="tableDataHeader">Nombre</div>
                        <div className="tableDataHeader">Email</div>
                        <div className="tableDataHeader">Curso</div>
                        <div className="tableDataHeader">Inicio</div>
                        <div className="tableDataHeader">Aceptar</div>
                    </div>

                    {/* MAPPING USER REQUEST */}
                    {filteredRequestUsers.slice(startIndex, endIndex).map((request) => {
                        if (!acceptedRequests.includes(request.id)) {
                            return (
                                <div className="tableDataRow" key={request.id}>
                                    <div className="tableDataData">{request.user.name} {request.user.surname}</div>
                                    <div className="tableDataData">{request.user.email}</div>
                                    <div className="tableDataData">{request.program.name}</div>
                                    <div className="tableDataData">{request.convocation.beginning}</div>

                                    {/* ADMIN BUTTON TO ACCEPT REQUEST */}
                                    <div className="tableDataData">
                                        <AdminButton
                                            onClick={() => {
                                                handleAcceptRequest(request.id);
                                            }}
                                            text={"✔"}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        return '';
                    })}
                </div>

                {/* PAGINATION */}
                {filteredRequestUsers.length > 7 ? (
                    <div className="d-flex justify-content-center align-items-center mt-4 mb-3">
                        <PageButton
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            text={'◁'}
                            design="left"
                        />
                        <div className="numberPage">{currentPage}</div>
                        <PageButton
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={endIndex >= filteredRequestUsers.length}
                            text={'▷'}
                            design="right"
                        />
                    </div>
                ) : ''}
            </div>
        </Container>
    );
};