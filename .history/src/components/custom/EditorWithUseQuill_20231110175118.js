import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats"
import './editor.css';
const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
    
var Image = RQ.Quill.import("formats/image");
Image.className = "m-2";
RQ.Quill.register(Image, true);

// Adding the lib to the reactquill
RQ.Quill.register("modules/imageActions", ImageActions, true);
RQ.Quill.register("modules/imageFormats", ImageFormats, true);

  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        console.log('Text change!');
        console.log(delta);

        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
