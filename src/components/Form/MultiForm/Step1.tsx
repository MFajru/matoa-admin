import { Button } from "@/components/Button/Button";
import { DropdownField } from "@/components/Form/DropdownField";
import { InputField } from "@/components/Form/InputField";
import { TMultiForm } from "@/types/form";

export const Step1 = ({ formData, setFormData, setStep, step }: TMultiForm) => {
  const categoryValue = (): string => {
    let value = "";
    switch (formData.category) {
      case "1":
        value = "Digital Watches";
        break;
      case "2":
        value = "Classic Watches";
        break;
      case "3":
        value = "Smart Watches";
        break;
    }
    return value;
  };

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((exisitingData) => {
      let value: string | number = e.target.value;
      if (
        e.target.name === "price" ||
        e.target.name === "weight" ||
        e.target.name === "width" ||
        e.target.name === "length" ||
        e.target.name === "discount"
      ) {
        value = parseInt(e.target.value);
      }
      if (e.target.name === "category") {
        switch (value) {
          case "Digital Watches":
            value = "1";
            break;
          case "Classic Watches":
            value = "2";
            break;
          case "Smart Watches":
            value = "3";
            break;
        }
      }
      return {
        ...exisitingData,
        [e.target.name]: value,
      };
    });
  };
  return (
    <>
      <form className="flex flex-col gap-4 mt-5">
        <InputField
          variants="multiForm"
          placeholder="Input product name..."
          type="text"
          name="name"
          value={formData.name}
          label="Product Name"
          onChange={handleOnChange}
        />
        <div className="flex gap-3">
          <InputField
            variants="multiForm"
            name="price"
            label="Price"
            type="number"
            placeholder="Rp. 2000000"
            value={formData.price}
            onChange={handleOnChange}
          />

          <InputField
            variants="multiForm"
            name="discount"
            label="Discount"
            type="number"
            value={formData.discount}
            placeholder="EX: 5"
            symbol="%"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex justify-between gap-3">
          <InputField
            variants="multiForm"
            name="weight"
            label="Weight"
            type="number"
            value={formData.weight}
            placeholder="EX: 20000"
            symbol="KG"
            onChange={handleOnChange}
          />
          <InputField
            variants="multiForm"
            name="length"
            label="Length"
            type="number"
            value={formData.length}
            placeholder="EX: 20000"
            symbol="cm"
            onChange={handleOnChange}
          />
          <InputField
            variants="multiForm"
            name="width"
            label="Width"
            type="number"
            value={formData.width}
            placeholder="EX: 20000"
            symbol="cm"
            onChange={handleOnChange}
          />
        </div>
        <DropdownField
          id="category"
          defaultValue={categoryValue()}
          name="category"
          label="Category"
          options={["Digital Watches", "Classic Watches", "Smart Watches"]}
          onChange={handleOnChange}
        />
      </form>
      <div className="flex justify-end mt-56">
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
