type FileBase64 = {
  base64: string;
  filename: string;
};

export const fileToBase64 = (file: File): Promise<FileBase64> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Eliminamos el prefijo `data:mime/type;base64,` si es necesario
        const base64String = reader.result.split(",")[1];

        resolve({
          base64: base64String,
          filename: file.name
        });
      } else {
        reject(new Error("No se pudo leer el archivo."));
      }
    };

    reader.onerror = (error) => reject(error);
  });
};
