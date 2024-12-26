
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSignalColor } from '../helpers/getSignalColor';
import { Camera } from '../types';
import { getallcam, getCamById, updatecamUsed } from '../api/url';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CameramanUser() {
    const [camera, setCamera] = useState<Camera | null>(null);
    const [cameramen, setCameramen] = useState<Camera[] | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCamera() {
            if (id) {
                try {
                    const response = await axios.get(`${getCamById}/${id}`);
                    setCamera(response.data);
                } catch (error) {
                    console.error("Error fetching camera data:", error);
                }
            }
        }
        fetchCamera();
    }, [id]);


    const fetchCameramen = () => {
        axios.get(getallcam)
            .then(response => {
                setCameramen(response.data);
                console.log('Réponse :', response.data);
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    };

    useEffect(() => {
        fetchCameramen();
    }, []);

    const handleUpdatecamUsed = (id: number) => {
        axios.patch(`${updatecamUsed}/${id}`, {
            used: false,
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem("cameraId");
                    navigate(`/cameraman`);
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    }



    return (
        <div className="min-h-screen bg-gray-100 p-8">


            {camera && <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {camera.name}
                        </h1>
                        <button
                            onClick={() => handleUpdatecamUsed(camera.id)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            (liberer la camera)
                        </button>
                    </div>
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        {/* <HomeIcon size={20} /> */}
                        <span>Home</span>
                    </Link>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <div
                        className={`w-full h-32 rounded-lg ${getSignalColor(
                            camera.status
                        )} mb-4`}
                    />
                    <p className="text-2xl font-bold text-center capitalize">
                        {camera.status} Signal
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Other Cameras</h2>
                    <div className="space-y-4">

                        {cameramen && cameramen
                            .filter((cam) => cam.id !== camera.id)
                            .map((cam) => (
                                <div
                                    key={cam.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <span className="font-medium">{cam.name}</span>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`w-3 h-3 rounded-full ${getSignalColor(
                                                cam.status
                                            )}`}
                                        />
                                        <span className="capitalize">{cam.status}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default CameramanUser