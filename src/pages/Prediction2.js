import axios from "axios";
import { useForm } from "react-hook-form";
import fileDownload from 'js-file-download'

import {Header} from "../components/shared/Header/Header";
import image_placeholder from "../images/image_placeholder.png"
import { Footer } from "../components/shared/Footer/Footer";

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemStartListener,
  useItemFinishListener
} from "@rpldy/uploady";

import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import cropImage from "./cropImage";
import styled from "styled-components";
import "./Prediction2.css";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
  max-width: 900px;
  height: 400px;
`;

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
  max-height: 200px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PreviewButtons = ({
  finished,
  crop,
  updateRequest,
  onUploadCancel,
  onUploadCrop
}) => {
  return (
    <ButtonsWrapper>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCrop}
      >
        Upload Cropped
      </button>
      <button
        style={{ display: !finished && updateRequest ? "block" : "none" }}
        onClick={updateRequest}
      >
        Upload without Crop
      </button>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCancel}
      >
        Cancel
      </button>
    </ButtonsWrapper>
  );
};

const UPLOAD_STATES = {
  NONE: 0,
  UPLOADING: 1,
  FINISHED: 2
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const {
    id,
    url,
    isFallback,
    type,
    updateRequest,
    requestData,
    previewMethods
  } = props;
  const cropRef = useRef(null);
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  const [crop, setCrop] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const isFinished = uploadState === UPLOAD_STATES.FINISHED;

  useItemStartListener(() => setUploadState(UPLOAD_STATES.UPLOADING), id);
  useItemFinalizeListener(() => setUploadState(UPLOAD_STATES.FINISHED), id);
     const onImageLoaded = useCallback((image) => {
    cropRef.current = image;
  }, []);

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      const { blob: croppedBlob, blobUrl, revokeUrl } = await cropImage(
        cropRef.current,
        requestData.items[0].file,
        crop,
        true
      );

      requestData.items[0].file = croppedBlob;

      updateRequest({ items: requestData.items });
      setCroppedUrl({ blobUrl, revokeUrl });
    }
  }, [requestData, updateRequest, crop]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  useEffect(() => () => croppedUrl?.revokeUrl(), [croppedUrl]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img" />
  ) : (
    <>
      {requestData && uploadState === UPLOAD_STATES.NONE ? (
        <StyledReactCrop
          ruleOfThirds
          src={url}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onChange={setCrop}
          onComplete={setCrop}
          style={{ height: "100%" }}
        />
      ) : (
        <PreviewImage src={croppedUrl?.blobUrl || url} alt="img to upload" />
      )}
      <PreviewButtons
        finished={isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
      <p>{isFinished ? "FINISHED" : ""}</p>
    </>
  );
});


function Prediction() {

  console.log("Prediction")
  const [prediction, setPrediction] = useState(null);
  const previewMethodsRef = useRef();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
    
  const PredictedImage = () => {
      useItemFinishListener((item) => {
        console.log("giansalvo here!!")
          console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse.data, item.uploadStatus);
          
          var bytes = new Uint8Array(item.uploadResponse.data);
          const blob = new Blob( [bytes] );
          const url = URL.createObjectURL( blob );
          console.log("URL: " + url)
          setPrediction(url);

          // const imageObjectURL = URL.createObjectURL(blob);
          // setPrediction(imageObjectURL);

          // const data = item.uploadResponse.json()
          // setPrediction(data.message)

          // const blob = new Blob( item.uploadResponse.blob());
          // const url = URL.createObjectURL( blob );
          // setPrediction(url);
     });
     return (
      <div className="column_images">
        <h2>Substantia Nigra (in red)</h2>
        {prediction}<br/><br/>
        {prediction ?
        <div className="img-preview-wrapper">
          {
              <img src={prediction} width="100%" alt="predicted image" />
          }
        </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
      </div>
     )};


  const [fields, setFields] = useState({
        image: null,
        ground_truth_TODO: null,
        title: "",
        description: "",
        patient_id: "",
        patient_age: "",
        user_id: 1});

  const { register, handleSubmit, formState: { errors } } = useForm();

    // var FileSaver = require('file-saver');

  const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setFile(file);
      }
      useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);
    
    return (
      <div className="main_container">
        <Header/>
        <div className="row">
          <Uploady
            multiple={false}
            destination={{ url: "http://[::1]:8438/prediction/do-prediction/" }}
            // inputFieldContainer = "img-preview-wrapper"
            inputFieldName = "image"
            //formatServerResponseMethod = "blob"
          >
        <div>
          <UploadButton>Select File to upload</UploadButton>
          <br />
          <UploadPreview
            PreviewComponent={ItemPreviewWithCrop}
            previewComponentProps={{ previewMethods: previewMethodsRef }}
            previewMethodsRef={previewMethodsRef}
            fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
          />
        </div>
        <div className="column_images">
          <PredictedImage/>
        </div>
       </Uploady>
      </div>
      <Footer/>
    </div>
  );
}

export default Prediction;
