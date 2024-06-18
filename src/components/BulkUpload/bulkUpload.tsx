import { Button } from '@payloadcms/ui/elements';
import React, { useState, ChangeEvent } from 'react';

const BulkUpload: React.FC = () => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const handleUploadFiles = (files: File[]) => {
		const uploaded = [...uploadedFiles];

		files.forEach((file) => {
			if (uploaded.findIndex((f) => f.name === file.name) === -1) {
				uploaded.push(file);
			}
		});

		setUploadedFiles(uploaded);
	};

	const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
		const chosenFiles = Array.prototype.slice.call(e.target.files) as File[];
		handleUploadFiles(chosenFiles);
	};

	const upload = async () => {
		try {
			const results = await Promise.all(
				uploadedFiles.map((file) => {
					let formData = new FormData();

					formData.append('file', file);
					formData.append('alt', file.name); // edit this

					const options = {
						method: 'POST',
						body: formData,
					};

					// Use the correct endpoint for Next.js API
					const url = new URL('/api/media/file' + file.name, window.location.origin);

					return fetch(url.toString(), options);
				})
			);
			console.log('Upload results:', results);
		} catch (error) {
			console.error('Upload failed:', error);
		}
	};

	return (
		<>
			<input
				onChange={handleFileEvent}
				style={{ display: 'none' }}
				id='fileUpload'
				type='file'
				multiple
				accept='image/png, image/jpeg, image/jpg, image/webp'
			/>
			<label htmlFor='fileUpload'>
				<a className='btn btn-primary'>Select files...</a>
			</label>
			<div className='uploaded-files-list'>
				{uploadedFiles.map((file) => (
					<div key={file.name}>{file.name}</div>
				))}
			</div>
			<Button disabled={!uploadedFiles.length} onClick={upload}>
				Upload
			</Button>
		</>
	);
};

export default BulkUpload;
