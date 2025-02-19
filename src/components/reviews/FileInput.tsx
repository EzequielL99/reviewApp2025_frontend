import { FieldError } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useDropzone } from "react-dropzone";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

type FileInputProps = {
  onChange: (...event: File[]) => void;
  value: File | null;
  error?: FieldError;
};

export default function FileInput({ onChange, value, error }: FileInputProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/xml": [".bprelease"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter((file) =>
        file.name.includes(".bprelease")
      );

      if (filteredFiles.length) onChange(filteredFiles[0]);
    },
  });

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className="border-2 border-red-700 bg-red-50 hover:bg-red-200 transition-colors text-red-700 py-10 mb-4 border-dashed p-5 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Arrasta y suelta tu archivo .bprelease aqui</p>
      </div>

      {value && value.name && (
        <div className="bg-slate-100 border flex gap-6 items-center border-gray-200 text-black">
          <DocumentTextIcon className="w-12 bg-slate-950 p-3 text-white" />
          {value.name}
        </div>
      )}

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
