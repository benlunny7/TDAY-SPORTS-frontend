import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDatabase } from './DatabaseContext';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { database, setDatabase, collection, setCollection } = useDatabase();

  useEffect(() => {
    toast.info(`Now Viewing ${database} ${collection} Content.`);
  }, [database, collection]);

  return (
    <div>
      <nav className="bg-lightskyblue flex justify-between items-center p-2">
        <Link to="/">
          <h2 className="text-white text-2xl font-bold">TDAY Sports FastTwitch and Yerbae Content</h2>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'white', fontWeight: '600', marginRight: '10px' }}>Choose Content and Platform:</span>
          <select value={database} onChange={e => setDatabase(e.target.value)} className="custom-dropdown">
            <option value="FastTwitchTDAY">FastTwitch</option>
            <option value="YerbaeTDAY">Yerbae</option>
          </select>
          <select value={collection} onChange={e => setCollection(e.target.value)} className="custom-dropdown">
            <option value="Instagram">Instagram</option>
            <option value="Tiktok">Tiktok</option>
            <option value="YouTube">YouTube</option>
          </select>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
