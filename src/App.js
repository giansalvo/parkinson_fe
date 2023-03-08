import React, { useState, useCallback, useRef, useEffect, useMemo, forwardRef} from "react";
import styled, { css } from "styled-components";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemStartListener,
  useBatchAddListener,
  useBatchFinishListener,
  useUploady
} from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import cropImage from "./cropImage";
import { asUploadButton } from "@rpldy/upload-button";
import axios from "axios";
import { useRequestPreSend } from "@rpldy/uploady";
import "./styles.css";

function myEnhancer (data) {
  console.log("Data:", data)
  // console.log("Data.image[0]:", data.image[0])

  // const formData = new FormData()
  // formData.append("image", data.image[0])
  // formData.append("title", data.title);
  // formData.append("description", data.description);
  // formData.append("patient_id", data.patient_id);
  // formData.append("patient_age", data.patient_age);
  // formData.append("user_id", data.user_id);

  // console.log("formData:", formData)

  // axios
  // .post(
  //     "http://[::1]:8438/prediction/do-prediction/",
  //     formData,
  //     {
  //         headers: {
  //             "Content-type": "multipart/form-data",
  //         },
  //     }
  // )
  // .then((res) => {
  //     console.log(`Success` + res);
  // })
  // .catch((err) => {
  //     console.log("Error: " + err);
  // })
};


const inputCss = css`
  width: 260px;
  height: 30px;
  line-height: 30px;
  font-size: 22px;
  color: #000;
  border: 1px solid #fff;
  background-color: #f1f1f1;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 0 4px;
`;

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

const SubmitButton = styled.button`
  height: 60px;
  width: 260px;
  font-size: 22px;
  margin-top: 20px;
  background-color: #101a2c;
  border: 1px solid #4b5763;
  color: #b0b1b3;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 4px;

  ${({ disabled }) =>
    disabled
      ? `
    cursor: default;
    background-color: #d8d2d2;
    color: #444040
  `
      : ""}
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 10px;
    max-width: 200px;
    height: auto;
    max-height: 200px;
  }

  input[type="text"],
  input[type="number"] {
    ${inputCss}
  }
`;

const UploadField = styled.div`
  ${inputCss}

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  cursor: pointer;
`;


const MyUploadField = asUploadButton(
  forwardRef(({ onChange, ...props }, ref) => {
    const [text, setText] = useState("Select file");

    useBatchAddListener((batch) => {
      setText(batch.items[0].file.name);
      onChange(batch.items[0].file.name);
    });

    useBatchFinishListener(() => {
      setText("Select file");
      onChange(null);
    });

    return (
      <UploadField {...props} ref={ref} id="form-upload-button" title={text}>
        {text}
      </UploadField>
    );
  })
);

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

  // console.log(crop)
  // console.log(croppedUrl)

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
      console.log(blobUrl)
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


const MyForm = () => {
  const [fields, setFields] = useState({});
  const [fileName, setFileName] = useState(null);
  const { processPending } = useUploady();

  const onSubmit = () => processPending({ params: fields });

  const onFieldChange = (e) => {
    setFields({
      ...fields,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const buttonExtraProps = useMemo(
    () => ({
      onChange: setFileName
    }),
    [setFileName]
  );

  return (
    <Form>
      <MyUploadField autoUpload={false} extraProps={buttonExtraProps} />
      <br />
      <input
        onChange={onFieldChange}
        id="field-name"
        type="text"
        placeholder="your name"
      />
      <br />
      <input
        onChange={onFieldChange}
        id="field-age"
        type="number"
        placeholder="your age"
      />
      <br />
      <SubmitButton
        id="form-submit"
        type="button"
        onClick={onSubmit}
        disabled={!fileName}
      >
        Submit Form
      </SubmitButton>
    </Form>
  );
};

//determine successful call using custom status codes
const customIsSuccess = (xhr) => {console.log(xhr)};


const MyComponent = () => {
    useRequestPreSend(({ items, options }) => {

      console.log("items: " + items)
      console.log("options: " + options)
      let method = options.method;

        if (options.destination.url.startsWith("https://put-server")) {
            method = "PUT";
        }

        return {
            options: { method } //will be merged with the rest of the options
        };
    });

};

export default function App() {
  const previewMethodsRef = useRef();

  return (
    <Uploady
      multiple={false}
      destination={{ url: "http://[::1]:8438/prediction/debug/" }}
      enhancer={myEnhancer}
      // params={"pippo"}
      isSuccessfulCall={customIsSuccess}
      method="POST"
    >
      <div className="App">
        <h1>Hello React Uploady</h1>
        <UploadButton>Select File to upload</UploadButton>
        <br />
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
      </div>
      
      <MyForm/>
    </Uploady>
  );
}
