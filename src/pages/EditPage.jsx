import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { VITE_BACKEND_URL } from "../App";
import { useDatabase } from '../DatabaseContext';

const EditPage = () => {
    const { id } = useParams();
    const { database, collection } = useDatabase();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState({
        postType: "",
        postCaptions: "",
        hashtagsUsed: "",
        postDate: "",
        linkToPost: "",
        impressions: "",
        views: "",
        likes: ""
    });

    const getVideo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/api/${id}?dbName=${database}&collectionName=${collection}`);
            setVideo({
                postType: response.data.postType || "",
                postCaptions: response.data.postCaptions || "",
                hashtagsUsed: response.data.hashtagsUsed || "",
                postDate: response.data.postDate || "",
                linkToPost: response.data.linkToPost || "",
                impressions: response.data.impressions || "",
                views: response.data.views || "",
                likes: response.data.likes || ""
            });
            console.log("Video data fetched successfully:", response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            console.error("Failed to fetch video:", errorMessage);
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const updateVideo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`${VITE_BACKEND_URL}/api/${id}?dbName=${database}&collectionName=${collection}`, video);
            toast.success("Updated Video Successfully");
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getVideo();
    }, [id, database, collection]);

    return (
        <div className="max-w-lg w-full bg-white shadow-lg mx-auto p-4 sm:p-7 rounded mt-4 sm:mt-6">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 block text-center">
                Update Content:
            </h2>
            {isLoading ? ("Loading...") : (
                <form onSubmit={updateVideo}>
                    <div className="space-y-2">
                        <div>
                            <label className="font-semibold">Post Type</label>
                            <input type="text" value={video.postType} onChange={(e) => setVideo({ ...video, postType: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter type of post (eg: IG Reel)" />
                        </div>
                        <div>
                            <label className="font-semibold">Post Caption</label>
                            <input type="text" value={video.postCaptions} onChange={(e) => setVideo({ ...video, postCaptions: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter post caption" />
                        </div>
                        <div>
                            <label className="font-semibold">Hashtags</label>
                            <input type="text" value={video.hashtagsUsed} onChange={(e) => setVideo({ ...video, hashtagsUsed: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter hastags, no '#' and comma separated (eg: psu,tday)" />
                        </div>
                        <div>
                            <label className="font-semibold">Date</label>
                            <input type="text" value={video.postDate} onChange={(e) => setVideo({ ...video, postDate: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter date posted (eg: 05-22-2024)" />
                        </div>
                        <div>
                            <label className="font-semibold">Post URL</label>
                            <input type="text" value={video.linkToPost} onChange={(e) => setVideo({ ...video, linkToPost: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter link to post " />
                        </div>
                        <div>
                            <label className="font-semibold">Impressions</label>
                            <input type="number" value={video.impressions} onChange={(e) => setVideo({ ...video, impressions: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of impressions (no commas) " />
                        </div>
                        <div>
                            <label className="font-semibold">Views</label>
                            <input type="number" value={video.views} onChange={(e) => setVideo({ ...video, views: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of views (no commas)" />
                        </div>
                        <div>
                            <label className="font-semibold">Likes</label>
                            <input type="number" value={video.likes} onChange={(e) => setVideo({ ...video, likes: e.target.value })} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of likes (no commas) " />
                        </div>
                        <div>
                            {!isLoading && (
                                <button className="block w-full mt-4 sm:mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditPage;