import { HighlightOff } from "@material-ui/icons";
import React from "react";
import "../css/ImagePreview.css";
function ImagePreview({ images, onDelete }) {
  return (
    <div className="imagePreview">
      {Array.from(images).length > 0 ? (
        Array.from(images).map((file, key) => (
          <div key={key} className="image__item">
            {file.type.includes("image") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="form-img__img-preview"
              />
            ) : (
              <video controls>
                <source
                  src={URL.createObjectURL(file)}
                  type={file.type}
                ></source>
              </video>
            )}
            <HighlightOff
              onClick={() => onDelete(file)}
              className="imagePreview__deleteBtn"
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default ImagePreview;
