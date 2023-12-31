import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

type Props = {
    videoUrl: string;
    title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
                videoId: videoUrl,
            });

            setVideoData(response.data);
        } catch (error) {
            console.error("Error in Axios request:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [videoUrl]);

    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {videoData.otp && videoData.playbackInfo !== "" && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=az4iMS9bysilLA1h`}
                    style={{
                        border: 0,
                        width: "90%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    allowFullScreen={true}
                    allow="encrypted-media"
                ></iframe>
            )}
        </div>
    );
};

export default CoursePlayer;
