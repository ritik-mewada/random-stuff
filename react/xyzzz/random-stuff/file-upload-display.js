// ---------- STEP 1 ------------
// Use file system for convert file to base64
const readFileAsync = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default readFileAsync;

// ---------- STEP 2 ----------
// WHILE TAKING IMAGE FROM USER 
// Take Input as file and img for display image 
<div>
    <img src={changeImg} alt="change-img" />
    <input
    	accept="image/jpeg,image/png,image/bmp,image/tiff"
        type="file"
        ref={imageRef}
        onChange={(e) =>
        handleRegistrationInputChange(
        "cat-image",
        e.target.files[0],
        true
        )}
     />
<div>
// handleRegistrationInputChange for check is image valid or not
const handleRegistrationInputChange = async (name, value, isFileControl) => {
    if (isFileControl) {
      if (name === "cat-image") {
        const file = imageRef.current.files[0];
        const reader = new FileReader();
        if (!validateFileType(file.type)) { // check if user selectes file other than image
          showNotification("error", "Please Select Image File Only");
          return;
        }
        reader.onload = () => {
          setSelectedImage(reader.result); // store in state
        };
        reader.readAsDataURL(file);
      }
      return;
    }
  };
//  also another function validateFileType
const validateFileType = (imageType) => {
  const allowdType = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/tiff",
  ];
  return allowdType.includes(imageType);
};

export default validateFileType;

// ---------- STEP 3 ----------
// WHILE UPLOADING IMAGE TO API 
// 1. Send Image as we get from "imageRef.current.files[0]"
//  before send this to response body use FormData();
let formdata = new FormData();
formdata.append("name", name);
formdata.append("image", image);
// add all the fields need to pass to api body and pass formdata in body

// ---------- STEP 4 ----------
// ENTIRE API POST REQUEST FOR REFERENCE
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "_apric_admin_token"
          )} `,
        },
      };

      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);

      let requestOptions = {
        method: config.method,
        headers: config.headers,
        body: formdata,
        redirect: config.redirect,
      };

      const data = await fetch(
        "https://apric-admin.i-nextgen.com/public/api/admin/add-category",
        requestOptions
      );
      return data.json();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);