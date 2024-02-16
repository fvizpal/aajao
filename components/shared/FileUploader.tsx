'use client'

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
      className='flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-slate-100'
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            alt="eventImage"
            width={200}
            height={200}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col py-5 text-gray-500'>
          <img src='/assets/icons/upload.svg' alt='fileupload' width={70} height={70} />
          <h3 className='my-2'>Drag photos here</h3>
          <Button type='button' className='rounded-full bg-slate-400 text-white'>
            SELECT
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader