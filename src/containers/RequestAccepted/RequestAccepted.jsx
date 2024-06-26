import './RequestAccepted.css'; 
import { AkdemyButton } from '../../components/AkdemyButton/AkdemyButton';
import { useNavigate } from "react-router-dom";

export const RequestAccepted = () => {
    const navigate = useNavigate();

    //GO BACK HOME
    const handleBackClick = () => {
        navigate("/");
    };

    return (

        //RENDER REQUEST ACCEPTED COMPONENT AND MESSAGE
        <div className="messageInscription">
            <p>Estimado/a,</p>
            <p>Nos complace informarle que hemos recibido su solicitud y estamos encantados de poder asistirle en su proceso de formación.</p>
            <p>Para proceder con el trámite, le solicitamos amablemente que nos haga llegar la siguiente documentación, ya sea de manera presencial o por correo electrónico a akdemyproject@email.com:</p>
            <ul>
                <li>Documento de identidad (Por ambas caras).</li>
                <li>Depósito bancario indicando nombre completo y curso a la siguiente cuenta: XXXX XXXX XXXX XXXX.</li>
            </ul>
            <p>Tenga en cuenta que podrá llevar un registro detallado de sus cursos en el apartado &quot;Mis cursos&quot; de nuestra plataforma.</p>
            <p>Si surgiera cualquier inquietud o si necesita asistencia adicional, no dude en ponerse en contacto con nosotros. Estamos a su disposición para brindarle toda la ayuda que requiera.</p>
            <p>Gracias por confiar en nosotros. Esperamos recibir su documentación pronto.</p>
            <p>Atentamente,</p>
            <p>El equipo de Akdemy</p>
            <p>Teléfono de contacto: +99999999</p>

            {/* AKDEMY BUTTON TO GO BACK */}
            <AkdemyButton text={"Volver"} onClick={handleBackClick}/>
        </div>
    );
}