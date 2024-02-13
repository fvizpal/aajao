import { useDropzone } from '@uploadthing/react/hooks'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { Button } from '../ui/button'

type FileUploaderProps = {
  imageUrl: string,
  onFieldChange: (url: string) => void,
  setFiles: Dispatch<SetStateAction<File[]>>
}
const convertFileToUrl = (file: File) => URL.createObjectURL(file);

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
    >
      <input {...getInputProps()} />\

      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            alt="eventImage"
            width={200}
            height={200}

          />
        </div>
      ) : (
        <div>
          <img src='/assests/icons/upload.svg' alt='fileupload' width={70} height={70} />
          <h3>Drag photos here</h3>
          <p>SVG, PNG, JPG, JPEG</p>
          <Button>
            SELECT
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader