import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, Modifier } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
);

const Editorr = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  const handleImageUpload = async (file: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'eqq0aekw');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzbb5kktn/image/upload',
        formData
      );
      console.log(response)
      const imageUrl = response.data.secure_url;

      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      // Insert an atomic block with the entity
      const newContentState = Modifier.insertText(
        contentState,
        contentState.getSelectionAfter(),
        ' ',
        undefined,
        entityKey
      );

      // Update the editor state with the new content state
      const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');

      setEditorState(newEditorState);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handlePasteImage = (e: { preventDefault: () => void; clipboardData: any; originalEvent: { clipboardData: any; }; }) => {
    e.preventDefault();
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        handleImageUpload(blob);
      }
    }
  };

  useEffect(() => {
    const handlePaste = (e: any) => {
      handlePasteImage(e);
    };

    const wrapper = wrapperRef.current;

    if (wrapper) {
      wrapper.addEventListener('paste', handlePaste);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('paste', handlePaste);
      }
    };
  }, [handlePasteImage]);

  return (
    <div ref={wrapperRef}>
      <Editor
        editorState={editorState}
        onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
        toolbar={{
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};

export default Editorr;
