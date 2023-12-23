  import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
  } from "react";
  import { useDropzone } from "react-dropzone";

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
  
    const onDrop = useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          const imageUrl = reader.result as string;
          setUploadedImage(imageUrl);
          // Update the avatar URL in the parent component and local storage
          setAvatarUrl(imageUrl);
          localStorage.setItem(`avatarUrl_${userId}`, imageUrl); // Save to local storage with user-specific key
        };
  
        reader.readAsDataURL(file);
      },
      [setAvatarUrl, userId]
    );
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
        <div className="flex flex-row items-center">
          <div className="p-2">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded Profile"
                className="rounded-full"
              />
            ) : (
              <p className="text-xl font-bold">Profile Picture</p>
            )}
          </div>
        </div>
        <div className="border-t border-white/5 p-4">
          <div
            {...getRootProps()}
            className="inline-flex space-x-2 items-center text-center cursor-pointer"
          >
            <input {...getInputProps()} />➕
            <span className="hover:text-indigo-400">add/change</span>
          </div>
        </div>
      </div>
    );
  };

  export default ProfilePictureUpload;
