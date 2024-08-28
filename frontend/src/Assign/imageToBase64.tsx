const imageToBase64 = async (file: File, maxWidth: number = 800, quality: number = 0.1): Promise<string> => {
  // Create a new FileReader instance
  const reader = new FileReader();

  // Wrap the FileReader in a Promise
  const dataUrl = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  // Create a new Image instance
  const img = new Image();

  // Wrap image loading in a Promise
  const resizedBase64 = await new Promise<string>((resolve, reject) => {
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Failed to get canvas context'));
      }

      // Calculate the scale factor to resize the image
      const scale = Math.min(maxWidth / img.width, 1); // Ensure we don't upscale the image
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Base64-encoded image with the specified quality
      resolve(canvas.toDataURL('image/*', quality));
    };

    img.onerror = (err) => reject(err);
    img.src = dataUrl; // Set the image source to the loaded data URL
  });

  return resizedBase64; // Return the resized Base64 string
};

export { imageToBase64 };