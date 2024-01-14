import { unlink } from 'fs/promises';
import path from 'path';

async function deleteFile(filePath) {
  try {
    await unlink(filePath);
    console.log('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

export default deleteFile;
