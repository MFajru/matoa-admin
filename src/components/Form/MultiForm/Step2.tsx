import { Button } from "@/components/Button/Button";
import { InputField } from "@/components/Form/InputField";
import { TMultiForm } from "@/types/form";
import { TModelProduct } from "@/types/product";
import {
  ArrowUpOnSquareStackIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export const Step2 = ({ formData, setFormData, setStep, step }: TMultiForm) => {
  const tempModel = formData.model;

  const fetchPostCloudinary = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgvshxgo4/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleOnChangeFiles = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const fileSelected = e.target.files?.[0];
    const tempPhotos = formData.model[idx].photos;
    if (fileSelected) {
      const formData = new FormData();
      formData.append("file", fileSelected);
      formData.append("upload_preset", "cyhyadh3");
      const fetchRes = await fetchPostCloudinary(formData);
      tempPhotos.push(fetchRes.secure_url);
    }
    setFormData((prevData) => {
      const updatedModels = [...prevData.model];
      const updatedModel = {
        ...updatedModels[idx],
        photos: tempPhotos,
      };
      updatedModels[idx] = updatedModel;
      return {
        ...prevData,
        model: updatedModels,
      };
    });
    console.log(formData.model[idx].photos);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    let value: string | number = e.target.value;
    if (e.target.name === "qty") {
      value = parseInt(e.target.value);
    }
    setFormData((prevData) => {
      const updatedModels = [...prevData.model];
      const updatedModel = {
        ...updatedModels[idx],
        [e.target.name]: value,
      };
      updatedModels[idx] = updatedModel;
      return {
        ...prevData,
        model: updatedModels,
      };
    });
  };

  const handleAddModel = () => {
    tempModel.push({
      name: "",
      qty: 0,
      photos: [],
    } as TModelProduct);
    setFormData((existingData) => {
      return {
        ...existingData,
        model: tempModel,
      };
    });
  };

  const handleOnClickRemoveModel = (idx: number) => {
    const tempModel = formData.model;
    tempModel.splice(idx, 1);
    setFormData((prevData) => {
      return {
        ...prevData,
        model: tempModel,
      };
    });
  };

  const handleDeleteModel = (idx: number, imgIdx: number) => {
    const tempPhotos = formData.model[idx].photos;
    tempPhotos.splice(imgIdx, 1);
    setFormData((prevData) => {
      const updatedModels = [...prevData.model];
      const updatedModel = {
        ...updatedModels[idx],
        photos: tempPhotos,
      };
      updatedModels[idx] = updatedModel;
      return {
        ...prevData,
        model: updatedModels,
      };
    });
  };

  return (
    <>
      {formData.model.map((mod, idx) => (
        <div
          key={idx}
          className="border border-gray-400 rounded-md px-4 py-5 mt-5 relative"
        >
          <button
            className="absolute right-5"
            onClick={() => handleOnClickRemoveModel(idx)}
          >
            <XMarkIcon width={25} height={25} />
          </button>
          <h2 className="uppercase text-xl font-semibold">Model</h2>
          <form className="flex flex-col gap-4 mt-3">
            <InputField
              variants="multiForm"
              name="name"
              label="Model Name"
              type="string"
              placeholder="ex: kayu jati mod"
              value={mod.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(e, idx)
              }
            />
            <div>
              <div className="flex items-center">
                <p className="text-lg">Product Images</p>
              </div>
              <div className="flex gap-3 items-center w-full">
                <div className="flex w-[80%] gap-4">
                  {formData.model[idx].photos.map((photo, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="flex gap-2 items-center w-[250px]"
                    >
                      <img
                        src={photo}
                        alt={formData.model[idx].name}
                        width={200}
                      />

                      <Button
                        variants="trashIconModel"
                        onClick={() => handleDeleteModel(idx, imgIdx)}
                      >
                        <TrashIcon width={25} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end w-full">
                  <label
                    htmlFor={`model-${idx}`}
                    className="bg-primary-orange px-2 py-2 rounded-md text-white h-fit"
                  >
                    <ArrowUpOnSquareStackIcon
                      width={30}
                      height={30}
                      className="text-white"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      name="photos"
                      id={`model-${idx}`}
                      className="w-52"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeFiles(e, idx);
                      }}
                      hidden
                    />
                  </label>  
                </div>
              </div>
            </div>

            <InputField
              variants="multiForm"
              name="qty"
              label="Stock"
              type="number"
              value={mod.qty}
              placeholder="EX: 5"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(e, idx)
              }
            />
          </form>
        </div>
      ))}
      <div className="flex justify-end mt-40">
        <Button
          type="button"
          variants="primaryNoRound"
          onClick={handleAddModel}
        >
          Add Model
        </Button>
      </div>

      <div className="flex justify-end mt-10 gap-4">
        <Button
          type="button"
          variants="primaryNoRound"
          onClick={() => setStep((step -= 1))}
        >
          Prev
        </Button>
        <Button
          type="button"
          variants="primaryNoRound"
          onClick={() => setStep((step += 1))}
        >
          Next
        </Button>
      </div>
    </>
  );
};
