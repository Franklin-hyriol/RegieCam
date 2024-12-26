import React, { Suspense, useEffect, useState } from 'react';
import { AddCameraman } from '../components/AddCameraman';
import { CameramanList } from '../components/CameramanList';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Signal } from '../types';
import axios from 'axios';
import { deleteCam, disconnectAdmin, getallcam, updateCam } from '../api/url';
// import { Home as HomeIcon } from 'lucide-react';

export const Pilot: React.FC = () => {
  const [cameramen, setCameramen] = useState<Camera[] | null>(null);
  const navigate = useNavigate();

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

  const handleSignal = (id: number, signal: Signal) => {
    axios.patch(`${updateCam}/${id}`, {
      status: signal,
    })
      .then(response => {
        if (response.status === 200) {
          console.log('update signal success');
          fetchCameramen(); // Re-fetch les données après la mise à jour
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  };

  const handleDisconnectAdmin = () => {
    axios.get(disconnectAdmin)
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('role');
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }

  const deleteCamById = (id: number) => {
    axios.delete(`${deleteCam}/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('delete cam success');
          fetchCameramen(); // Re-fetch les données après la mise à jour
        }
        if (response.status === 204) {
          alert('Cam is used');
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pilot Dashboard <span onClick={() => handleDisconnectAdmin()} className="text-xs inline px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">se deconnecter</span></h1>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <span>Home</span>
          </Link>
        </div>
        <AddCameraman updateCamList={fetchCameramen} />
        <Suspense>
          {cameramen && <CameramanList camera={cameramen} onSignalChange={handleSignal} deleteCamById={deleteCamById} />}
        </Suspense>
      </div>
    </div>
  );
};
