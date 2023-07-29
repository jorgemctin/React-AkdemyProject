import axios from 'axios';

const URL = "http://localhost:8000";

//LOGIN 
export const loginMe = async (credentials) => {
    return await axios.post(`${URL}/api/login`, credentials);
    return res.data;
}

//REGISTER
export const registerMe = async (credentials) => {
    let res = await axios.post(`${URL}/api/register`, credentials);
    return res.data;
}

//GET PROFILE
export const getProfile = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.get(`${URL}/api/profile`, config);
    return res.data;
};

//UPDATE PROFILE
export const updateProfile = async (body, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.put(`${URL}/api/user/update`, body, config);
    return res.data;
};

//DELETE PROFILE
export const deleteProfile = async (token) => {
    try {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let res = await axios.delete(`${URL}/api/user/delete`, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

//CREATE CONVOCATION
export const createConvocation = async (body, token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };
    let res = await axios.post(`${URL}/api/convocation/create`, body, config)
    return res.data;

}

//UPDATE CONVOCATION
export const updateConvocation = async (token, id, bodyApp) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/api/convocation/update/${id}`, bodyApp, config);
    return res;
}

//CREATE USER-CONVOCATION
export const createUserConvocation = async (body, token) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };
    let res = await axios.post(`${URL}/api/userConvo/create`, body, config)
    return res.data;
}
// //UPDATE CONVOCATION
// export const updateConvocation = async (token, id, bodyApp) => {
//     let config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }
//     let res = await axios.put(`${URL}/api/convocation/update/${id}`, bodyApp, config);
//     return res;
// }

export const joinConvocation = async (token, id) => {
    try {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let data = {
            id: id,
        };
        let res = await axios.post(`${URL}/api/convocation/join`, data, config);
        return res;
    } catch (error) {
        console.error("Error uniendo a la convocatoria", error);
        throw error;
    }
};

