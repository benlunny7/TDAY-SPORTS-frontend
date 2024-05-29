import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";
import { useDatabase } from "../DatabaseContext";

const Video = ({ video, getVideos }) => {
    const { database, collection } = useDatabase();

    const deleteVideo = async (id) => {
        const result = await Swal.fire({
            title: 'Do You Really Want to Permanently Delete This Content From the Database?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${VITE_BACKEND_URL}/api/${id}?dbName=${database}&collectionName=${collection}`);
                toast.success("Deleted Content Successfully");
                getVideos();
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    }


    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <style>
                {`
          .bg-lightskyblue {
            background-color: #87CEFA; /* LightSkyBlue */
          }
        `}
            </style>
            <div className="px-4 pt-2 pb-4 flex flex-col justify-between" style={{ minHeight: '250px' }}>

                <div>
                    <h2 style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: '8px', fontWeight: 'bold' }}>{video.postCaptions}</h2>

                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Link to Post:</span> <a href={video.linkToPost} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>Click to View Content</a></div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Post Type:</span> {video.postType}</div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Date of Post:</span> {video.postDate}</div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Hashtags:</span> {video.hashtagsUsed.join(', ')}</div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Impressions:</span> {video.impressions}</div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Views:</span> {video.views}</div>
                    <div className="text-sm"><span style={{ fontWeight: '600' }}>Likes:</span> {video.likes}</div>
                </div>

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${video._id}`} className="inline-block w-full text-center shadow-md text-sm bg-lightskyblue text-white 
        rounded-sm px-4 py-1 font-bold hover:bg-blue-600 hover:cursor-pointer">Edit</Link>

                    <button onClick={() => deleteVideo(video._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white 
        rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>

            </div>



        </div>
    )
}

export default Video;