import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ProfilePictureUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    // Assuming you want to display the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="p-2">
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded Profile" className="rounded-full" />
          ) : (
            <p className="text-xl font-bold">Profile Picture</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/5 p-4">
        <div {...getRootProps()} className="inline-flex space-x-2 items-center text-center cursor-pointer">
          <input {...getInputProps()} />
          ➕
          <span className="hover:text-indigo-400">change</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
