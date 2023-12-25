import React from "react";

interface AddRemoveButtonProps {
  isInMyList: boolean;
  onToggle: () => void;
}

const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
  isInMyList,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`${
        isInMyList ? "bg-red-500" : "bg-blue-500"
      } text-white px-4 py-2 rounded focus:outline-none`}
    >
      {isInMyList ? "Remove from My List" : "Add to My List"}
    </button>
  );
};

export default AddRemoveButton;
