import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";
import { useDatabase } from '../DatabaseContext';



const CreatePage = () => {

    const [postType, setPostType] = useState("");
    const [postCaptions, setPostCaptions] = useState("");
    const [hashtagsUsed, setHashtagsUsed] = useState("");
    const [postDate, setPostDate] = useState("");
    const [linkToPost, setLinkToPost] = useState("");
    const [impressions, setImpressions] = useState("");
    const [views, setViews] = useState("");
    const [likes, setLikes] = useState("");

    const { database, collection } = useDatabase();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveVideo = async (e) => {
        e.preventDefault();
        // Validation to check if any required field is empty
        if (!postType || !postCaptions || !postDate || !linkToPost || impressions === null || views === null || likes === null) {
            alert('Please fill out all required fields completely');
            return;
        }
        // Check if hashtags are not just an empty array
        if (!hashtagsUsed.length) {
            alert('Please enter at least one hashtag');
            return;
        }
        try {
            setIsLoading(true);
            // Sending data to backend
            const response = await axios.post(`${VITE_BACKEND_URL}/api?dbName=${database}&collectionName=${collection}`, {
                postType,
                postCaptions,
                hashtagsUsed: hashtagsUsed.split(',').map(tag => tag.trim()),
                postDate,
                linkToPost,
                impressions: parseInt(impressions, 10),
                views: parseInt(views, 10),
                likes: parseInt(likes, 10)
            });
            toast.success('Saved New Content Successfully');
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Add New Content:
            </h2>

            <form onSubmit={saveVideo}>
                <div className="space-y-2">
                    <div>
                        <label>Post Type</label>
                        <input type="text" value={postType} onChange={(e) => setPostType(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter type of post (eg: IG Reel)" />
                    </div>
                    <div>
                        <label>Post Caption</label>
                        <input type="text" value={postCaptions} onChange={(e) => setPostCaptions(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter post caption" />
                    </div>
                    <div>
                        <label>Hashtags</label>
                        <input type="tex" value={hashtagsUsed} onChange={(e) => setHashtagsUsed(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter hastags, no '#' and comma separated (eg: psu,tday)" />
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="text" value={postDate} onChange={(e) => setPostDate(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter date posted (eg: 05-22-2024)" />
                    </div>
                    <div>
                        <label>Post URL</label>
                        <input type="text" value={linkToPost} onChange={(e) => setLinkToPost(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter link to post " />
                    </div>
                    <div>
                        <label>Impressions</label>
                        <input type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of impressions (no commas) " />
                    </div>
                    <div>
                        <label>Views</label>
                        <input type="number" value={views} onChange={(e) => setViews(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of views (no commas)" />
                    </div>
                    <div>
                        <label>Likes</label>
                        <input type="number" value={likes} onChange={(e) => setLikes(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter # of likes (no commas) " />
                    </div>

                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                    </div>


                </div>
            </form>


        </div>
    )
}

export default CreatePage;