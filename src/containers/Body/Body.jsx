
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { ConvocationDetail } from "../ConvocationDetail/ConvocationDetail";
import { Student } from "../Student/Student";
import { Inscription } from "../Inscription/Inscription";
import { UserRequests } from "../UserRequests/UserRequests";
import { MyPrograms } from "../MyPrograms/MyPrograms";
import { ProgramDetail } from "../ProgramDetail/ProgramDetail";
import { RequestAccepted } from "../RequestAccepted/RequestAccepted";
import { MessageApp } from "../MessageApp/MessageApp";
import { Admin } from "../Admin/Admin";
import { Users } from "../Users/Users";
import { Convocation } from "../Convocation/Convocation";
import { Profile } from "../Profile/Profile";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/admin" element={<Admin />} /> 
                <Route path="/users" element={<Users />} /> 
                <Route path="/convocation" element={<Convocation />} /> 
                <Route path="/createConvocation" element={<CreateConvocation />} /> 
                <Route path="/convodetail/:id" element={<ConvocationDetail />} /> 
                <Route path="/student" element={<Student />} /> 
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/userRequest" element={<UserRequests />} /> 
                <Route path="/myPrograms" element={<MyPrograms />} /> 
                <Route path="/programDetail/:id" element={<ProgramDetail />} /> 
                <Route path="/requestAccepted" element={<RequestAccepted />} /> 
                <Route path="/messageApp" element={<MessageApp />} /> 
            </Routes>
        </>
    );
};