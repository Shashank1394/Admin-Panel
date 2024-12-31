import { useState } from 'react';
import axios from 'axios';
import { CldImage, CldVideo } from 'next-cloudinary';
import styles from '../styles/Home.module.css';
import cl from '../utils/cloudinary';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [editedImageUrl, setEditedImageUrl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'your-upload-preset'); // Replace with your actual upload preset

    try {
      const response = await axios.post(
        `/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const imageUrl = response.data.imageUrl;
      setUploadedImageUrl(imageUrl);
      setEditedImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
    }
  };

  const handleVideoUpload = async () => {
    if (!selectedVideo) {
      alert('Please select a video first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedVideo);
    formData.append('upload_preset', 'your-upload-preset'); // Replace with your actual upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cl.config().cloud_name}/video/upload`,
        formData
      );
      const videoUrl = response.data.secure_url;
      setUploadedVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error uploading video:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = () => {
    if (!uploadedImageUrl) {
      alert('Please upload an image first.');
      return;
    }

    const editedUrl = cl.url(uploadedImageUrl, {
      transformation: [
        { width: 300, height: 300, crop: 'crop' },
        { overlay: 'text:Arial_60:Your%20Text', gravity: 'south', y: 20 },
      ],
    });

    setEditedImageUrl(editedUrl);
  };

  return (
    <div className={styles.uploadForm}>
      <h2>Upload and Edit Image</h2>
      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
      <button onClick={handleUpload} className={styles.uploadButton}>Upload Image</button>
      {editedImageUrl && (
        <div className={styles.imageContainer}>
          <CldImage
            src={editedImageUrl}
            width="500"
            height="500"
            crop={{
              type: 'auto',
              source: true,
            }}
            className={styles.canvas}
          />
          <button onClick={handleEdit} className={styles.editButton}>Edit Image</button>
        </div>
      )}

      <h2>Upload Video</h2>
      <input type="file" onChange={handleVideoChange} className={styles.fileInput} />
      <button onClick={handleVideoUpload} className={styles.uploadButton}>Upload Video</button>
      {uploadedVideoUrl && (
        <div className={styles.videoContainer}>
          <CldVideo
            src={uploadedVideoUrl}
            width="500"
            height="500"
            controls
            className={styles.canvas}
          />
        </div>
      )}
    </div>
  );
}