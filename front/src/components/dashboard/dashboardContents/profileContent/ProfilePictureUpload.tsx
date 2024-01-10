import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface ProfilePictureUploadProps {
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  updateUserId: (id: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  userId,
  setAvatarUrl,
  updateUserId,
}: ProfilePictureUploadProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem(`avatarUrl_${userId}`);
    if (storedAvatarUrl) {
      setUploadedImage(storedAvatarUrl);
    }
  }, [userId]);

  const uploadImage = useCallback(async (file: File) => {
    try {
      const authToken = localStorage.getItem("x-auth-token");
  
      if (!authToken) {
        console.error("Authentication token is missing.");
        // Handle the case where the authentication token is missing
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file, file.name); // Ensure 'file' is the expected key on the server
  
      console.log("Selected file:", file);
      console.log("FormData:", formData);
  
      const response = await axios.post(
        `http://localhost:8000/api/users/${userId}/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": authToken,
          },
        }
      );
  
      const imageUrl = response.data.user.avatar;
  
      setAvatarUrl(imageUrl);
      localStorage.setItem(`avatarUrl_${userId}`, imageUrl);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  }, [setAvatarUrl, userId]);
  
  
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("Selected file:", file);
  
    if (file) {
      console.log("Selected file:", file);
      uploadImage(file);
    } else {
      console.error("No file selected.");
    }
  };
  
  
  
  

  return (
    <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="p-2">
          {uploadedImage ? (
            <img
            src={`/uploads/${userId}/profile-picture.jpg`}
            alt="Uploaded Profile"
            className="rounded-full"
            />
          ) : (
            <p className="text-xl font-bold">Profile Picture</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/5 p-4">
        <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
          <input type="file" name="file" onChange={handleFileChange} />
          <span className="hover:text-indigo-400">add/change</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
