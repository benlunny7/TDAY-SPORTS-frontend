import { useEffect, useState } from "react";
import axios from "axios";
import Video from "../components/Video";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";
import { useDatabase } from "../DatabaseContext"; // Make sure the path is correct

const HomePage = () => {
    const { database, collection } = useDatabase(); // Now using context to get database and collection
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getVideos = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}/api`, {
                params: { dbName: database, collectionName: collection }
            });
            console.log(response.data);
            setVideos(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getVideos();
    }, [database, collection]); // React to changes in database and collection

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 
                font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Add New Content to Database
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
                {isLoading ? (
                    "Loading..."
                ) : (
                    videos.length > 0 ? (
                        videos.map((video, index) => (
                            <Video key={index} video={video} getVideos={getVideos} />
                        ))
                    ) : (
                        <div>This Collection Has No Data Yet. Please Select A Different Partnership or Media Platform</div>
                    )
                )}
            </div>
        </div>
    );
}

export default HomePage;
