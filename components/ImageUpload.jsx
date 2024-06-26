import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = (props) => {
  const { onChange, label, value, disabled } = props;

  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files) => {
      const file = files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setBase64(e.target.result);
        handleChange(e.target.result);
      });
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white cursor-pointer">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
